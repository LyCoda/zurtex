import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import ts from "typescript";
import * as consultation from "../lib/consultation.ts";
import { countries } from "../lib/route-coverage.ts";

const input = {
  origin: "GB",
  destination: "NL",
  arrival: "2099-09-25",
  species: "dog",
  petCount: 1,
  purpose: "personal",
  airline: "",
  transit: "",
  availability: "Weekdays after 6pm, Hong Kong time",
  consent: true,
  checkoutAttemptId: "12345678-1234-4234-8234-123456789abc",
};

function handler(path: string, dependencies: Record<string, unknown>) {
  const source = readFileSync(path, "utf8").replace(
    /^import[\s\S]*?from\s*['"][^'"]+['"];?\s*$/gm,
    "",
  );
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return new Function(
    "deps",
    `const exports = {}; const { ${Object.keys(dependencies).join(",")} } = deps; ${js}; return exports;`,
  )(dependencies);
}

function harness() {
  const calls: { params?: any; options?: any; cookie?: any; action?: string }[] = [];
  let enabled = true;
  let configured = true;
  let session: any = {
    id: "cs_test_fixture",
    livemode: false,
    mode: "payment",
    status: "complete",
    amount_total: 500,
    currency: "usd",
    metadata: { workflow: consultation.CONSULTATION_WORKFLOW },
    payment_intent: {
      status: "requires_capture",
      capture_method: "manual",
      amount: 500,
      amount_capturable: 500,
      amount_received: 0,
      currency: "usd",
      metadata: { workflow: consultation.CONSULTATION_WORKFLOW },
      latest_charge: {
        refunded: false,
        amount_refunded: 0,
        payment_method_details: { card: { capture_before: 2000000000 } },
      },
    },
  };
  let webhookEvent: any = {
    type: "checkout.session.completed",
    livemode: false,
    data: { object: session },
  };
  const deps = {
    ...consultation,
    countries,
    isFeatureEnabled: () => enabled,
    createIntegrationIdentifier: () => "zurtex_launch_abcdefgh",
    stripeMode: () => "test",
    NextResponse: {
      json(data: unknown, init: any = {}) {
        return {
          data,
          status: init.status ?? 200,
          headers: init.headers ?? {},
          cookies: {
            set(...args: unknown[]) {
              calls.push({ cookie: args });
            },
          },
        };
      },
    },
    Stripe: { createSubtleCryptoProvider: () => ({}) },
    createStripeClient: () =>
      configured
        ? {
            checkout: {
              sessions: {
                create: async (params: unknown, options: unknown) => {
                  calls.push({ params, options });
                  return { id: "cs_test_fixture", url: "https://checkout.stripe.com/test-fixture" };
                },
                retrieve: async () => {
                  calls.push({ action: "retrieve" });
                  return session;
                },
              },
            },
            paymentIntents: {
              cancel: async () => {
                calls.push({ action: "cancel" });
              },
              capture: async () => {
                calls.push({ action: "capture" });
              },
              retrieve: async () => ({ id: "pi_fixture", status: "requires_capture" }),
            },
            webhooks: { constructEventAsync: async () => webhookEvent },
          }
        : null,
  };
  return {
    deps,
    calls,
    setEnabled: (value: boolean) => {
      enabled = value;
    },
    setConfigured: (value: boolean) => {
      configured = value;
    },
    setSession: (value: any) => {
      session = value;
    },
    getSession: () => structuredClone(session),
    setEvent: (value: any) => {
      webhookEvent = value;
    },
  };
}
const request = (body: unknown, origin = "https://zurtex.example") =>
  new Request("https://zurtex.example/api/checkout", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
const statusRequest = (cookie = "cs_test_fixture") =>
  new Request("https://zurtex.example/api/checkout-status?session_id=cs_test_fixture", {
    headers: { cookie: "zurtex_checkout=" + cookie },
  });

test("consultation booking validates scope, date, count, consent and bounded text", () => {
  assert.ok(consultation.parseConsultationBooking(input).value);
  for (const body of [
    null,
    [],
    { ...input, origin: "BAD" },
    { ...input, destination: "GB" },
    { ...input, arrival: "2099-02-30" },
    { ...input, arrival: "2000-01-01" },
    { ...input, petCount: 0 },
    { ...input, petCount: 1.2 },
    { ...input, purpose: "__proto__" },
    { ...input, consent: false },
    { ...input, availability: "" },
    { ...input, airline: "a".repeat(101) },
    { ...input, availability: "line\nbreak" },
    { ...input, checkoutAttemptId: "bad" },
  ])
    assert.ok(consultation.parseConsultationBooking(body).error);
  for (const purpose of Object.keys(consultation.consultationPurposes))
    assert.ok(consultation.parseConsultationBooking({ ...input, purpose }).value);
});

test("checkout is US$5 manual capture with consent, origin checks, stable retries and no client-owned price", async () => {
  const h = harness();
  const { POST } = handler("app/api/checkout/route.ts", h.deps);
  assert.equal((await POST(request({ ...input, consent: false }))).status, 400);
  assert.equal((await POST(request(input, "https://other.example"))).status, 403);
  assert.equal(h.calls.length, 0);
  h.setConfigured(false);
  assert.equal((await POST(request(input))).status, 503);
  h.setConfigured(true);
  h.setEnabled(false);
  assert.equal((await POST(request(input))).status, 404);
  h.setEnabled(true);
  assert.equal((await POST(request({ ...input, amount: 1, approved: true }))).status, 200);
  assert.equal((await POST(request(input))).status, 200);
  const [first, second] = h.calls.filter((call) => call.params);
  assert.equal(first.params.line_items[0].price_data.unit_amount, 500);
  assert.equal(first.params.line_items[0].price_data.currency, "usd");
  assert.equal(first.params.payment_intent_data.capture_method, "manual");
  assert.equal(first.params.metadata.review_status, "awaiting_manual_review");
  assert.equal(first.params.payment_method_types, undefined);
  assert.deepEqual(first.params.excluded_payment_method_types, [
    "affirm",
    "afterpay_clearpay",
    "klarna",
  ]);
  assert.equal(first.params.consent_collection.terms_of_service, "required");
  assert.equal(first.options.idempotencyKey, second.options.idempotencyKey);
  assert.match(first.params.success_url, /\/consultation\/booking\?session_id=/);
  assert.equal(h.calls.find((call) => call.cookie)!.cookie[2].httpOnly, true);
  assert.equal(h.calls.find((call) => call.cookie)!.cookie[2].secure, true);
});

test("consultation status is verified and read-only across held, paid, released and refund states", async () => {
  const h = harness();
  const { GET } = handler("app/api/checkout-status/route.ts", h.deps);
  assert.equal((await GET(statusRequest("wrong"))).status, 403);
  assert.equal(h.calls.length, 0);
  const base = h.getSession();
  for (const [patch, expected] of [
    [{}, "review_pending"],
    [{ status: "succeeded", amount_received: 500, amount_capturable: 0 }, "payment_received"],
    [{ status: "succeeded", amount_received: 200, amount_capturable: 0 }, "amount_needs_checking"],
    [{ status: "canceled" }, "released"],
    [{ latest_charge: { refunded: true, amount_refunded: 500 } }, "refunded"],
    [{ latest_charge: { refunded: false, amount_refunded: 200 } }, "partially_refunded"],
  ] as const) {
    h.setSession({ ...base, payment_intent: { ...base.payment_intent, ...patch } });
    const result = await GET(statusRequest());
    assert.equal(result.data.state, expected);
    assert.equal(result.data.email, undefined);
    assert.equal(result.headers["Cache-Control"], "no-store");
  }
  for (const patch of [
    { amount_total: 1 },
    { currency: "hkd" },
    { livemode: true },
    { payment_intent: { ...base.payment_intent, amount: 1 } },
    { payment_intent: { ...base.payment_intent, capture_method: "automatic" } },
    { payment_intent: { ...base.payment_intent, metadata: {} } },
  ]) {
    h.setSession({ ...base, ...patch });
    assert.equal((await GET(statusRequest())).status, 400);
  }
  assert.equal(
    h.calls.some((call) => call.action === "capture" || call.action === "cancel"),
    false,
  );
});

test("webhook does not release consultation holds but preserves legacy releases", async () => {
  const h = harness();
  const { POST } = handler("app/api/stripe-webhook/route.ts", h.deps);
  const previous = process.env.STRIPE_WEBHOOK_SECRET;
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_local_mock_only";
  try {
    const req = () =>
      new Request("https://zurtex.example/api/stripe-webhook", {
        method: "POST",
        headers: { "stripe-signature": "test" },
        body: "{}",
      });
    assert.equal((await POST(req())).status, 200);
    assert.equal(
      h.calls.some((call) => call.action === "cancel"),
      false,
    );
    h.setEvent({
      id: "evt_fixture",
      type: "checkout.session.completed",
      livemode: false,
      data: {
        object: {
          mode: "payment",
          amount_total: 700,
          currency: "usd",
          metadata: { launch: "zurtex_2026", workflow: "authorization_awaiting_manual_review" },
          payment_intent: "pi_fixture",
        },
      },
    });
    await POST(req());
    assert.equal(h.calls.filter((call) => call.action === "cancel").length, 1);
  } finally {
    if (previous === undefined) delete process.env.STRIPE_WEBHOOK_SECRET;
    else process.env.STRIPE_WEBHOOK_SECRET = previous;
  }
});

test("the original Who We Are story and free tools survive the offer change", () => {
  const about = readFileSync("app/about/page.tsx", "utf8").replace(/\s+/g, " ");
  for (const story of [
    "Small team. Big soft spot for pets.",
    "We thought travelling internationally with our dog would be straightforward. A vet appointment, a few documents, a flight together.",
    "Then came the government websites, the vaccination timelines, and the airline’s separate rules. Every new page seemed to bring another question. Had we found the current requirements? Were the dates in the right order? What did we need to ask our vet?",
    "That’s the problem Zurtex is here to help with. We’re a small, hands-on team that looks at one journey at a time, checks the official sources, and brings the paperwork and timing into a clearer order.",
    "We know there’s a much-loved dog or cat behind every itinerary. That matters to us as much as getting the details right.",
  ])
    assert.ok(about.includes(story));
  const tools = readFileSync("components/route-guide/ready-pack-workspace.tsx", "utf8");
  assert.match(tools, /Your free travel tools/);
  assert.match(tools, /window.print/);
  assert.match(tools, /documentStates/);
  for (const path of [
    "components/site-header.tsx",
    "components/marketing-shell.tsx",
    "components/route-guide/route-workbench.tsx",
    "components/route-guide/ready-pack-workspace.tsx",
    "app/private-beta/page.tsx",
    "app/terms/page.tsx",
    "app/payments-refunds/page.tsx",
  ])
    assert.doesNotMatch(readFileSync(path, "utf8"), /Ready Pack|US\$7|planned introductory price/);
  assert.match(
    readFileSync("app/ready-pack/page.tsx", "utf8"),
    /redirect\(['"]\/consultation['"]\)/,
  );
});
