export const featureDefaults = {
  FREE_ROUTE_GUIDE_ENABLED: true,
  PRIVATE_BETA_ENABLED: true,
  CONSULTATION_BOOKING_ENABLED: true,
  READY_PACK_WAITLIST_ENABLED: true,
  READY_PACK_SALES_ENABLED: false,
  MANUAL_REVIEW_ENABLED: false,
  DOCUMENT_UPLOADS_ENABLED: false,
  PAYMENT_CAPTURE_ENABLED: false,
  REFUNDABLE_RESERVATION_ENABLED: false,
} as const;

export type FeatureName = keyof typeof featureDefaults;
export type FeaturePolicy = Record<FeatureName, boolean>;

function booleanFromEnvironment(value: string | undefined, fallback: boolean) {
  if (value === undefined || value.trim() === "") return fallback;
  return value.trim().toLowerCase() === "true";
}

export function resolveFeaturePolicy(
  environment: Record<string, string | undefined> = process.env,
): FeaturePolicy {
  const policy = Object.fromEntries(
    Object.entries(featureDefaults).map(([name, fallback]) => [
      name,
      booleanFromEnvironment(environment[name], fallback),
    ]),
  ) as FeaturePolicy;

  // Paid capabilities are a dependency chain. Any incomplete combination fails
  // closed rather than allowing copy or a single environment variable to imply
  // an operating service.
  const paidServiceReady =
    policy.READY_PACK_SALES_ENABLED &&
    policy.MANUAL_REVIEW_ENABLED &&
    policy.PAYMENT_CAPTURE_ENABLED;

  if (!paidServiceReady) {
    policy.READY_PACK_SALES_ENABLED = false;
    policy.PAYMENT_CAPTURE_ENABLED = false;
  }

  if (!policy.MANUAL_REVIEW_ENABLED) {
    policy.DOCUMENT_UPLOADS_ENABLED = false;
  }

  if (!policy.PRIVATE_BETA_ENABLED) {
    policy.READY_PACK_WAITLIST_ENABLED = false;
  }

  return policy;
}

export function isFeatureEnabled(name: FeatureName) {
  return resolveFeaturePolicy()[name];
}
