# Zurtex 2.0 — Canonical Architecture

**Document status:** Canonical target architecture and migration guardrails

**Baseline audited:** `0bfb0f1` on 11 September 2026

**Target runtime:** TypeScript, React/Vinext, Cloudflare Workers

**Operating mode:** Local private beta; consultation manual-capture flow implemented, Stripe connection and live launch pending

**Current implementation:** Section 24 supersedes earlier paid-pack and no-payment architecture proposals. Free travel tools remain available; consultation booking is enabled in policy but requires connected Stripe credentials. Approval and collection are manual operator actions, not automated application features. Uploads remain unavailable. The baseline and earlier dated sections below are retained as migration history.

## 1. Purpose and authority

This document defines the technical boundaries, core contracts, trust controls, and migration path for Zurtex 2.0. It preserves the working React/Vinext/Cloudflare delivery stack while replacing the current pay-first scope checker with a source-governed, deterministic route-information system.

Use `ZURTEX_DECISIONS.md` for product and commercial choices, `instructions.md` for agent and release safeguards, and `PRODUCT.md` for the customer experience. When this document conflicts with any of them, the higher-precedence document wins.

The dated audit supporting this architecture is `docs/audits/2026-09-11-kickoff-audit.md`.

## 2. Current architecture

The audited repository is a small Vinext application with:

- React 19 and TypeScript.
- Vinext/Vite build output for Cloudflare Workers.
- One client-rendered homepage containing route-form state, coarse classification, checkout launch, and checkout-return handling.
- Static marketing and draft policy routes for about, services, contact, payments/refunds, privacy, and terms.
- A single `lib/route-coverage.ts` module containing 23 country summaries, 25 airline summaries, and a three-tier manual-scope heuristic.
- Stripe Checkout routes for an uncaptured US$7 PaymentIntent, status lookup, and webhook-triggered cancellation.
- No database, object store, customer account, durable journey store, analytics provider, rule-version store, or source registry.
- Direct Cloudflare configuration for `zurtex.org` and `www.zurtex.org`, plus an unregistered local Sites configuration with no D1 or R2 binding.

This stack can remain. The current product logic, content model, and operational gating cannot.

### 2.1 Local implementation update — 11 September 2026

The audit baseline above remains historical. The feature-branch preview now contains:

- A two-stage client route form and separate in-page journey dashboard, with focus management and explicit editing that removes the obsolete result.
- A no-store POST assessment endpoint, validated optional operating-carrier/transit/US-region fields, and fail-closed paid-feature defaults.
- A supplied ledger snapshot at `docs/data/verification-ledger-2026-09-11.json`; `lib/route-research.ts` projects its source metadata into route-specific research questions.
- Species-aware question/source filtering; held AE/NZ/MY/CX details withheld; operating and marketing carriers kept distinct.
- Current-page-only state. No database, persistence, automatic email subscription, upload, personalised deadline calculation or approved regulatory rule execution.

This is a research-question guide, not completion of the target deterministic rules engine below. Every current result remains `more_information_needed`. Source effective dates and human approval are explicitly absent rather than fabricated. Original `lib/route-coverage.ts` remains for compatibility and coarse preparation categorisation; its notes are no longer published by the guide.

Visual implementation is governed by `DESIGN.md` and the user-directed surface brief. The live public site remains unchanged.

## 3. Architectural principles

1. **Facts are data, not component copy.** UI components render typed assessment output and never decide travel law.
2. **Evaluation is deterministic.** Approved rules and explicit input produce the result; no language model invents requirements at runtime.
3. **Every material claim has evidence.** A claim cannot be published without an approved source and editorial state.
4. **Publication fails closed.** Held, expired, superseded, unverified, conflicted, or incomplete records cannot appear as confirmed.
5. **Purpose and carriage mode are independent.** Cargo is not synonymous with commercial movement.
6. **Government and airline conclusions are independent.** Each operating carrier segment is evaluated separately.
7. **Missing facts reduce precision.** The engine asks for the minimum follow-up or returns an explicit limitation.
8. **Dates are versioned and timezone-safe.** Rules are selected for intended arrival; calculations use explicit calendar semantics and boundary tests.
9. **Private data stays private.** Persisted journeys use opaque IDs; sensitive facts do not enter URLs, analytics, logs, or source code.
10. **Operational features require operational readiness.** Code presence never activates sales, review, uploads, or capture.
11. **The delivery stack remains reversible.** Each phase is independently deployable behind safe defaults and has a clear rollback.

## 4. Target system shape

```text
Traveller
   |
   v
Public/private Vinext routes
   |
   v
Input validation and normalisation
   |
   +--> Feature-policy gate
   |
   v
Deterministic assessment pipeline
   |        |          |          |
   |        |          |          +--> Operating-airline rules
   |        |          +-------------> Transit and entry-point rules
   |        +------------------------> Origin/export and classifications
   +---------------------------------> Destination/import rules
   |
   v
Publication gate --> Typed assessment + evidence ledger
   |                                  |
   |                                  +--> Free result / Ready Pack preview
   +--> Withhold or limit unsafe claims

Future gated adapters:
Waitlist store | private journey store | email | secure upload | PDF | Stripe
```

The assessment core is pure application code. Network, storage, email, payment, and rendering systems sit behind adapters so rules can be tested without external services.

## 5. Repository boundaries

The exact filenames may evolve within a bounded pull request, but responsibilities must remain separated as follows:

```text
data/
  sources/                 # source records and approved snapshots/references
  jurisdictions/           # destination/import and origin/export rule records
  airlines/                # operating-carrier rule records
  classifications/         # risk groups and jurisdiction mappings
  rule-versions/           # immutable date-effective versions
  fixtures/                # golden journeys and decision tables

lib/
  config/                  # typed feature policy and invariant checks
  route-engine/
    schema.ts              # runtime and TypeScript input/output contracts
    input-normalizer.ts
    jurisdiction-classifier.ts
    purpose-classifier.ts
    government-evaluator.ts
    transit-evaluator.ts
    airline-evaluator.ts
    timeline.ts
    evidence.ts
    publication-gate.ts
    result-builder.ts
    validation.ts
  journeys/                # future opaque IDs and repository interfaces
  waitlist/                # privacy-limited beta repository interfaces
  ready-pack/              # future generation contract and rule snapshot
  payments/                # future Stripe adapter isolated from product logic
  analytics/               # allowlisted event names and payload schemas

app/
  page.tsx
  methodology/page.tsx
  countries/[country]/page.tsx
  airlines/[airline]/page.tsx
  ready-pack/page.tsx
  private-beta/page.tsx
  results/[journeyId]/page.tsx
  ready-pack/[journeyId]/preview/page.tsx
  intake/[secureToken]/page.tsx       # future and disabled
  documents/[secureToken]/page.tsx    # future and disabled

components/
  route-intelligence/      # presentation only; consumes typed output

docs/
  audits/
  surfaces/
  decisions/               # future ADRs where needed
```

Do not move all route logic into `app/page.tsx`, and do not turn `data/` records into prose embedded in components.

## 6. Core contracts

The first implementation should encode equivalent runtime-validated contracts. Names may change, but semantics may not.

### 6.1 Search input

```ts
type FreeRouteSearch = {
  origin: string;
  destination: string;
  intendedArrivalDate: string;
  species: 'dog' | 'cat';
  travellerRelationship: 'owner' | 'family_member' | 'authorised_person';
  movementPurpose:
    | 'personal_travel'
    | 'relocation'
    | 'sale'
    | 'adoption'
    | 'transfer';
  travelMode: 'cabin' | 'hold' | 'cargo';
  marketingAirline?: string;
  operatingSegments?: Array<{
    operatingAirline: string;
  }>;
  hasTransit?: boolean;
  transitCountry?: string;
};
```

Input validation must reject malformed values, normalise identifiers, validate a real calendar date, and keep date interpretation independent of the server's local timezone.

### 6.2 Source and rule records

```ts
type PublicationStatus =
  | 'draft'
  | 'approved'
  | 'held'
  | 'expired'
  | 'superseded'
  | 'unverified'
  | 'conflicted';

type VerificationStatus =
  | 'verified_official'
  | 'official_source_partial'
  | 'unverified';

type SourceRecord = {
  id: string;
  authority: string;
  title: string;
  url: string;
  checkedAt: string;          // internal governance field
  effectiveFrom?: string;
  effectiveUntil?: string;
  verificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
  completeness: 'complete' | 'partial';
  snapshotRef?: string;
  changeHistory: ChangeRecord[];
  reviewer?: string;
  approvedAt?: string;
};

type RuleRecord = {
  id: string;
  version: string;
  layer: 'destination' | 'origin' | 'transit' | 'airline' | 'classification';
  jurisdiction: string;
  predicate: RulePredicate;
  effect: RuleEffect;
  sourceIds: string[];
  publicationStatus: PublicationStatus;
  completeness: 'complete' | 'partial';
  effectiveFrom?: string;
  effectiveUntil?: string;
  supersedes?: string[];
  reviewer?: string;
  approvedAt?: string;
};
```

`RulePredicate` must be able to express species, age/breed scope, origin classification, recent travel, movement purpose, traveller timing, travel mode, pet count, route/airport, operating carrier, aircraft, season, and other facts described in the controlling decisions. `RuleEffect` must distinguish actions, timing constraints, documents, warnings, blockers, and specialist dependencies.

Ledger values are migration inputs, not runtime publication decisions. Import maps `verified_official`, `official_source_partial`, and `do_not_publish` into the separate verification, completeness, and publication fields without upgrading a partial or held record.

### 6.3 Assessment output

```ts
type PublicRouteStatus =
  | 'more_information_needed'
  | 'actions_required'
  | 'plan_looks_feasible';

type PreparationComplexity =
  | 'straightforward'
  | 'moderate'
  | 'complex'
  | 'specialist';

type FreeRouteAssessment = {
  status: PublicRouteStatus;
  complexity: PreparationComplexity;
  journeySummary: JourneySummary;
  mainRequirements: RequirementSummary[];
  warnings: AssessmentWarning[];
  missingFacts: MissingFact[];
  approximateLeadTime?: LeadTimeRange;
  earliestFeasibleArrival?: string;
  earliestDateConfidence: 'route_level' | 'partial' | 'not_calculable';
  governmentAssessment: GovernmentAssessment;
  airlineAssessment:
    | AirlineAssessment
    | { status: 'not_assessed' | 'limited_coverage' };
  transitLimitation?: TransitLimitation;
  returnJourneyWarning?: string;
  evidence: PublicEvidence[];
  readyPackPreview: ReadyPackPreview;
};
```

Each requirement and warning carries rule IDs and source IDs. This is required for explanation, correction handling, snapshots, and review.

## 7. Deterministic evaluation pipeline

The pipeline runs in this order:

1. Validate and normalise search input.
2. Resolve grouped jurisdictions or emit a targeted missing-fact result.
3. Classify movement purpose independently from aircraft carriage mode.
4. Select destination rules effective on the intended arrival date.
5. Select available origin-export and endorsement rules.
6. Apply recent-travel and residence classifications where the supplied input supports them; otherwise record missing facts.
7. Apply pet-specific rule predicates available at the free-search level.
8. Record the transit limitation or evaluate supported transit facts.
9. Evaluate every supplied operating carrier segment; ignore the marketing carrier as a substitute.
10. Calculate only route-level lead time and earliest date supported by known facts.
11. Detect conflicts, stale sources, held records, impossible windows, and incomplete coverage.
12. Run the publication gate.
13. Compose one typed assessment and evidence ledger for every consumer.

The UI, Ready Pack preview, future PDF generator, and analytics derive from this output. They must not re-evaluate rules independently.

## 8. Publication gate

The publication gate is a hard boundary, not a warning decorator.

| Record condition | Confirmed claim allowed? | Required output |
|---|---:|---|
| Verified, approved, effective, complete | Yes | Claim plus public evidence. |
| Missing material input | No | **More information needed** and the specific question. |
| Partial coverage | No exact claim | Limited explanation and missing evidence. |
| Held, unverified, or conflicted | No | Withhold detail; show limitation and authority. |
| Expired or superseded | No | Select a valid approved version or suppress. |
| No safe pathway | No | Unsupported explanation and official starting point. |

An override may exist only in a clearly non-production test environment. Production must not accept an override supplied by a browser, URL, or customer request.

The 11 September 2026 seed ledger contains three partial country profiles — United Arab Emirates, New Zealand, and Peninsular Malaysia — plus one partial airline profile, Cathay Pacific. They remain editorial holds until separately resolved and approved.

## 9. Timing model

- Store rule dates as ISO calendar dates with declared jurisdiction semantics.
- Treat an intended arrival date as a calendar date, not as midnight in the server's implicit timezone.
- Represent waiting periods and valid windows explicitly, including inclusive/exclusive boundary rules.
- Produce a range when a route-level rule provides only a range.
- Produce no exact personal date when microchip, vaccination, titre, treatment, certificate, permit, or document dates are missing and material.
- Keep the free lead-time calculation separate from the future detailed Ready Pack reverse timeline.
- Snapshot rule versions used for every delivered Ready Pack.

## 10. Airline architecture

The airline evaluator accepts zero or more operating segments.

- Zero segments returns `not_assessed`; government evaluation still proceeds.
- An unknown carrier returns `limited_coverage` and never invents eligibility.
- A codeshare stores marketing and operating carrier separately and evaluates the operating carrier.
- Each segment evaluates mode, species, weight/dimensions when known, aircraft, route, breed, age, pregnancy, season/temperature, connection/interline, reservation timing, and editorial state.
- A compatible policy means only that no known policy conflict was found. It is not inventory, booking, aircraft, or boarding confirmation.
- Fees and carrier recommendations are excluded at launch.

Airline claims use the same source, version, approval, and publication controls as government claims.

## 11. Feature-policy architecture

Feature state belongs in one typed server-owned module with safe defaults and startup/runtime invariant checks. Client code may receive derived capabilities but may not enable them.

Required invariants include:

- `READY_PACK_SALES_ENABLED` requires `MANUAL_REVIEW_ENABLED` and a complete paid-service configuration.
- `DOCUMENT_UPLOADS_ENABLED` requires accepted-case authorization, a secure provider, a defined deletion policy, and `MANUAL_REVIEW_ENABLED`.
- `PAYMENT_CAPTURE_ENABLED` requires sales, case acceptance, successful pack generation, and payment/refund readiness.
- `REFUNDABLE_RESERVATION_ENABLED` is independent of the US$5 product price, never captures funds in validation, and is false by default.
- Delivery-time promises derive from operational mode; they are not free-standing copy flags.
- Missing or malformed configuration resolves to the safer disabled state.

Tests must cover every prohibited combination.

## 12. Journey and persistence architecture

No persistence technology is selected by this document. The current repository has no D1 or R2 binding, and the private-beta storage design must be chosen only after data minimisation and retention requirements are approved.

When persistence is introduced:

- Use a random opaque journey ID with enough entropy to resist guessing.
- Store personal details server-side and never encode them in the URL.
- Mark personalised routes `noindex` and prevent caching of private content.
- Separate the minimal free assessment, waitlist consent, operational order, source snapshot, and document records.
- Minimise Stripe metadata; do not use payment records as a journey database.
- Define creation, access, expiry, deletion, correction, backup, and audit-log behaviour before collecting real data.
- Do not persist a free result until the user supplies email for early access or a future order.

## 13. Waitlist and analytics adapters

The waitlist adapter accepts only an email, journey ID, beta-update consent, and an optional short reason for interest. It records consent version and time. It does not accept documents, veterinary facts, or free-form sensitive records.

Analytics uses an allowlist of event schemas. Each schema defines permitted properties, applies aggregation or coarse corridor identifiers where appropriate, and rejects extra fields. Source-link clicks are excluded. Events related to checkout, purchases, or PDF downloads cannot fire while the corresponding capability is disabled.

## 14. Payment and Ready Pack boundaries

### 14.1 Validation mode

The default path contains no Stripe redirect, authorisation, charge, capture, order acceptance, or refund promise. The current US$7 authorisation code may remain temporarily for rollback, but it must be unreachable behind `REFUNDABLE_RESERVATION_ENABLED=false` and must not control the product model.

If the reservation experiment is later approved, it requires test-mode verification, explicit wording, automatic release, duplicate protection, signed webhooks, monitoring, and a waitlist-only fallback. It remains a demand signal, not the US$5 Ready Pack price or case acceptance.

### 14.2 Operational paid mode

The future state machine is:

```text
early access / eligible enquiry
  -> full intake
  -> human case acceptance
  -> pack generation
  -> human review approval
  -> payment capture
  -> PDF delivery
  -> six-month private access
  -> retention/deletion lifecycle
```

Failure before capture releases any approved authorisation. Failure after capture follows the approved refund policy. Payment events cannot automatically approve a case or bypass human review.

## 15. Security and privacy controls

- Secrets remain in runtime secret storage and never enter Git, prompts, logs, screenshots, client bundles, or analytics.
- Validate all API inputs at runtime with bounded size and strict schemas.
- Apply origin/CSRF protection, idempotency, signed webhook verification, rate limits, and abuse controls to mutation endpoints.
- Use secure, `HttpOnly`, appropriately scoped cookies only when needed.
- Remove sensitive tokens from browser-visible URLs after exchange and set a strict referrer policy.
- Add explicit security headers appropriate to the final application, including transport, content-type, framing, referrer, permissions, and content-security policy controls.
- Return `Cache-Control: no-store` for private results and sensitive API responses.
- Redact tokens, emails, full itineraries, pet medical details, and documents from logs and errors.
- Keep uploads disabled until purpose, provider, authentication, expiry, malware handling, access logging, deletion, backups, and incident response are defined and tested.
- Keep legal and privacy pages labelled as drafts until operator details and professional review exist; do not rely on them to activate a blocked capability.

## 16. Deployment architecture

Preserve the current Vinext/Vite/Cloudflare Worker path unless a tested limitation requires change.

- `pnpm build` validates the normal Vinext/Sites-compatible build.
- `pnpm build:cloudflare` builds the direct Cloudflare Worker with `DEPLOY_TARGET=cloudflare`.
- `wrangler.jsonc` currently names the production worker and custom domains; deployment is therefore a production-impacting action and requires explicit authorization.
- `.openai/hosting.json` currently declares no project ID, D1 database, or R2 bucket.
- Preview environments must not share production secrets, storage, Stripe mode, analytics identifiers, or content overrides.
- Configuration and migrations must be versioned, while secrets remain out of source control.
- Every release records the source revision, effective feature state, content/rule versions, checks run, rollback revision, and deployment target.

No production deployment is part of the canonical-document phase.

## 17. Test architecture

Required layers:

- Schema tests for every input, rule, source, assessment, feature policy, and analytics event.
- Decision-table tests for purpose, owner timing, recent travel, grouped jurisdictions, cargo/commercial separation, and airline segments.
- Date-boundary and timezone tests for waits, validity windows, and effective rule versions.
- Publication-gate tests for held, partial, conflicted, expired, and superseded records.
- Golden journeys covering straightforward, complex, long-lead, quarantine, permit, codeshare, airline conflict, adoption/sale, personal cargo, impossible timing, missing detail, grouped jurisdiction, and unsupported routes.
- Validation-mode tests proving no checkout, capture, review promise, upload, or operational PDF path is reachable.
- Privacy tests for URLs, cache directives, logs, analytics, and rendered metadata.
- Accessibility and responsive checks for keyboard use, screen readers, focus, contrast, reduced motion, text enlargement, long content, and 320px layouts.
- Type checking, linting, production build, Cloudflare build/preview, and bounded desktop/mobile visual inspection.

Tests must exercise the real implementation. A stale helper script that asserts a previous response contract is a failing gate, not evidence of coverage.

## 18. Migration sequence

1. **Canonical context and feature policy** — add controlling documents, retain current code for rollback, implement safe flags, and make the current checkout unreachable in validation mode.
2. **Structured data foundation** — migrate the ledger into runtime-validated source, rule, jurisdiction, classification, and airline records; do not auto-publish seed content.
3. **Minimal search and result shell** — implement the approved input and three-state result contract without payment.
4. **Government evaluator** — compose destination, origin, classification, evidence, timing, and publication gates.
5. **Airline evaluator** — optional airline, every operating segment, codeshares, and unknown-airline states.
6. **Experience redesign** — implement the approved control-desk direction and evidence-first result hierarchy.
7. **Private-beta conversion** — Ready Pack preview, waitlist, and privacy-safe analytics; payment and uploads remain off.
8. **Operational human review** — only after explicit owner approval and real operations: full intake, secure uploads, PDF, review, capture, refunds, delivery, and deletion.
9. **Release preparation** — content and legal approval, complete QA, preview, migration plan, and rollback rehearsal.

Do not combine structured regulatory migration, visual redesign, payment migration, and production release into one change.

## 19. Rollback model

Each phase must preserve a known-good revision and avoid irreversible data migration.

- Feature work defaults off until its tests and operational gates pass.
- Structured records are additive and versioned; never overwrite the only copy of an approved rule.
- New routes can be disabled independently of the existing public site.
- Storage migrations require backups and a tested down/forward recovery plan before production.
- Payment changes retain a non-capture path and an explicit kill switch.
- A rollback must restore both application code and the effective feature configuration.
- Production deployment is separate from merge and requires a recorded authorization.

## 20. Architecture acceptance criteria

The target architecture is ready for implementation when:

1. Product, source, assessment, and feature-policy contracts are runtime validated.
2. The route engine is deterministic and independent of React and external services.
3. Every rendered claim maps to approved evidence and survives the publication gate.
4. Government, transit, and every operating-airline segment remain distinct layers.
5. Date logic avoids false precision and passes boundary/timezone tests.
6. Private IDs, caching, logs, analytics, and secrets satisfy the privacy boundary.
7. Validation mode proves sales, review, uploads, reservations, and capture are unavailable.
8. The Vinext and Cloudflare builds pass without replatforming.
9. Every release has bounded scope, preview evidence, and a tested rollback.

## 21. Development-only researched answer and package workspace

`lib/route-answer-drafts.ts` contains the typed, versioned, **draft** corridor illustration. `getDraftRouteAnswer` scopes it to GB → FR/NL, personal movement, owner accompanying, no transit and non-cargo mode. Assumptions cover residence and one-pet context explicitly; this matcher does not prove eligibility. Sources are independent official references. `approvedBy` remains null.

`app/api/assess/route.ts` attaches this separate optional object only when `draftAnswersAllowed(process.env.NODE_ENV)` is true; that function accepts only `development`. The core evaluator never adds it. Production-build API probing verified no draft field and an unchanged `more_information_needed` status. This is not a replacement for the target approved-rule publication contract.

The route dashboard renders either the illustrative research answer or the existing bounded question guide. Its Ready Pack workspace consumes the same assessment. React memory holds tab and document-preparation state; neither itinerary nor preparation selections enter URLs, browser storage or additional API requests. A changed assessment remounts the workspace. Returning between guide and workspace preserves its state.

Browser printing uses a separate all-sections representation, with visible source URLs, research version, assumptions, open facts and unreviewed status. It is not a server PDF generator or fulfillment service. Pagination remains to be verified in a print-capable environment before describing export as production-ready.

No feature flags, payment paths, data providers, external service accounts or deployment configuration were activated by this extension. Live publishing is a separate authorized action.

## 22. Dated country library and conditional checklist composition

This supersedes section 21's GB/FR/NL matcher limit. Four dated JSON datasets under `lib/country-research/` contain 23 country dossiers with import and export actions, species and country applicability, origin groups, caveats, gaps and source records. Each source preserves its accessed date, publication date when known and supported claims. The library is research, not the target publication-approved rules store.

`getDraftRouteAnswer` composes personal/relocation answers for known, distinct countries. It filters species, origin, destination and US arrival region; direct-only treatment exemptions do not survive an unassessed connection. History-dependent alternatives stay conditional when residence is unknown. AU/NZ unsupported direct origins produce a blocking pathway instruction rather than an eligible-looking standard checklist. Transfer/sale/adoption remain outside this composer.

Entry and departure arrays stay separate. `blockingNotes` travel into both free and package/print views. `calendarRule` permits only explicitly implemented date-only calculations: primary EU rabies minimum, direct GB-issued AHC planning window and target arrival. `shiftCalendarDate` uses validated UTC calendar dates, including leap/month/year boundaries. Hour-based treatments, permit duration, calendar-month waits, earliest feasibility and actual overdue status are not calculated.

The development-only API gate remains unchanged. No incoming flag can enable research in production. Core status stays `more_information_needed`, earliest feasibility stays null, and `approvedBy` stays null. Dataset tests cover all 506 ordered pairs for both species as composition tests, not regulatory validation. Additional tests cover evidence resolution, direct-only exceptions, US cat isolation, unsupported origin stops and date boundaries.

The dated research documentation is the readable snapshot of these datasets. Changes require updated dossiers, conflict notes and tests; never silently relabel an automated research pass as human approval. No production deployment is authorised by this extension.


## 23. Intent-aware preview composition — 12 September 2026

MovementPurpose now additionally accepts breeding and event. Optional petCount (integer 1–20, default one for legacy requests) and ownerTravelTiming are strictly validated. Legacy minimum requests retain their parse shape. Accompaniment changes reset timing in the UI; contradictory owner-accompanied/separated timing is rejected. Assessment route facts preserve these values.

lib/journey-purpose.ts separates user-friendly labels, conservative guide selection and source-backed jurisdiction notes. needsPurposeReview is not a commercial-classification engine. The development composer returns guideKind personal or purpose-review. The latter uses three planning actions and no medical deadlines or inherited personal entry sequence. The core status, null feasibility and development-only publication gate are unchanged.

The GB/EU AHC origin instruction is merged into the destination certificate action with both bullet/source sets retained. Return preparation is conditional for a visit and absent for a relocation. Raw dated dossiers remain untouched historical research records.

RequirementList is shared by the free plan and interactive Ready Pack. Native disclosures retain action/timing while hiding supporting paragraphs. Ready Pack printing continues to use a separate expanded representation, so collapsed interaction state cannot omit medical/source details from the printed draft. Result tabs use the installed accessible Tabs primitive. No URL, persistent storage, third-party transmission or new payment behaviour was added.

## 24. Consultation booking and manual capture, 12 September 2026

This revision supersedes the previous no-payment UI and paid-pack proposition. lib/consultation.ts owns the server price (500 USD cents), workflow/version, purpose labels and strict bounded booking parser. /consultation exposes the service and booking form; /consultation/booking reads verified server payment state. The free assessment, development-only research gate and in-memory tools remain unchanged.

POST /api/checkout checks the dedicated CONSULTATION_BOOKING_ENABLED policy, same-origin JSON, request size, country/date/pet/purpose/availability/consent and attempt UUID. It creates a Stripe-hosted Checkout Session with capture_method manual, server-owned amount, explicit consent and journey metadata. BNPL methods that may collect upfront instalments are excluded. The attempt UUID remains stable across retries and changes when the form changes. The callback uses the requesting origin, constrained to the configured HTTPS site in live mode. An HTTP-only, same-site checkout-reference cookie supports the return status. No credentials are serialized into the page.

GET /api/checkout-status requires the return reference to match that cookie. This proves reference possession, not authenticated customer identity. New consultation states validate session and PaymentIntent amount/currency/mode/workflow, manual capture, capturable/received amount and refund state. It returns only lifecycle state, test mode and card expiry where available. It never captures, approves, schedules or cancels new consultation holds. Captured payment is not displayed as a confirmed call time.

The signed webhook retains automatic release only for the exact historical US$7 reservation workflow. It does not cancel or capture new consultation holds. The existing Stripe Dashboard is the operator workflow: a person checks suitability, records approval, captures or cancels, and arranges the call/recap manually. There is no public capture endpoint, automatic email sender, booking calendar, customer account, document store or invented approval flag.

Production defaults remain Stripe test mode with ZURTEX_LIVE_READY false. Legacy paid flags remain disabled; the new consultation booking flag does not activate those old flows. An unavailable Stripe client produces a clear disabled-checkout state and API 503, never a simulated success. Live verification and hosting are separate steps requiring the existing account connection and launch controls.
