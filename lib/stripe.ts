import Stripe from 'stripe';

export const PRICE_USD_CENTS = 700;
export const POLICY_VERSION = '2026-09-09';
export const WAIT_MESSAGE =
  'This is a temporary US$7 card authorization. Zurtex will not capture the funds, and the hold will be released. Stop and wait for our team before sending documents.';
export function stripeMode() {
  return process.env.STRIPE_MODE === 'live' ? 'live' : 'test';
}

export function createStripeClient() {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();

  const mode = stripeMode();
  if (
    !secret ||
    !new RegExp(`^(?:rk|sk)_${mode}_[A-Za-z0-9_]+$`).test(secret) ||
    (mode === 'live' && process.env.ZURTEX_LIVE_READY !== 'true')
  ) {
    return null;
  }

  return new Stripe(secret, {
    apiVersion: '2026-07-29.dahlia',
    httpClient: Stripe.createFetchHttpClient(),
    maxNetworkRetries: 2,
    timeout: 10_000,
  });
}

export function createIntegrationIdentifier(attempt: string) {
  // Keep Stripe parameters stable when an attempt is retried.
  const suffix = attempt
    .toLowerCase()
    .replaceAll('-', '')
    .slice(0, 8)
    .split('')
    .map((c) => String.fromCharCode(97 + parseInt(c, 16)))
    .join('');

  return `zurtex_launch_${suffix}`;
}
