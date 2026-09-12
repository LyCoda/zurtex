import { NextResponse } from "next/server";
import { isFeatureEnabled } from "@/lib/feature-policy";
import { draftAnswersAllowed, getDraftRouteAnswer } from "@/lib/route-answer-drafts";
import { evaluateRouteGuide, parseRouteGuideRequest } from "@/lib/route-intelligence";

export const runtime = "edge";

export async function POST(request: Request) {
  if (!isFeatureEnabled("FREE_ROUTE_GUIDE_ENABLED")) {
    return NextResponse.json(
      { error: "The Free Route Guide is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const requestOrigin = new URL(request.url).origin;
  const originHeader = request.headers.get("origin");
  if (originHeader && originHeader !== requestOrigin) {
    return NextResponse.json({ error: "Start the route guide from Zurtex." }, { status: 403 });
  }

  if (Number(request.headers.get("content-length")) > 8192) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  let raw: unknown;
  try {
    const body = await request.text();
    if (body.length > 8192) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }
    raw = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Enter the journey details again." }, { status: 400 });
  }

  const parsed = parseRouteGuideRequest(raw);
  if (!parsed.ok) {
    return NextResponse.json(parsed, {
      status: 400,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const assessment = evaluateRouteGuide(parsed.value);
  if (draftAnswersAllowed(process.env.NODE_ENV, process.env.ZURTEX_RESEARCH_RESULTS_ENABLED)) {
    const draft = getDraftRouteAnswer(parsed.value);
    if (draft) assessment.draftAnswer = draft;
  }
  return NextResponse.json(assessment, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
