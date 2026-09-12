import { isFeatureEnabled } from "@/lib/feature-policy";
import { draftAnswersAllowed, getDraftRouteAnswer } from "@/lib/route-answer-drafts";
import { evaluateRouteGuide, parseRouteGuideRequest } from "@/lib/route-intelligence";
import { verifyRouteSources, type AiBinding } from "@/lib/source-verification";
import {
  readVerificationRequest,
  reserveVerificationRequest,
} from "@/lib/source-verification-http";

export const runtime = "edge";
const privateHeaders = {
  "Cache-Control": "no-store, max-age=0",
  "Referrer-Policy": "no-referrer",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};
function error(message: string, status: number) {
  return Response.json(
    { error: message },
    { status, headers: { ...privateHeaders, ...(status === 429 ? { "Retry-After": "60" } : {}) } },
  );
}

export async function POST(request: Request) {
  if (!isFeatureEnabled("FREE_ROUTE_GUIDE_ENABLED"))
    return error("The Free Route Guide is temporarily unavailable.", 503);
  const originHeader = request.headers.get("origin");
  if (originHeader && originHeader !== new URL(request.url).origin)
    return error("Start the route guide from Zurtex.", 403);
  if (request.headers.get("sec-fetch-site") === "cross-site")
    return error("Start the route guide from Zurtex.", 403);
  const content = await readVerificationRequest(request);
  if (!content.ok) return error(content.error, content.status);
  const parsed = parseRouteGuideRequest(content.value);
  if (!parsed.ok) return Response.json(parsed, { status: 400, headers: privateHeaders });
  // Only Cloudflare's edge-injected client address is considered, never forwarded headers.
  // Hash the ephemeral key; neither the address nor journey details are logged.
  const ip = request.headers.get("cf-connecting-ip") ?? "local-preview";
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  const key = Array.from(new Uint8Array(bytes), (n) => n.toString(16).padStart(2, "0")).join("");
  const release = reserveVerificationRequest(key);
  if (!release)
    return error("There are several source checks running. Please try again in a minute.", 429);

  const controller = new AbortController();
  const abort = () => controller.abort(request.signal.reason);
  if (request.signal.aborted) abort();
  else request.signal.addEventListener("abort", abort, { once: true });
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(output) {
      let closed = false;
      const send = (event: string, value: unknown) => {
        if (closed || controller.signal.aborted) return;
        try {
          output.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(value)}\n\n`));
        } catch {
          closed = true;
          controller.abort();
        }
      };
      const keepAlive = setInterval(() => {
        if (!closed && !controller.signal.aborted) {
          try {
            output.enqueue(encoder.encode(": keep-alive\n\n"));
          } catch {
            closed = true;
            controller.abort();
          }
        }
      }, 15_000);
      try {
        let ai: AiBinding | undefined;
        let environment: Record<string, string | undefined> = { ...process.env };
        try {
          // Available inside Workers/Vinext; a plain Node preview may have no binding.
          const { env } = await import("cloudflare:workers");
          const bindings = env as unknown as Record<string, unknown>;
          if (bindings.AI && typeof (bindings.AI as AiBinding).run === "function")
            ai = bindings.AI as AiBinding;
          for (const name of [
            "ZURTEX_RESEARCH_RESULTS_ENABLED",
            "ZURTEX_VERIFICATION_PROVIDER",
            "ZURTEX_VERIFICATION_MODEL",
            "ZURTEX_MODEL_BASE_URL",
            "ZURTEX_MODEL_API_KEY",
            "CLOUDFLARE_ACCOUNT_ID",
            "CLOUDFLARE_AI_API_TOKEN",
            "BRAVE_SEARCH_API_KEY",
          ]) {
            if (typeof bindings[name] === "string") environment[name] = bindings[name];
          }
        } catch {
          /* The configured REST or local model fallback can still run. */
        }
        const assessment = evaluateRouteGuide(parsed.value);
        if (draftAnswersAllowed(process.env.NODE_ENV, environment.ZURTEX_RESEARCH_RESULTS_ENABLED)) {
          const draft = getDraftRouteAnswer(parsed.value);
          if (draft) assessment.draftAnswer = draft;
        }
        assessment.verification = await verifyRouteSources(parsed.value, assessment, {
          env: environment,
          ai,
          signal: controller.signal,
          onProgress: (progress) => send("progress", progress),
        });
        send("result", assessment);
      } catch {
        if (!controller.signal.aborted)
          send("error", {
            error:
              "The source check could not finish. Please try again; no verification has been claimed.",
          });
      } finally {
        clearInterval(keepAlive);
        request.signal.removeEventListener("abort", abort);
        release();
        if (!closed) {
          try {
            output.close();
          } catch {
            /* The browser already left. */
          }
          closed = true;
        }
      }
    },
    cancel() {
      controller.abort();
      release();
      request.signal.removeEventListener("abort", abort);
    },
  });
  return new Response(stream, {
    headers: {
      ...privateHeaders,
      "Content-Type": "text/event-stream; charset=utf-8",
      "X-Accel-Buffering": "no",
    },
  });
}
