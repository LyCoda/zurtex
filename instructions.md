# Zurtex 2.0 — Repository and Agent Instructions

**Document status:** Controlling implementation instructions

**Last updated:** 11 September 2026

**Applies to:** Product planning, design, engineering, regulatory research, testing, private-beta validation, and release preparation for `LyCoda/zurtex`.

---

## 1. Read order

Before doing material work, read:

1. `ZURTEX_DECISIONS.md`
2. This `instructions.md`
3. Current official sources and the approved verification ledger
4. Relevant technical, content, and design specifications
5. Existing repository code

`ZURTEX_DECISIONS.md` controls product and commercial choices. Current competent authorities and operating airlines control factual travel requirements.

Do not substitute competitor copy, model memory, or the existing site's behaviour for an approved decision or official source.

### Decision labels

- **CONFIRMED** — approved requirement.
- **PROVISIONAL** — working default or feature-flagged approach.
- **DEFERRED** — intentionally excluded from the first release.
- **BLOCKED** — cannot be activated safely yet.
- **OPEN** — still requires an owner decision.

---

## 2. Product mission

Zurtex is a **pet-travel planning and preparation service** for international travellers with dogs and cats.

Its main audiences are:

- Pet owners relocating internationally.
- International students and expatriates.
- Families moving countries.
- Frequent travellers with pets.
- People handling adoption, sale, or transfer journeys.

The core journey is:

1. Ask for the minimum route facts.
2. Show useful, source-linked information before payment.
3. Explain what is known, missing, uncertain, or likely to require action.
4. Preview a paid Ready Pack containing a detailed, human-reviewed plan.
5. Escalate genuinely complex or unsupported routes honestly.

Core proposition:

> **See the key requirements before you pay. Purchase a Ready Pack when you want a detailed, human-reviewed plan organised around your journey.**

Zurtex sells clarity, organisation, and preparation. It does not sell government approval.

---

## 3. Private-beta operating safeguard

The first release is a private beta and demand-validation test.

The intended end-state is a US$5 human-reviewed Ready Pack delivered as a PDF. The owner does not currently intend to perform live manual reviews during the first demand test.

Therefore, until the review operation is active:

- Keep Ready Pack sales and payment capture disabled.
- Use a waitlist, early-access request, or clearly disclosed refundable reservation instead of a completed-service promise.
- Do not promise 24–48-hour delivery.
- Do not enable document uploads.
- Do not call a route manual-review-required merely to improve conversion.
- Do not claim that a customer has purchased human review when no reviewer will perform it.

Recommended feature flags:

```text
FREE_ROUTE_GUIDE_ENABLED=true
PRIVATE_BETA_ENABLED=true
READY_PACK_WAITLIST_ENABLED=true
READY_PACK_SALES_ENABLED=false
MANUAL_REVIEW_ENABLED=false
DOCUMENT_UPLOADS_ENABLED=false
PAYMENT_CAPTURE_ENABLED=false
REFUNDABLE_RESERVATION_ENABLED=false
```

The refundable reservation flag may be enabled only after its copy, technical behaviour, and automatic release are verified.

---

## 4. Product boundaries

Zurtex must not claim to:

- Clear, approve, certify, or guarantee a pet's travel.
- Guarantee boarding, entry, quarantine release, or document acceptance.
- Issue, alter, endorse, or submit certificates or permits.
- Replace a government authority, veterinarian, airline, customs broker, lawyer, or qualified relocation specialist.
- Give medical advice, including sedation or fitness-to-fly advice.
- Provide a functioning human review where no reviewer is operating.

Zurtex may:

- Explain apparent route requirements in plain language.
- Organise current official-source information around a journey.
- Show approximate lead time and an earliest feasible date where the input supports it.
- Highlight missing, conflicting, held, or date-sensitive information.
- Separate government rules from airline carriage.
- Provide official links and next questions for the relevant authority, veterinarian, or carrier.

Use customer-facing wording substantially similar to:

> Zurtex organises the information currently available from official sources around the journey details you provide. It is a planning aid, not an official decision or guarantee, and some requirements may depend on facts not yet supplied or may change before travel. When the human-reviewed Ready Pack service is available, it can provide a more detailed route-specific preparation plan. Final confirmation remains with the relevant authorities, your veterinarian, and each operating carrier.

---

## 5. Source-of-truth hierarchy

Use this order:

1. Current official government, competent veterinary authority, customs, quarantine, and operating-airline sources.
2. Approved records in the Zurtex verification ledger.
3. `ZURTEX_DECISIONS.md`.
4. This file.
5. Approved route-engine, content-governance, product, and design specifications.
6. Existing code.
7. Competitor inspiration.
8. Model memory or unsupported assumptions.

PetCleared and similar services may inspire information architecture, trust signals, and interaction design. They are not regulatory authority.

---

## 6. Regulatory-content rules

Every customer-facing material claim must be traceable to an approved source record.

Each structured rule should support, where applicable:

- Stable rule ID.
- Jurisdiction and destination.
- Origin classification.
- Species.
- Age and breed restrictions.
- Movement purpose and ownership transfer.
- Owner or authorised-person timing.
- Recent-travel lookback.
- Microchip standard and sequencing.
- Rabies vaccination and titre requirements.
- Waiting periods.
- Permits, certificates, and government endorsement.
- Parasite-treatment timing.
- Quarantine and reservation.
- Ports, airports, and inspection points.
- Pet-count limits.
- Transit and return implications.
- Official authority and source URL.
- Internal checked date.
- Effective-from and effective-until dates.
- Manual-verification status.
- Completeness status.
- Change history.
- Reviewer and approval record.

### Publication controls

Do not present records with these statuses as confirmed:

- `draft`
- `held`
- `expired`
- `superseded`
- `unverified`
- `conflicted`

When a rule is incomplete, use **More information needed**, show the limitation, and identify the authority or fact needed.

### No runtime fabrication

The route engine must use approved structured rules and deterministic logic. A language model may improve wording only after the factual result is assembled and must be prevented from introducing new requirements.

### Conflicting sources

When official sources materially conflict:

1. Preserve the conflict.
2. Do not silently select the easiest answer.
3. Hold the claim from confirmed automatic publication.
4. Escalate to human review when that service is operational.
5. Otherwise show the limitation and official contacts.

---

## 7. Route logic

A result must not be generated from destination alone.

The full engine may consider:

- Origin and destination.
- Intended arrival date.
- Species.
- Owner or authorised-person travel.
- Purpose: personal, relocation, sale, adoption, or transfer.
- Travel mode: cabin, hold, or cargo.
- Airline and every operating segment.
- Transit countries and airports.
- Age, breed, weight, number of pets, microchip, vaccination, titre, recent travel, permits, certificates, and return journey when collected in the paid intake.

### Cargo versus commercial purpose

Cargo is a carriage method, not automatic proof of commercial movement. Determine movement classification from ownership transfer, sale/adoption purpose, owner timing, number of pets, and applicable law.

### Grouped jurisdictions

The initial selector may group territories for simplicity. If a legally material subdivision is unknown, do not assume equivalence. Ask for the subdivision later or return **More information needed**.

---

## 8. Minimal free search

Do not use a long progressive questionnaire before the first result.

### Required fields

- Origin.
- Destination.
- Intended arrival date.
- Dog or cat.
- Owner/family/authorised-person travel relationship.
- Movement purpose.
- Cabin, hold, or cargo.

### Optional fields

- Marketing airline.
- Operating airline for each known segment.
- Transit country when a transit exists.

### Not required before the free result

Do not require departure date, return date, age, breed, weight, pet count, microchip details, vaccination dates, titre details, recent-travel history, transit airport, or existing document details.

### Consequence of minimal input

Never create false precision. Show an exact earliest date only when the supplied facts and route-level rules support it. Otherwise explain which additional information is needed for the paid timeline.

---

## 9. Free Route Guide

The free web result should include, where relevant:

- Route summary.
- One of three primary statuses: **More information needed**, **Actions required**, or **Plan looks feasible**.
- Preparation complexity: Straightforward, Moderate preparation, Complex, or Specialist route.
- Main microchip, rabies, titre, wait, permit, certificate, endorsement, treatment, quarantine, entry-point, breed, age, pet-count, airline, transit, and return warnings.
- Approximate preparation time.
- Earliest feasible arrival where defensible.
- Missing facts and limitations.
- Official authority, source link, effective date, manual-verification status, incompleteness warning, and relevant change history.

Do not include:

- Full reverse timeline.
- Detailed dated action plan.
- Downloadable free PDF.
- Full transit-airport analysis.
- Return-journey plan.

No email is required to see the result. The free result is session-only until the user supplies an email for early access or the Ready Pack.

Public origin-to-destination SEO pages are deferred.

---

## 10. Airline evaluation

Government eligibility and airline carriage are separate analyses.

Airline selection is optional. If absent, show **Airline compatibility not yet assessed**.

If airline analysis is performed:

- Use every operating carrier, not only the marketing carrier.
- Support codeshares.
- Allow **Other airline** and show limited coverage.
- Do not quote airline fees at launch.
- Do not recommend one airline over another.
- Do not represent a carrier with a simple `supportsPets` boolean.

The data model should support cabin, hold, cargo, species, weight, dimensions, aircraft, route, breed, snub-nosed, age, pregnancy, seasonal, temperature, connection, interline, reservation, source, effective date, and editorial status fields.

Detailed multi-segment and transit assessment is a Ready Pack function.

---

## 11. Ready Pack specification

The first paid product is one simple Ready Pack, not multiple tiers.

### Included

- Personalised route summary.
- Step-by-step action plan.
- Reverse timeline from intended arrival.
- Dated calendar section inside the PDF.
- Printable checklist.
- Veterinarian brief.
- Vaccination and treatment discussion list.
- Document tracker.
- Permit and government-form instructions.
- Airline booking checklist.
- Carrier/crate checklist.
- Transit checklist.
- Official sources.
- Saved rule/source snapshot.
- Human review before delivery.

### Excluded at launch

- Arrival-day checklist.
- Return-journey checklist.
- Rule-change alerts.
- Email reminders.
- Calendar-file export.
- Automated document analysis.
- A persistent document vault as a marketed feature.

### Commercial terms

- Delivery: downloadable PDF only.
- Price: US$5 introductory price, USD only.
- Coverage: all pets on one family itinerary, subject to route scope and legal limits.
- Active period: six months.
- Minor updates included; material route changes require a new purchase.
- One price for supported routes.
- Human-reviewed before delivery.
- Delivery target: 24–48 hours after acceptance and complete information, only when operational.

---

## 12. Payments and refunds

Preserve the current Stripe flow until a replacement is tested. Do not let legacy checkout behaviour dictate the new product.

### Validation mode

- No payment capture.
- Prefer waitlist/early access.
- A US$7 temporary refundable authorisation may be tested only behind a feature flag and with explicit disclosure.
- A reservation is not acceptance or the product price.

### Operational paid mode

- Capture payment only after human case acceptance and successful Ready Pack generation.
- Release/refund fully if Zurtex cannot generate the promised pack.
- Do not publish final refund terms until all cancellation and change scenarios are decided.

Never put Stripe, Cloudflare, email, or database secrets in source code, prompts, logs, screenshots, or analytics.

---

## 13. Human review, support, and documents

The intended end-state is personal review of every paid pack by the owner.

- Support channel: email.
- Target response/delivery window: 24–48 hours when operational.
- No professional partnerships currently exist.
- Difficult routes may receive verified general information, optional paid review when staffed, or an unsupported result.

### Document uploads

Uploads are permitted only for an accepted paid case and only through a secure website link sent by email.

- No automated analysis at launch.
- Human review only.
- Disable uploads during demand validation.
- Store the minimum required data.
- Delete journey data and documents after the journey, using a documented deletion schedule.
- Self-service deletion UI is deferred; provide an email deletion/correction route.

---

## 14. Geographic coverage

Aim to display all 23 researched markets when verified.

- Verified content may appear normally.
- Incomplete markets remain visible with limited-coverage or more-information-needed treatment.
- Never publish unverified detail merely to claim complete coverage.
- Brand presentation is globally neutral.

---

## 15. Content maintenance

- Owner personally approves rule updates.
- Recheck ordinary rules every three months.
- Automatically monitor high-risk/date-sensitive sources, then require manual approval.
- Store checked date internally even though the main customer result does not need to show it.
- Show authority, source, effective date, manual-verification status, incompleteness, and change history.
- Preserve the exact rule snapshot used for every Ready Pack.

---

## 16. Brand and design direction

Brand qualities:

- Trustworthy.
- Premium.
- Efficient.
- Friendly.
- International.
- Transparent.

Creative calibration:

- Playfulness: approximately 6.5/10.
- Premium: approximately 6.5/10.

Use:

- Real pet-and-traveller photography.
- Route-map and airport-display elements.
- A clean interface with restrained decorative imagery.

A complete redesign is permitted, including new logo direction.

Retain the interaction principle of a concise selection surface and clearly presented result. Do not copy PetCleared or another competitor.

Avoid:

- Generic SaaS dashboards.
- Excessive gradients.
- Corporate government styling.
- Too many cards or nested cards.
- Fake trust marks, testimonials, or usage claims.
- Decorative motion that impairs speed or accessibility.

### Impeccable workflow

When available:

1. Initialise durable product context.
2. Document the incumbent design.
3. Shape the minimal search, result, evidence, airline, beta, and Ready Pack surfaces.
4. Build the selected direction.
5. Run bounded critique, audit, hardening, responsive, and polish passes.
6. Stop after a desktop/mobile verification round and one consolidated correction round.

---

## 17. Technical architecture

Current context: TypeScript, React/Vinext, Cloudflare deployment tooling, and Stripe.

Rules:

- Inspect before replatforming.
- Do not replatform without a tested technical reason.
- Separate data, deterministic evaluation, presentation, payments, and analytics.
- Use TypeScript and runtime schema validation.
- Keep facts out of UI components.
- Do not keep all logic inside `app/page.tsx`.
- Replace one-line country/airline notes with structured, versioned records.
- Use opaque private journey IDs and `noindex` personalised pages.
- Do not expose personal facts in URLs.
- Preserve rollback and feature flags.

Suggested direction:

```text
data/
  jurisdictions/
  airlines/
  classifications/
  sources/

lib/
  route-engine/
    schema.ts
    evaluator.ts
    timeline.ts
    classifications.ts
    airline-evaluator.ts
    result-builder.ts
    validation.ts

app/
  results/[journeyId]/
  countries/[country]/
  airlines/[airline]/
  methodology/
  ready-pack/
  private-beta/
```

Public corridor SEO routes are not part of the initial release.

---

## 18. Analytics

Track privacy-safe events for:

- Route search started/completed.
- Corridor aggregate.
- Unsupported route.
- Airline conflict.
- Email capture.
- Ready Pack preview.
- Purchase/accepted order when enabled.
- Checkout abandonment.
- Repeat visit.
- Support enquiry.
- PDF download.

Do not track source-link clicks at launch.

Never place names, microchip numbers, vaccination details, document content, or full sensitive itineraries in analytics.

---

## 19. Git and release rules

- Work on a dedicated branch.
- Keep pull requests bounded.
- Keep the existing site live during development.
- Do not combine the full regulatory migration, visual redesign, payment migration, and production deployment into one unreviewable change.
- Use preview environments.
- Do not deploy to production without explicit approval.
- Do not activate Ready Pack sales, review, uploads, or capture by implication; use explicit feature flags.

Recommended phases:

1. Audit and canonical documentation.
2. Decision and feature-flag foundation.
3. Structured schemas and source registry.
4. Minimal free search and result shell.
5. Deterministic route evaluator.
6. Airline evaluator.
7. Complete visual redesign and logo direction.
8. Private-beta waitlist and analytics.
9. Human-review operating process.
10. Ready Pack PDF and payment activation.
11. QA, preview, and controlled release.

---

## 20. Required tests

Where applicable, run:

- Type checking.
- Linting.
- Unit and decision-table tests.
- Production build.
- Cloudflare preview/build.
- Date-boundary and timezone tests.
- Country-classification tests.
- Cargo-versus-commercial tests.
- Codeshare and multi-segment tests.
- Held/unverified source tests.
- Minimal-input false-precision tests.
- Unsupported and manual-review gating tests.
- Payment non-capture tests in validation mode.
- Upload-disabled tests in validation mode.
- Accessibility, keyboard, screen-reader, contrast, zoom, responsive, and reduced-motion checks.
- Analytics privacy checks.
- Private/noindex URL checks.
- Desktop and mobile visual inspection.

Golden journeys must cover simple, complex, long-lead, quarantine, airline conflict, codeshare, adoption/sale, personal cargo, impossible timing, missing details, grouped jurisdiction, and unsupported cases.

---

## 21. Required AI-agent workflow

Before editing:

1. Read `ZURTEX_DECISIONS.md` and this file.
2. Inspect relevant repository files.
3. State current behaviour.
4. Identify contradictions, blocked features, and unverified claims.
5. Define the smallest safe scope.
6. List files expected to change.
7. Define acceptance tests.

During implementation:

- Do not expand scope silently.
- Do not convert blocked features into active promises.
- Do not invent product decisions or travel facts.
- Do not use manual review as a conversion fiction.
- Do not collect documents without active review operations.
- Preserve feature flags and rollback.
- Prefer structured data and reusable components.

After implementation:

1. List changed files.
2. Explain architecture and product choices.
3. Report tests and build results.
4. Provide desktop/mobile evidence for UI work.
5. List limitations and open decisions.
6. Identify unverified customer-facing claims.
7. State clearly whether anything was deployed.

---

## 22. Protected areas

Unless the task explicitly includes them, do not modify:

- Live Stripe secrets or production payment settings.
- Cloudflare production credentials.
- DNS or domain configuration.
- Legal, privacy, or refund pages as though professional review occurred.
- Real customer records.
- Retention behaviour.
- Production analytics IDs.
- Held, expired, conflicted, or unverified rules.
- Human-review, document-upload, or payment-capture flags.

---

## 23. Definition of success

Zurtex 2.0 succeeds when a traveller can:

1. Complete a low-friction route search.
2. Receive useful information before payment.
3. Understand what is known, missing, and uncertain.
4. See government and airline conclusions separately.
5. Understand approximate preparation time without false precision.
6. Inspect official evidence.
7. See the added value of a detailed human-reviewed PDF.
8. Join the private beta without being misled about availability.
9. Trust that Zurtex did not invent requirements or manufacture a manual-review need.

A visually impressive interface is not sufficient. The product must also be truthful, source-led, accessible, maintainable, privacy-conscious, and operationally deliverable.
