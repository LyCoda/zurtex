# Zurtex 2.0 — Audit-Only Kickoff

**Audit date:** 11 September 2026

**Repository:** `LyCoda/zurtex`

**Baseline commit:** `0bfb0f1` (`main`)

**Audit branch:** `docs/audit-canonical-context`

**Scope:** Repository, product behaviour, architecture, regulatory-content structure, payments, privacy, analytics, and deployment posture

**Change boundary:** Assessment completed before edits; this phase adds documentation only and does not change application behaviour

## 1. Executive assessment

The repository has a healthy, compact React/Vinext/Cloudflare foundation and its direct type check, lint, Vinext build, and Cloudflare build pass. No credential-like secret was found in tracked files. The current public product, however, conflicts materially with the controlling Zurtex 2.0 decisions and is not a safe foundation for incremental copy changes.

The central conflict is operational and commercial: the current site promotes a US$7 reservation-led, human-reviewed readiness check with 24–48-hour delivery and a future secure upload link. The approved private-beta product must instead provide a substantial free Route Guide, show a Ready Pack preview, collect early-access interest, and keep reservations, sales, payment capture, human-review promises, uploads, and delivery promises disabled.

The route logic is also not a route engine. It combines a destination summary, an airline summary, and a hard-coded manual-scope heuristic. It has no versioned rules, source registry, runtime schema validation, origin-export evaluation, transit evaluation, operating-segment model, evidence publication gate, or false-precision model.

The first implementation phase should therefore establish canonical context and a fail-closed feature policy before any redesign or regulatory migration. The existing live site should remain available until a separately approved preview passes its release gates.

## 2. Authoritative inputs reviewed

- `ZURTEX_DECISIONS.md` — controlling product decisions.
- `instructions.md` — implementation and release safeguards.
- `Zurtex_Verification_Ledger_2026-09-11.json` — 23-country and 25-airline migration seed.
- `Zurtex_Route_Intelligence_Blueprint_2026-09-11.pdf` — research and architecture reference.
- `Zurtex_Dynamic_Route_Pages_Executive_Summary.md` — decision-aware product architecture.
- `Zurtex_GPT6_Astra_Impeccable_Master_Prompt.md` — delivery sequence and quality gates.
- Complete tracked repository at `0bfb0f1`.

The audit did not independently re-verify travel-law or airline-policy facts against live authorities. The ledger remains a dated seed, not approval to publish.

## 3. Current implementation

### Framework and delivery

- React 19, TypeScript 5.9, Vinext beta, Vite, and Cloudflare Workers.
- A normal Vinext build includes the Sites plugin; the direct Cloudflare build excludes it through `DEPLOY_TARGET=cloudflare`.
- `wrangler.jsonc` targets worker `zurtex-site`, declares `zurtex.org` and `www.zurtex.org` as custom domains, and defaults to Stripe test mode with `ZURTEX_LIVE_READY=false`.
- `.openai/hosting.json` has no Sites project ID and no D1 or R2 binding.
- The public homepage and five inspected supporting routes returned HTTP 200 during the audit. Their titles matched the checked-out application, which strongly suggests the audited experience is live, although deployment revision identity was not available.

### Routes

Public application routes:

- `/`
- `/about`
- `/services`
- `/contact`
- `/payments-refunds`
- `/privacy`
- `/terms`

API routes:

- `POST /api/checkout`
- `GET /api/checkout-status`
- `POST /api/stripe-webhook`

Missing approved surfaces include methodology, private beta, Ready Pack, private results, Ready Pack preview, and optional country/airline evidence pages.

### Styling and component structure

- The homepage is an approximately 800-line client component containing product copy, route-state handling, payment-return handling, and all homepage sections.
- The global stylesheet is approximately 2,200 lines with two broad styling sections, responsive rules, visible focus rules, and reduced-motion handling.
- Shared header, footer, marketing page, and policy page components exist.
- A large Shadcn/Base UI component catalog is present, but the current marketing experience mostly uses bespoke elements.
- The design is responsive in source and has accessibility-positive foundations such as a skip link, focus-visible styles, semantic labels, live regions, and reduced-motion-aware scrolling. A complete keyboard, screen-reader, contrast, zoom, and mobile visual audit was not performed in this documentation phase.

### Current homepage and route-screen behaviour

1. The hero promises a human second look at route, records, and deadlines and displays a 24–48-hour service cue.
2. The route form requires origin, destination, a date labelled approximate departure, journey type, dog/cat, and an operating airline.
3. Commercial and cargo selections are both declined immediately.
4. Other routes are assigned either `accepted` or `research` through `needsManualScopeCheck`.
5. An accepted route renders the destination's one-line note and the airline's one-line carriage summary, followed by a US$7 Stripe authorisation action.
6. The customer must accept terms/privacy/refund copy before checkout.
7. Stripe Checkout creates a manually captured PaymentIntent. The return-status route or signed webhook cancels a valid authorisation so funds are not captured.
8. The success state tells the customer that a representative will contact them after manual route review and later provide a secure upload link.

The page does not produce the approved Free Route Guide, three primary statuses, complexity rating, evidence ledger, approximate lead-time model, defensible earliest arrival, missing-fact model, or separate government/airline assessment.

### Data and evaluation

- `lib/route-coverage.ts` contains 23 country objects with `code`, `name`, `tier`, `note`, and `source`.
- It contains 25 airline objects with `code`, `name`, `modes`, and `source`.
- `needsManualScopeCheck` returns true for any origin or destination marked `manual_only` and five hard-coded airline codes.
- There is no durable data store, rule version, source record, reviewer approval, content history, or runtime schema.
- There is no origin-export, recent-travel, transit-airport, grouped-jurisdiction, codeshare, aircraft, seasonal, or multi-segment evaluation.

### Stripe

- The server owns the US$7 amount.
- Checkout validates origin, request size, known selections, calendar format, a version-4 UUID attempt ID, noncommercial movement, consent, and route scope.
- Stripe keys are read from runtime environment only and constrained to the configured test/live prefix.
- Live client creation additionally requires `ZURTEX_LIVE_READY=true`.
- Checkout uses idempotency and an `HttpOnly`, `SameSite=Lax` browser cookie.
- Status lookup validates amount, currency, mode, metadata, live/test mode, browser cookie, and PaymentIntent state.
- The webhook validates its signature and cancels eligible authorisations.
- There is no durable reservation/order store or operational work queue.
- The current payment verification script is stale and fails against the current authorisation-release response contract.

### Legal and privacy

- Privacy and terms pages explicitly call themselves launch drafts and acknowledge missing operator identity, address, governing law, providers, transfer safeguards, and production controls.
- They nevertheless sit on the live public site next to copy that describes active review, secure upload, and delivery behaviour.
- No upload endpoint or document store exists, which is a positive fail-safe, but the customer-facing promise is ahead of operations.
- The repository has no analytics implementation.
- The live homepage response did not include the inspected CSP, HSTS, content-type, referrer, permissions, or framing security headers.

## 4. Findings

| ID | Priority | Finding | Evidence in baseline | Required disposition |
|---|---|---|---|---|
| AUD-001 | Critical | The site represents human review and 24–48-hour delivery as active even though review operations are blocked. | `app/page.tsx:245-270`, `app/page.tsx:577-602`, `app/services/page.tsx:31-48`, `app/terms/page.tsx:99-104` | Private-beta copy must state availability honestly; review and delivery promises must be feature-gated off. |
| AUD-002 | Critical | The primary conversion is a US$7 Stripe authorisation, while the approved default is a waitlist and the US$7 experiment is provisional and disabled. | `app/page.tsx:440-477`, `lib/stripe.ts:3-6`, `app/api/checkout/route.ts` | Add server-owned fail-closed flags; make checkout unreachable in validation mode without deleting rollback code. |
| AUD-003 | High | No substantive free Route Guide is produced before conversion. | `app/page.tsx:420-501` | Build the typed three-state assessment and evidence-led result before a paid action. |
| AUD-004 | High | The first-search contract is wrong: it asks for departure, requires an airline, omits traveller relationship and transit, and combines purpose/mode choices. | `app/page.tsx:134-200`, `app/page.tsx:330-407` | Implement the approved minimal input schema and make airline optional. |
| AUD-005 | High | Cargo is treated as commercial/out of scope; sale/adoption/transfer is not classified independently. | `app/page.tsx:183-187`, `app/page.tsx:376-386`, `app/api/checkout/route.ts:59-84` | Separate movement purpose, traveller timing, and travel mode; add decision-table tests. |
| AUD-006 | High | Manual-review outcomes are produced by coarse country tiers and a five-airline list despite review being unavailable. | `lib/route-coverage.ts:1-185`, `lib/route-coverage.ts:381-393` | Replace with evidence-based statuses; never use unavailable manual review as a sales gate. |
| AUD-007 | High | Regulatory and airline content is unversioned and lacks stable IDs, authority, checked/effective dates, editorial status, completeness, change history, and approval. | `lib/route-coverage.ts` | Import the ledger through runtime schemas and a hard publication gate. |
| AUD-008 | High | Four partial ledger profiles can surface one-line claims without their editorial hold: United Arab Emirates, New Zealand, Peninsular Malaysia, and Cathay Pacific. | Ledger status counts versus `lib/route-coverage.ts:97-102`, `135-140`, `165-170`, `327-333` | Suppress exact claims until the holds are resolved and owner-approved. |
| AUD-009 | High | Airline modelling is a single prose string per carrier, with no `Other airline`, optional/unknown state, codeshares, operating segments, aircraft, route, breed, season, or interline rules. | `lib/route-coverage.ts:187-371`; required airline field in `app/page.tsx` | Introduce segment-level structured records and a separate evaluator. |
| AUD-010 | High | Source URLs exist in data but are not shown with the route result, and no origin-export or transit evidence is evaluated. | `lib/route-coverage.ts`; `app/page.tsx:420-501` | Produce a source-linked evidence ledger from all applicable layers. |
| AUD-011 | High | Draft legal/privacy content and unresolved provider/retention decisions coexist with active-service language. | `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/payments-refunds/page.tsx` | Keep blocked capabilities off; update legal copy only within explicit, professionally reviewed scope. |
| AUD-012 | High | Private-beta feature policy is absent. `STRIPE_MODE` and `ZURTEX_LIVE_READY` protect live Stripe credentials but do not model product capabilities. | `lib/stripe.ts:8-21`, `wrangler.jsonc:20-24` | Add the eight canonical flags and reject unsafe combinations server-side. |
| AUD-013 | High | The payment verification script no longer matches the current response and metadata contract. | `scripts/verify-payment.mjs:7-41` fails at line 37 | Replace with tests against actual handlers and explicit validation/non-capture states. |
| AUD-014 | High | Live response hardening headers inspected during the audit were absent, and the Checkout Session ID remains in the browser URL after return. | Live HTTP response; `app/api/checkout/route.ts:133-134`; `app/page.tsx:90-132` | Define security headers, strict referrer behaviour, token exchange/cleanup, and private-page caching controls. |
| AUD-015 | Medium | There is no analytics implementation for private-beta demand validation. | No analytics imports, events, provider, or schema in tracked product code | Add an allowlisted privacy-safe event layer after product states exist. |
| AUD-016 | Medium | Product, route logic, conversion, and checkout-return UI are concentrated in one 800-line client component; global styling is over 2,200 lines. | `app/page.tsx`, `app/globals.css` | Separate presentation components and typed domain logic during the redesign; do not replatform. |
| AUD-017 | Medium | The repository lacked the controlling decisions, agent instructions, product definition, architecture, and audit record. | Baseline root file inventory | Add canonical context before implementation. |
| AUD-018 | Medium | Deployment documentation describes a previous paid workflow and instructs direct production deployment commands; `wrangler.jsonc` already contains production custom domains. | `CLOUDFLARE-STRIPE.md`, `wrangler.jsonc` | Treat deploy as production-impacting, revise documentation in a later bounded phase, and require preview plus explicit approval. |
| AUD-019 | Medium | `.gitignore` does not cover Vinext/TypeScript generated artifacts created by the documented build. | Baseline `.gitignore`; local build output | Ignore framework build metadata in the documentation phase; do not commit generated output. |

## 5. Positive controls worth preserving

- No tracked Stripe, Cloudflare, email, or database secret was found.
- `.env`, `.env.*`, `.dev.vars`, and `.dev.vars.*` are ignored.
- Stripe uses hosted Checkout; card details do not enter the application.
- The server owns the amount and validates mode, amount, currency, metadata, and browser continuity.
- Checkout uses idempotency, request-size limits, origin checking, and an `HttpOnly` cookie.
- Webhooks are signature verified.
- The current live guard prevents a live Stripe client unless both a live key and `ZURTEX_LIVE_READY=true` are present.
- No document-upload endpoint, persistent customer database, or analytics payload exists today.
- The UI already includes useful accessibility foundations: a skip link, focus styles, form labels, live result regions, and reduced-motion handling.
- Direct type check, lint, Vinext build, and Cloudflare build pass at the audited commit.

These controls do not make the current product decision-compliant; they reduce risk while migration proceeds.

## 6. Smallest safe first scope

This phase is documentation-only:

- Add the controlling decisions and repository instructions.
- Add the canonical product definition.
- Add the canonical target architecture.
- Preserve this dated audit record.
- Ignore locally generated framework/build metadata.

No route, rule, UI, Stripe handler, legal page, analytics event, storage resource, credential, Cloudflare route, or production deployment changes in this phase.

## 7. Expected changed files for this phase

- `ZURTEX_DECISIONS.md`
- `instructions.md`
- `PRODUCT.md`
- `ARCHITECTURE.md`
- `docs/audits/2026-09-11-kickoff-audit.md`
- `.gitignore`

## 8. Bounded pull-request sequence

1. **Canonical context and feature policy** — merge this documentation, then add safe flags in a separate focused change that makes checkout unreachable in validation mode while preserving rollback.
2. **Structured data foundation** — source registry, runtime schemas, publication statuses, ledger import, and golden fixtures; no UI claims from seed data.
3. **Minimal search and result shell** — approved fields, three statuses, complexity labels, no payment.
4. **Government evaluator** — destination, origin-export, classifications, evidence, timing, and false-precision controls.
5. **Airline evaluator** — optional airline, every operating segment, codeshares, and unknown-airline handling.
6. **Experience redesign** — establish design context and implement the route search, result, evidence, airline, and Ready Pack preview surfaces with bounded responsive/accessibility QA.
7. **Private-beta conversion and analytics** — waitlist plus privacy-safe events; no capture or uploads.
8. **Operational human-review system** — only after explicit approval and real staffing: intake, uploads, review, PDF, capture, refunds, delivery, and deletion.
9. **Release preparation** — content/legal approvals, complete QA, preview, migration, rollback rehearsal, and separately authorised production release.

## 9. Acceptance tests for this phase

- The controlling documents exist in the repository and their precedence is consistent.
- `PRODUCT.md` reflects the approved free-first model, US$5 Ready Pack, private-beta constraints, three statuses, minimal search, and open decisions.
- `ARCHITECTURE.md` separates data, deterministic evaluation, publication, presentation, adapters, payments, and analytics.
- Both canonical documents specify the required initial feature state with sales, review, uploads, capture, and reservation disabled.
- The audit identifies current behaviour, every material decision conflict, risks, positive controls, bounded phases, and limitations.
- No application source, Stripe flow, Cloudflare configuration, legal page, regulatory record, or deployed environment changes.
- No generated build output is tracked.
- Type checking, linting, Vinext build, and Cloudflare build remain at the audited baseline.
- Documentation links and named file paths resolve.

## 10. Baseline checks and results

| Check | Result | Notes |
|---|---|---|
| Dependency installation from locked `pnpm-lock.yaml` | Pass with environment warning | Packages installed; the environment reported ignored native build scripts. Direct project tools remained usable. |
| TypeScript (`tsc --noEmit`) | Pass | No diagnostics. |
| Oxlint | Pass | No diagnostics. |
| Vinext production build | Pass | All seven pages and three API routes built. Vinext reported that some route types could not be statically classified. |
| Direct Cloudflare build | Pass | Worker and client bundles built through `scripts/cloudflare.mjs build`. |
| Payment verification script | **Fail** | Stale assertions expect the earlier `paid` response rather than the current `authorized`/`released` contract, and its fixture metadata is incomplete. |
| Tracked-secret pattern scan | Pass with expected references | No key-like credential found; only documentation and environment-variable references. |
| Live route smoke check | Pass | `/`, `/services`, `/payments-refunds`, `/privacy`, and `/terms` returned HTTP 200. |
| Live security-header spot check | **Finding** | The inspected root response lacked the expected explicit hardening headers. |

No real Stripe transaction, live payment test, authenticated Cloudflare inspection, database action, or deployment was performed.

## 11. Limitations and open verification

- No official travel requirement or airline policy was independently refreshed during this audit.
- No Stripe Dashboard, Cloudflare account, DNS zone, email inbox, analytics property, or secure-upload provider was accessed.
- The live revision could not be cryptographically matched to the checked-out commit.
- No live checkout session was created because even a test reservation would create external payment state and was unnecessary for an audit-only phase.
- No full visual-regression, assistive-technology, keyboard-only, contrast, 200%/400% zoom, 320px, or translation-resilience pass was performed.
- Operator identity, tax treatment, refund scenarios, retention windows, upload provider, human-review capacity, and professional legal/privacy review remain unresolved.
- The four ledger editorial holds remain unresolved and must not be converted into confirmed detail.

## 12. Rollback

This phase changes documentation and ignore rules only. Rollback is deletion of the six files listed in section 7 or reversion of the documentation commit. No runtime configuration, external data, payment state, or deployment needs restoration.

## 13. Deployment statement

Nothing was deployed. Production application behaviour remains unchanged.
