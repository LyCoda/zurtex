import { NextResponse } from "next/server";
import { createStripeClient, stripeMode } from "@/lib/stripe";
import { CONSULTATION_PRICE_CENTS, CONSULTATION_WORKFLOW } from "@/lib/consultation";

export const runtime = "edge";

export async function GET(request: Request) {
  const stripe = createStripeClient();
  const sessionId = new URL(request.url).searchParams.get("session_id") ?? "";

  if (!stripe) {
    return NextResponse.json(
      { error: "We cannot check the booking right now. Please try again later." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
  if (!new RegExp(`^cs_${stripeMode()}_[A-Za-z0-9_]+$`).test(sessionId) || sessionId.length > 255) {
    return NextResponse.json({ error: "Invalid checkout session." }, { status: 400 });
  }

  const sessionCookie = (request.headers.get("cookie") ?? "")
    .split(";")
    .map((x) => x.trim())
    .find((x) => x.startsWith("zurtex_checkout="))
    ?.slice("zurtex_checkout=".length);
  if (sessionCookie !== sessionId)
    return NextResponse.json(
      {
        error: "Return using the browser where you started checkout, or contact help@zurtex.org.",
      },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent.latest_charge"],
    });
    const paymentIntent =
      typeof session.payment_intent === "object" ? session.payment_intent : null;
    if (session.metadata?.workflow === CONSULTATION_WORKFLOW) {
      if (
        session.livemode !== (stripeMode() === "live") ||
        session.mode !== "payment" ||
        session.amount_total !== CONSULTATION_PRICE_CENTS ||
        session.currency !== "usd" ||
        (paymentIntent &&
          (paymentIntent.amount !== CONSULTATION_PRICE_CENTS ||
            paymentIntent.currency !== "usd" ||
            paymentIntent.capture_method !== "manual" ||
            paymentIntent.metadata.workflow !== CONSULTATION_WORKFLOW))
      ) {
        return NextResponse.json(
          { error: "This session does not match a Zurtex consultation." },
          { status: 400, headers: { "Cache-Control": "no-store" } },
        );
      }
      const charge =
        paymentIntent && typeof paymentIntent.latest_charge === "object"
          ? paymentIntent.latest_charge
          : null;
      const state = charge?.refunded
        ? "refunded"
        : charge && charge.amount_refunded > 0
          ? "partially_refunded"
          : paymentIntent?.status === "canceled" || session.status === "expired"
            ? "released"
            : session.status === "complete" &&
                paymentIntent?.status === "requires_capture" &&
                paymentIntent.amount_capturable === CONSULTATION_PRICE_CENTS
              ? "review_pending"
              : session.status === "complete" &&
                  paymentIntent?.status === "succeeded" &&
                  paymentIntent.amount_received === CONSULTATION_PRICE_CENTS
                ? "payment_received"
                : paymentIntent?.status === "succeeded"
                  ? "amount_needs_checking"
                  : "processing";
      // Status reads never approve a booking, capture funds or release a new hold.
      return NextResponse.json(
        {
          state,
          testMode: !session.livemode,
          holdExpiresAt:
            state === "review_pending"
              ? (charge?.payment_method_details?.card?.capture_before ?? null)
              : null,
        },
        { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } },
      );
    }
    // Preserve release behaviour only for historical US$7 reservations.
    const validReservation =
      session.livemode === (stripeMode() === "live") &&
      session.mode === "payment" &&
      session.status === "complete" &&
      session.amount_total === 700 &&
      session.currency === "usd" &&
      session.metadata?.launch === "zurtex_2026" &&
      session.metadata?.workflow === "authorization_awaiting_manual_review";
    const authorizationReady = validReservation && paymentIntent?.status === "requires_capture";
    const alreadyReleased =
      validReservation &&
      paymentIntent?.status === "canceled" &&
      paymentIntent.cancellation_reason === "abandoned";

    if (authorizationReady) {
      await stripe.paymentIntents.cancel(
        paymentIntent.id,
        { cancellation_reason: "abandoned" },
        { idempotencyKey: `zurtex-release-${session.id}` },
      );
    }

    return NextResponse.json(
      {
        authorized: authorizationReady || alreadyReleased,
        released: authorizationReady || alreadyReleased,
        pending:
          !authorizationReady &&
          !alreadyReleased &&
          session.status === "complete" &&
          session.payment_status === "unpaid",
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "Referrer-Policy": "no-referrer",
        },
      },
    );
  } catch {
    return NextResponse.json({ error: "Checkout verification failed." }, { status: 502 });
  }
}
