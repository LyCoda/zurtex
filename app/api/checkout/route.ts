import { NextResponse } from 'next/server';
import {
  airlines,
  countries,
  needsManualScopeCheck,
} from '@/lib/route-coverage';
import {
  createIntegrationIdentifier,
  createStripeClient,
  PRICE_USD_CENTS,
  POLICY_VERSION,
  WAIT_MESSAGE,
  stripeMode,
} from '@/lib/stripe';
export const runtime = 'edge';
export async function POST(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  if (
    request.headers.get('origin') &&
    request.headers.get('origin') !== requestOrigin
  )
    return NextResponse.json(
      { error: 'Please start checkout from Zurtex.' },
      { status: 403 },
    );
  if (Number(request.headers.get('content-length')) > 4096)
    return NextResponse.json(
      { error: 'Request is too large.' },
      { status: 413 },
    );
  let raw: unknown;
  try {
    const body = await request.text();
    if (body.length > 4096)
      return NextResponse.json(
        { error: 'Request is too large.' },
        { status: 413 },
      );
    raw = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { error: 'Invalid checkout request.' },
      { status: 400 },
    );
  }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw))
    return NextResponse.json(
      { error: 'Invalid checkout request.' },
      { status: 400 },
    );
  const input = raw as Record<string, unknown>;
  const origin = countries.find((x) => x.code === input.origin);
  const destination = countries.find((x) => x.code === input.destination);
  const airline = airlines.find((x) => x.code === input.airline);
  const departure = typeof input.departure === 'string' ? input.departure : '';
  const date = new Date(departure + 'T00:00:00Z');
  const attempt =
    typeof input.checkoutAttemptId === 'string' ? input.checkoutAttemptId : '';
  if (
    !origin ||
    !destination ||
    origin.code === destination.code ||
    !airline ||
    !['dog', 'cat'].includes(String(input.pet)) ||
    input.movement !== 'noncommercial' ||
    input.consent !== true ||
    !/^\d{4}-\d{2}-\d{2}$/.test(departure) ||
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== departure ||
    departure < new Date().toISOString().slice(0, 10) ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      attempt,
    )
  )
    return NextResponse.json(
      {
        error:
          'Check your route details, departure date and agreement before continuing.',
      },
      { status: 400 },
    );
  if (needsManualScopeCheck(origin.code, destination.code, airline.code))
    return NextResponse.json(
      {
        error:
          'This route needs our team to confirm scope before payment. Email help@zurtex.org with your basic itinerary.',
      },
      { status: 400 },
    );
  const stripe = createStripeClient();
  if (!stripe)
    return NextResponse.json(
      {
        error:
          'Online checkout is not open yet. Please contact help@zurtex.org about your route.',
      },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  let siteOrigin: string;
  try {
    siteOrigin = new URL(process.env.ZURTEX_SITE_URL?.trim() || request.url)
      .origin;
    if (
      stripeMode() === 'live' &&
      (!process.env.ZURTEX_SITE_URL || !siteOrigin.startsWith('https://'))
    )
      throw new Error('Missing production origin');
  } catch {
    return NextResponse.json(
      {
        error:
          'Checkout is temporarily unavailable. Please contact help@zurtex.org.',
      },
      { status: 503 },
    );
  }
  const metadata = {
    origin: origin.name,
    destination: destination.name,
    departure,
    airline: airline.name,
    pet: String(input.pet),
    launch: 'zurtex_2026',
    policy_version: POLICY_VERSION,
    early_service_request: 'accepted',
    workflow: 'paid_awaiting_manual_review',
  };
  try {
    const session = await stripe.checkout.sessions.create(
      {
        mode: 'payment',
        integration_identifier: createIntegrationIdentifier(attempt),
        success_url: `${siteOrigin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}#route-screen`,
        cancel_url: `${siteOrigin}/?checkout=cancelled#route-screen`,
        client_reference_id: attempt,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: PRICE_USD_CENTS,
              product_data: {
                name: 'Zurtex pet travel readiness check',
                description: 'US$7 launch offer. ' + WAIT_MESSAGE,
              },
            },
            quantity: 1,
          },
        ],
        metadata,
        payment_intent_data: {
          metadata,
          description: 'Zurtex readiness check. ' + WAIT_MESSAGE,
        },
        custom_text: {
          submit: { message: WAIT_MESSAGE },
          after_submit: { message: WAIT_MESSAGE },
        },
        consent_collection: { terms_of_service: 'required' },
        submit_type: 'pay',
      },
      { idempotencyKey: `zurtex-checkout-${attempt}` },
    );
    if (!session.url) throw new Error('Missing checkout URL');
    const response = NextResponse.json(
      { url: session.url },
      { headers: { 'Cache-Control': 'no-store' } },
    );
    response.cookies.set('zurtex_checkout', session.id, {
      httpOnly: true,
      secure: siteOrigin.startsWith('https://'),
      sameSite: 'lax',
      path: '/',
      maxAge: 86400,
    });
    return response;
  } catch {
    return NextResponse.json(
      {
        error:
          'We could not open checkout. Try again, or email help@zurtex.org if it keeps happening.',
      },
      { status: 502 },
    );
  }
}
