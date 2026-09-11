import { NextResponse } from "next/server";
import { isFeatureEnabled } from "@/lib/feature-policy";
import { createIntegrationIdentifier, createStripeClient, stripeMode } from "@/lib/stripe";
import { countries } from "@/lib/route-coverage";
import {
  CONSULTATION_PRICE_CENTS,
  CONSULTATION_CURRENCY,
  CONSULTATION_WORKFLOW,
  CONSULTATION_POLICY_VERSION,
  CONSULTATION_HOLD_MESSAGE,
  consultationPurposes,
  parseConsultationBooking,
} from "@/lib/consultation";

export const runtime = "edge";
export async function POST(request: Request) {
  const failure = (error: string, status: number) =>
    NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
  if (!isFeatureEnabled("CONSULTATION_BOOKING_ENABLED"))
    return failure("Consultation bookings are temporarily unavailable.", 404);
  const requestOrigin = new URL(request.url).origin;
  if (request.headers.get("origin") !== requestOrigin)
    return failure("Please start checkout from Zurtex.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return failure("Invalid checkout request.", 415);
  if (Number(request.headers.get("content-length")) > 4096)
    return failure("Request is too large.", 413);
  let raw: unknown;
  try {
    const body = await request.text();
    if (body.length > 4096) return failure("Request is too large.", 413);
    raw = JSON.parse(body);
  } catch {
    return failure("Check your booking details and try again.", 400);
  }
  const parsed = parseConsultationBooking(raw);
  if (parsed.error) return failure(parsed.error, 400);
  const input = parsed.value!;
  const stripe = createStripeClient();
  if (!stripe)
    return failure(
      "Checkout is not connected yet. No payment or booking has been created. Please try again when checkout is available.",
      503,
    );
  if (stripeMode() === "live") {
    try {
      const canonical = new URL(process.env.ZURTEX_SITE_URL || "");
      const current = new URL(requestOrigin);
      if (
        canonical.protocol !== "https:" ||
        current.protocol !== "https:" ||
        ![canonical.hostname, "www." + canonical.hostname.replace(/^www\./, "")].includes(
          current.hostname,
        )
      )
        throw new Error("Untrusted origin");
    } catch {
      return failure("Checkout is unavailable at this address.", 503);
    }
  }
  const metadata = {
    workflow: CONSULTATION_WORKFLOW,
    review_status: "awaiting_manual_review",
    policy_version: CONSULTATION_POLICY_VERSION,
    origin: countries.find((c) => c.code === input.origin)!.name,
    destination: countries.find((c) => c.code === input.destination)!.name,
    arrival: input.arrival,
    pet: input.petCount + " " + input.species + (input.petCount > 1 ? "s" : ""),
    purpose: consultationPurposes[input.purpose],
    airline: input.airline || "Not decided",
    transit: input.transit || "None supplied",
    call_availability: input.availability,
  };
  try {
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        integration_identifier: createIntegrationIdentifier(input.checkoutAttemptId),
        success_url: requestOrigin + "/consultation/booking?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: requestOrigin + "/consultation/booking?cancelled=true",
        client_reference_id: input.checkoutAttemptId,
        line_items: [
          {
            price_data: {
              currency: CONSULTATION_CURRENCY,
              unit_amount: CONSULTATION_PRICE_CENTS,
              product_data: {
                name: "Zurtex Pet Travel Consultation",
                description:
                  "One planned journey. No fixed call-length limit. Written recap with no fixed delivery deadline.",
              },
            },
            quantity: 1,
          },
        ],
        metadata,
        payment_intent_data: {
          capture_method: "manual",
          metadata,
          description: "Zurtex Pet Travel Consultation. Human approval required before capture.",
        },
        custom_text: {
          submit: { message: CONSULTATION_HOLD_MESSAGE },
          after_submit: {
            message:
              "Please wait for Zurtex to review the journey and agree your call time. Do not email pet or identity records.",
          },
        },
        consent_collection: { terms_of_service: "required" },
        submit_type: "book",
        excluded_payment_method_types: ["affirm", "afterpay_clearpay", "klarna"],
      },
      { idempotencyKey: "zurtex-consultation-v1-" + input.checkoutAttemptId },
    );
    if (
      !session.url ||
      new URL(session.url).protocol !== "https:" ||
      new URL(session.url).hostname !== "checkout.stripe.com"
    )
      throw new Error("Missing checkout URL");
    const response = NextResponse.json(
      { url: session.url },
      { headers: { "Cache-Control": "no-store" } },
    );
    response.cookies.set("zurtex_checkout", session.id, {
      httpOnly: true,
      secure: requestOrigin.startsWith("https://"),
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch {
    return failure(
      "We could not open checkout. Your booking is not confirmed. Try again without changing the details, or contact help@zurtex.org.",
      502,
    );
  }
}
