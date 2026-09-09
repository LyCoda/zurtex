import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createStripeClient, stripeMode } from '@/lib/stripe';

export const runtime = 'edge';

export async function POST(request: Request) {
  const stripe = createStripeClient();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = (
    stripeMode() === 'live'
      ? process.env.STRIPE_LIVE_WEBHOOK_SECRET
      : process.env.STRIPE_WEBHOOK_SECRET
  )?.trim();

  if (!stripe || !signature || !webhookSecret)
    return NextResponse.json({ error: 'Webhook unavailable.' }, { status: 503 });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      await request.text(),
      signature,
      webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const paymentIntentId =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id;
    const validReservation =
      event.livemode === (stripeMode() === 'live') &&
      session.mode === 'payment' &&
      session.amount_total === 700 &&
      session.currency === 'usd' &&
      session.metadata?.launch === 'zurtex_2026' &&
      session.metadata?.workflow === 'authorization_awaiting_manual_review';

    if (validReservation && paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (paymentIntent.status === 'requires_capture') {
        await stripe.paymentIntents.cancel(
          paymentIntent.id,
          { cancellation_reason: 'abandoned' },
          { idempotencyKey: `zurtex-webhook-release-${event.id}` },
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
