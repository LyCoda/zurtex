import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("consultation checkout authorises the new offer without automatic capture", () => {
  const checkout = readFileSync("app/api/checkout/route.ts", "utf8");
  assert.match(checkout, /CONSULTATION_BOOKING_ENABLED/);
  assert.match(checkout, /capture_method:\s*['"]manual['"]/);
  assert.doesNotMatch(checkout, /paymentIntents\.capture/);
});

test("Cloudflare enables consultation booking but keeps legacy paid paths disabled", () => {
  const config = readFileSync("wrangler.jsonc", "utf8");
  assert.match(config, /"CONSULTATION_BOOKING_ENABLED": "true"/);
  for (const name of [
    "READY_PACK_SALES_ENABLED",
    "MANUAL_REVIEW_ENABLED",
    "DOCUMENT_UPLOADS_ENABLED",
    "PAYMENT_CAPTURE_ENABLED",
    "REFUNDABLE_RESERVATION_ENABLED",
  ]) {
    assert.match(config, new RegExp(`"${name}": "false"`));
  }
});

test("homepage copy exposes value before email and payment", () => {
  const page = readFileSync("components/route-guide/route-workbench.tsx", "utf8");
  assert.match(page, /No email to see your result/);
  assert.match(page, /Your guide and travel tools are free/);
  assert.match(page, /Official-source links included/);
});
