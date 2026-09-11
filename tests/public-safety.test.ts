import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

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

test("proxy preserves private referrer, cache and indexing policies on booking and API responses", () => {
  const source = readFileSync("proxy.ts", "utf8").replace(/^import[^\n]*\n/gm, "");
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const { proxy } = new Function("NextResponse", `const exports = {}; ${js}; return exports;`)({
    next: () => ({ headers: new Headers() }),
  });
  for (const pathname of [
    "/api/assess",
    "/api/checkout",
    "/api/checkout-status",
    "/consultation/booking",
    "/consultation/booking/",
  ]) {
    const response = proxy({ nextUrl: { pathname } });
    assert.equal(response.headers.get("referrer-policy"), "no-referrer");
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.match(response.headers.get("x-robots-tag"), /noindex, nofollow/);
  }
  const publicPage = proxy({ nextUrl: { pathname: "/consultation" } });
  assert.equal(publicPage.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.equal(publicPage.headers.get("x-robots-tag"), null);
});
