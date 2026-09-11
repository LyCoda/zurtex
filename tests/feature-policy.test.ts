import assert from "node:assert/strict";
import test from "node:test";
import { resolveFeaturePolicy } from "../lib/feature-policy.ts";

test("private-beta defaults fail closed for paid capabilities", () => {
  const policy = resolveFeaturePolicy({});
  assert.equal(policy.FREE_ROUTE_GUIDE_ENABLED, true);
  assert.equal(policy.PRIVATE_BETA_ENABLED, true);
  assert.equal(policy.READY_PACK_WAITLIST_ENABLED, true);
  assert.equal(policy.READY_PACK_SALES_ENABLED, false);
  assert.equal(policy.MANUAL_REVIEW_ENABLED, false);
  assert.equal(policy.DOCUMENT_UPLOADS_ENABLED, false);
  assert.equal(policy.PAYMENT_CAPTURE_ENABLED, false);
  assert.equal(policy.REFUNDABLE_RESERVATION_ENABLED, false);
});

test("contradictory paid flags cannot activate a partial service", () => {
  const policy = resolveFeaturePolicy({
    READY_PACK_SALES_ENABLED: "true",
    PAYMENT_CAPTURE_ENABLED: "true",
    MANUAL_REVIEW_ENABLED: "false",
    DOCUMENT_UPLOADS_ENABLED: "true",
  });
  assert.equal(policy.READY_PACK_SALES_ENABLED, false);
  assert.equal(policy.PAYMENT_CAPTURE_ENABLED, false);
  assert.equal(policy.DOCUMENT_UPLOADS_ENABLED, false);
});

test("waitlist cannot remain active when private beta is disabled", () => {
  const policy = resolveFeaturePolicy({
    PRIVATE_BETA_ENABLED: "false",
    READY_PACK_WAITLIST_ENABLED: "true",
  });
  assert.equal(policy.READY_PACK_WAITLIST_ENABLED, false);
});
