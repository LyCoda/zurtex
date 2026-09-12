// Best-effort per-isolate limits. Production deployments should additionally use
// Cloudflare rate limiting; this is not a distributed quota or an identity check.
const buckets = new Map<string, { start: number; count: number }>();
let active = 0;
export function reserveVerificationRequest(key: string, now = Date.now()) {
  for (const [id, entry] of buckets) if (now - entry.start >= 60_000) buckets.delete(id);
  const entry = buckets.get(key) ?? { start: now, count: 0 };
  if (entry.count >= 8 || active >= 4) return null;
  if (buckets.size >= 1_000 && !buckets.has(key)) return null;
  entry.count++;
  buckets.set(key, entry);
  active++;
  let released = false;
  return () => {
    if (!released) {
      released = true;
      active--;
    }
  };
}

export async function readVerificationRequest(request: Request, limit = 8_192) {
  if (Number(request.headers.get("content-length")) > limit)
    return { ok: false as const, status: 413, error: "Request is too large." };
  const reader = request.body?.getReader();
  if (!reader)
    return { ok: false as const, status: 400, error: "Enter the journey details again." };
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  let timer: ReturnType<typeof setTimeout> | undefined;
  const expired = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      void reader.cancel();
      reject(new Error("Body read timeout"));
    }, 5_000);
  });
  try {
    for (;;) {
      const next = await Promise.race([reader.read(), expired]);
      if (next.done) break;
      size += next.value.byteLength;
      if (size > limit) return { ok: false as const, status: 413, error: "Request is too large." };
      text += decoder.decode(next.value, { stream: true });
    }
    return { ok: true as const, value: JSON.parse(text + decoder.decode()) as unknown };
  } catch {
    return { ok: false as const, status: 400, error: "Enter the journey details again." };
  } finally {
    clearTimeout(timer);
    void reader.cancel().catch(() => {});
  }
}
