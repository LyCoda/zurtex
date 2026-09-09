import { NextResponse } from 'next/server';
import { createStripeClient, stripeMode } from '@/lib/stripe';

export const runtime = 'edge';

export async function GET(request: Request) {
  const stripe = createStripeClient();
  const sessionId = new URL(request.url).searchParams.get('session_id') ?? '';

  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe sandbox is not configured.' },
      { status: 503 },
    );
  }
  if (
    !new RegExp(`^cs_${stripeMode()}_[A-Za-z0-9_]+$`).test(sessionId) ||
    sessionId.length > 255
  ) {
    return NextResponse.json(
      { error: 'Invalid checkout session.' },
      { status: 400 },
    );
  }

  const sessionCookie = (request.headers.get('cookie') ?? '')
    .split(';')
    .map((x) => x.trim())
    .find((x) => x.startsWith('zurtex_checkout='))
    ?.slice('zurtex_checkout='.length);
  if (sessionCookie !== sessionId)
    return NextResponse.json(
      {
        error:
          'Return using the browser where you started checkout, or contact help@zurtex.org.',
      },
      { status: 403, headers: { 'Cache-Control': 'no-store' } },
    );
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    });
    const paymentIntent =
      typeof session.payment_intent === 'object' ? session.payment_intent : null;
    const validReservation =
      session.livemode === (stripeMode() === 'live') &&
      session.mode === 'payment' &&
      session.status === 'complete' &&
      session.amount_total === 700 &&
      session.currency === 'usd' &&
      session.metadata?.launch === 'zurtex_2026' &&
      session.metadata?.workflow === 'authorization_awaiting_manual_review';
    const authorizationReady =
      validReservation && paymentIntent?.status === 'requires_capture';
    const alreadyReleased =
      validReservation &&
      paymentIntent?.status === 'canceled' &&
      paymentIntent.cancellation_reason === 'abandoned';

    if (authorizationReady) {
      await stripe.paymentIntents.cancel(
        paymentIntent.id,
        { cancellation_reason: 'abandoned' },
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
          session.status === 'complete' &&
          session.payment_status === 'unpaid',
      },
      {
        headers: {
          'Cache-Control': 'no-store',
          'Referrer-Policy': 'no-referrer',
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: 'Checkout verification failed.' },
      { status: 502 },
    );
  }
}
