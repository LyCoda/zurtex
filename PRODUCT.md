# Zurtex 2.0 — Canonical Product Definition

**Static guide update (12 September 2026):** The customer route guide now assembles the maintained research library through a short staged progress sequence. It does not fetch or compare official pages during each customer search and has no production Workers AI binding. Checked dates, source links, evidence gaps and publication holds remain visible. The separate verification endpoint remains available for local editorial testing.

**Results update (12 September 2026):** The owner requested substantive PetsCleared-inspired results in Zurtex's own identity, live official-source checks, a small open-weight evidence comparator and an honest loading journey. The implementation adds source-linked research previews behind the server-controlled `ZURTEX_RESEARCH_RESULTS_ENABLED` flag, enabled in the prepared deployment configuration. This supersedes the earlier development-only presentation restriction for this research-preview experience, while preserving draft status, null human approval, uncertain eligibility, and unchanged commercial controls. AI comparison does not approve or rewrite canonical rules. The current changes have not yet been deployed to production.

**Document status:** Canonical product specification

**Product mode:** Local private beta; free travel tools and optional consultation booking

**Decision owner:** Zurtex owner/operator

**Last updated:** 12 September 2026

**Current offer:** Section 18 supersedes earlier Ready Pack sales, enquiry-first and no-payment proposals. The implemented offer is US$5 for one journey, with a call without a fixed time limit and a recap without a fixed delivery deadline. Booking uses a Stripe hold pending human review. Credentials are not connected in this local preview, so real checkout remains unavailable. Earlier dated sections are retained as decision history, not current sales promises.

**Publication update (12 September 2026):** The revised site is deployed to the existing Cloudflare Worker and zurtex.org. The hosted environment has Test checkout connected; live payments and detailed research publication remain gated. See docs/audits/2026-09-12-cloudflare-release.md for the release and rollback record.

## 1. Purpose and authority

This document turns the approved decisions in `ZURTEX_DECISIONS.md` into one implementation-facing product definition. It defines what Zurtex 2.0 is, who it serves, what is available in each operating mode, and what must remain unavailable.

Precedence is:

1. Current competent government authorities and operating airlines for factual travel requirements.
2. `ZURTEX_DECISIONS.md` for product and commercial choices.
3. `instructions.md` for delivery and safety controls.
4. This document for the canonical product model.
5. `ARCHITECTURE.md` for implementation boundaries and contracts.
6. Approved design and surface specifications.
7. Existing code.

This document does not approve a regulatory claim, settle an open legal question, or activate a blocked service.

**Local preview scope (11 September 2026):** The implemented free beta is currently a two-stage route search and source-linked question dashboard. It supports editing flight details and US arrival region, but does not yet provide approved personalised requirements or calculated deadlines. The target requirements below remain the roadmap, not a claim of completed capability. The user-directed presentation restores the earlier zurtex.org identity; `DESIGN.md` and the home-route surface brief govern visual work.

**Brand asset update (12 September 2026):** The owner requested a new logo, a replacement airport hero to address the former image's implausible kennel and ankles, and a minimal plane-and-map loading screen. The new original paw with a Z-shaped pad and outlined Afacad wordmark, plus `public/images/zurtex-airport-companion-v2.webp`, supersede the earlier circular mark and airport image. The hero is a generated brand image, not a real customer photograph; its provenance is recorded in `docs/design/2026-09-12-brand-photo-prompt.md`. The loading plane follows the current guide-assembly stage. `DESIGN.md` and the dated brand/loading direction records govern this narrow update; it adds no regulatory, airline-eligibility or service claims.

## 2. Product definition

Zurtex is a **pet-travel planning and preparation service** for international travel with dogs and cats.

Zurtex helps a traveller:

- Understand the main requirements that appear relevant to the supplied journey.
- See which facts are known, missing, uncertain, held, or date-sensitive.
- Distinguish government eligibility from airline carriage.
- Inspect the official evidence behind each material claim.
- Prepare better questions for authorities, veterinarians, and operating carriers.
- Request early access to a future human-reviewed Ready Pack.

Zurtex does not approve, clear, certify, guarantee, or arrange travel. It does not replace an authority, veterinarian, airline, customs broker, lawyer, or qualified relocation specialist.

### Core proposition

> **See the key requirements before you pay. Purchase a Ready Pack when you want a detailed, human-reviewed plan organised around your journey.**

### Target customers

- Pet owners relocating internationally.
- International students and expatriates.
- Families moving countries.
- Frequent travellers with pets.
- People handling adoption, sale, or ownership-transfer journeys.

Adoption, sale, transfer, cargo, quarantine, and other complex journeys are real customer needs. They are not automatically eligible for a standard Ready Pack and must never be rejected or labelled commercial solely because of the aircraft carriage mode.

## 3. Operating modes

The product has two deliberately separate operating modes.

### 3.1 Private-beta validation — current required mode

Available:

- Anonymous Free Route Guide.
- Ready Pack preview.
- Waitlist or early-access request.
- Privacy-safe demand analytics after their schema and provider are approved.

Unavailable:

- Ready Pack sales.
- Payment capture.
- Temporary card authorisations or reservations.
- A promise of human review.
- A 24–48-hour delivery or support promise.
- Document upload or document intake.
- A functioning paid-case acceptance workflow.

The beta must feel intentional. It should clearly state what is available now, what the future Ready Pack adds, and that joining the beta does not create a service order.

### 3.2 Operational paid service — future gated mode

This mode may be activated only after the owner confirms all operational, technical, payment, privacy, content, and legal gates in section 12.

Available only after activation:

- Case intake and human acceptance.
- Secure, purpose-limited document upload for accepted cases.
- Human review of every Ready Pack.
- PDF generation and reviewer approval.
- Payment capture after case acceptance and successful pack generation.
- Email delivery and six-month private access.
- The supported 24–48-hour delivery target after acceptance and complete information.

## 4. Required feature state

The initial implementation must fail closed with these effective values:

| Flag | Required initial value | Meaning |
|---|---:|---|
| `FREE_ROUTE_GUIDE_ENABLED` | `true` | The source-linked free result is available. |
| `PRIVATE_BETA_ENABLED` | `true` | Private-beta copy and controls are active. |
| `READY_PACK_WAITLIST_ENABLED` | `true` | A user may request early access after seeing a result. |
| `READY_PACK_SALES_ENABLED` | `false` | No Ready Pack order can be created. |
| `MANUAL_REVIEW_ENABLED` | `false` | No review may be promised or represented as active. |
| `DOCUMENT_UPLOADS_ENABLED` | `false` | No document-upload route or invitation is available. |
| `PAYMENT_CAPTURE_ENABLED` | `false` | No funds may be captured. |
| `REFUNDABLE_RESERVATION_ENABLED` | `false` | The provisional US$7 authorisation experiment is unavailable. |

An implementation must reject contradictory combinations. In particular, sales, uploads, capture, delivery promises, or review claims cannot become active through copy changes or the presence of dormant code.

## 5. Free Route Guide

### 5.1 Entry experience

The first search is concise and fixed. It must not become a long medical or document questionnaire before value is shown.

Required fields:

- Origin country or grouped jurisdiction.
- Destination country or grouped jurisdiction.
- Intended arrival date.
- Species: dog or cat.
- Traveller relationship: owner, family member, or authorised person.
- Movement purpose: personal travel, relocation, sale, adoption, or transfer.
- Travel mode: cabin, checked/accompanied hold, or cargo.

Optional fields:

- Marketing airline.
- Operating airline for each known segment.
- Whether the itinerary contains a transit.
- Transit country when known.

Not required before the result:

- Departure date or return date.
- Age, breed, weight, pregnancy, or pet count.
- Microchip, vaccination, titre, treatment, permit, or certificate details.
- Recent travel history.
- Transit airport.
- Existing documents.

No email or account is required to see the free result.

### 5.2 Result contract

Every result uses exactly one primary status:

1. **More information needed** — a material fact or approved rule is missing, so Zurtex cannot safely select a pathway.
2. **Actions required** — identified prerequisites must be completed or confirmed.
3. **Plan looks feasible** — no known hard conflict appears in the supplied facts; this is not approval or a guarantee.

Every result also uses one preparation-complexity label:

- Straightforward.
- Moderate preparation.
- Complex.
- Specialist route.

Where relevant and supportable, the guide includes:

- Route and supplied-fact summary.
- Government requirements and warnings.
- Airline assessment or **Airline compatibility not yet assessed**.
- Transit limitation.
- Return-journey warning.
- Approximate preparation duration.
- Earliest feasible arrival only when deterministic inputs support it.
- Missing facts and reasons greater precision is unavailable.
- Official authority, source link, effective date, manual-verification status, incompleteness warning, and relevant change history for each material claim.
- Ready Pack preview and private-beta action.

The free result excludes the full reverse timeline, detailed dated plan, complete transit-airport analysis, return plan, and downloadable PDF.

### 5.3 False-precision rule

The free search intentionally omits detailed pet-history dates. If those missing facts can change the legal pathway or earliest date, the result must say **More information needed**. A route-level range may be shown only when approved rule data supports it. Zurtex must not turn an intended travel date into a fabricated personalised deadline.

### 5.4 Jurisdiction and itinerary safeguards

- Ask the minimum follow-up needed when a grouped selection contains legally distinct territories, including Great Britain/Northern Ireland, Peninsular Malaysia/Sabah/Sarawak, and mainland United States/Hawaii/Guam.
- Treat movement purpose independently from cabin, hold, or cargo mode.
- Treat every operating carrier segment independently from the marketing carrier.
- If an airline is unknown or outside coverage, show a limited state and request operating-carrier details; do not infer compatibility.
- If transit exists, disclose that the free guide does not complete transit-airport analysis.
- If approved evidence is missing, held, stale, conflicted, or incomplete, do not display the affected detail as confirmed.

## 6. Ready Pack

### 6.1 End-state proposition

One one-time purchase provides an organised, human-reviewed preparation plan for all pets on one submitted family itinerary, subject to route scope and legal pet-count limits.

Commercial terms:

- Introductory price: **US$5**.
- Currency: USD only.
- Product tiers: one.
- Delivery: downloadable PDF.
- Active period: six months.
- Minor corrections: included.
- Material route changes: require a new purchase.
- Human review: required before delivery.
- Delivery target: 24–48 hours after case acceptance and complete information, only when operational.

### 6.2 Included deliverables

- Personalised route summary.
- Step-by-step action plan.
- Reverse timeline from intended arrival.
- Dated calendar section inside the PDF.
- Printable checklist.
- Veterinarian appointment brief.
- Vaccination and treatment discussion list.
- Document tracker.
- Permit and government-form instructions.
- Airline booking checklist.
- Carrier or crate checklist.
- Transit checklist.
- Official source list.
- Snapshot of the rule and source versions used.
- Human review before delivery.

### 6.3 Excluded at launch

- Arrival-day checklist.
- Return-journey checklist.
- Rule-change alerts.
- Email reminders.
- Calendar-file export.
- Automated document extraction, checking, or validation.
- A marketed or persistent document vault.
- Customer accounts.

### 6.4 Ready Pack preview

The preview may describe route-specific value derived from the free assessment, such as likely requirement categories, dated actions, veterinary items, permit stages, airline confirmations, transit issues, and facts still needed. Counts must be computed from approved assessment output, not invented marketing copy.

During validation, the action is substantially similar to:

> **Join the private beta for a chance to receive early access to the human-reviewed Zurtex Ready Pack.**

It must not imply purchase, acceptance, guaranteed delivery, or reviewer availability.

## 7. Difficult and unsupported journeys

When Zurtex cannot complete an automatic assessment:

1. Show verified general information and safe official starting points where available.
2. Explain the specific missing fact, evidence gap, conflict, classification, or specialist dependency.
3. Use one of the three public statuses and an appropriate complexity label.
4. Offer a paid human-review service only when it is genuinely staffed and separately defined.
5. Otherwise identify the route as unsupported within the explanation and direct the traveller to the relevant authority or qualified specialist.

Manual review must never be used as a conversion fiction.

## 8. Evidence and content governance

The verification ledger is a migration seed, not automatic publication approval.

Each material claim requires:

- Stable rule and source identifiers.
- Jurisdiction, species, date, origin classification, purpose, traveller relationship, mode, and other applicability predicates.
- Plain-language effect and action.
- Competent authority or operating-airline source.
- Internal checked date.
- Effective-from and effective-until dates where available.
- Manual-verification, completeness, conflict, and publication status.
- Change history, reviewer, and approval record.

Records in `draft`, `held`, `expired`, `superseded`, `unverified`, or `conflicted` state cannot produce confirmed customer-facing claims.

Ordinary rules are rechecked every three months. High-risk or date-sensitive sources may be monitored automatically, but a human owner approves every published change. A language model may improve wording only after deterministic factual assembly and under a no-new-claims constraint.

## 9. Privacy, identity, and retention

- No account is required at launch.
- Free results are session-only until a user supplies an email for early access or a future purchase.
- Persisted results and packs use opaque private IDs, email links, and `noindex`.
- Names, emails, microchip numbers, vaccination details, document contents, and sensitive itineraries do not appear in URLs or analytics.
- Validation mode collects no documents.
- Future uploads are available only for an accepted paid case, through a secure website link sent by email, for human review only.
- Journey data and documents are deleted after the journey under an approved schedule that still needs to be defined.
- Deletion and correction requests are supported by email; self-service deletion is deferred.

Customer-facing legal, privacy, payment, refund, and worldwide-service wording must not be described as professionally approved until that review has occurred.

## 10. Analytics

Analytics exists to validate demand and find product failures without collecting sensitive travel or medical data.

Permitted event families:

- Route search started and completed.
- Aggregated corridor demand.
- Unsupported route shown.
- Airline conflict shown.
- Email captured and private beta joined.
- Ready Pack preview viewed.
- Checkout started or abandoned only when the reservation experiment is explicitly enabled.
- Purchase completed and PDF downloaded only when paid service is operational.
- Repeat visit and support enquiry.

Official-source-link clicks are not tracked at launch. Event payloads exclude names, email addresses, full free text, microchip or vaccination data, document content, and sensitive full itineraries.

## 11. Information architecture

Initial public surfaces:

- `/` — minimal route search and product proposition.
- `/methodology` — source hierarchy, editorial process, limitations, and corrections.
- `/countries/[country]` — optional maintainable country-level evidence.
- `/airlines/[airline]` — optional general carrier evidence.
- `/ready-pack` — product explanation and beta state.
- `/private-beta` — waitlist or early-access request.
- `/about`, `/contact`, `/privacy`, `/terms`, and `/payments-refunds`.

Initial private surfaces:

- `/results/[journeyId]` — opaque, private, `noindex` result.
- `/ready-pack/[journeyId]/preview` — personalised value preview.

Future, disabled surfaces:

- `/intake/[secureToken]`.
- `/documents/[secureToken]`.

Public origin-to-destination SEO pages are deferred.

## 12. Launch gates

### Private-beta Route Guide

May launch only when:

- Every displayed claim is backed by approved evidence.
- The three result states and complexity labels behave consistently.
- Minimal input does not produce false precision.
- Grouped jurisdictions, transit, unknown airlines, and unsupported routes fail safely.
- Payment, reservations, review promises, and uploads are disabled.
- Waitlist copy is truthful and consent is recorded.
- Analytics payloads contain no sensitive data.
- Accessibility, responsive, performance, Cloudflare preview, and rollback checks pass.

### Operational Ready Pack

May launch only when:

- A real reviewer accepts responsibility for every paid case.
- Acceptance criteria, review checklist, work queue, capacity, and support coverage exist.
- The 24–48-hour workflow is achievable.
- Secure intake, access control, expiry, storage, and deletion are tested.
- PDF generation, rule snapshots, and final reviewer approval are complete.
- Payment and refund flows are tested, with capture only after acceptance and successful generation.
- The US$5 product and any optional US$7 reservation are unambiguous.
- Operator identity, tax, privacy, terms, refunds, cancellation, retention, and worldwide-service implications have been reviewed.

## 13. Open decisions and blockers

The following remain outside implementation discretion:

- Human-review staffing, hours, capacity, and quality ownership — **BLOCKED**.
- Paid activation and payment capture — **BLOCKED**.
- Legal operator name, jurisdiction, address, and support identity — **OPEN**.
- Tax treatment — **OPEN**.
- Complete refund and cancellation policy — **OPEN**.
- US$7 reservation feasibility and wording — **PROVISIONAL; disabled**.
- Post-launch price — **OPEN**.
- Precise minor-versus-material update policy — **OPEN**.
- Retention and backup deletion windows — **OPEN**.
- Secure upload provider and controls — **BLOCKED**.
- Adoption, sale, and transfer acceptance boundaries — **OPEN**.
- Professional privacy and legal review — **BLOCKED**.
- Exact production route coverage — **BLOCKED BY EVIDENCE**.

## 14. Product acceptance criteria

Zurtex 2.0 is product-complete for private beta only when a traveller can:

1. Complete the minimal search without an email.
2. Receive meaningful, source-linked information before payment.
3. Understand what is known, missing, uncertain, held, and unsupported.
4. See government and airline conclusions separately.
5. Understand approximate timing without false precision.
6. Inspect the authority and editorial state for each material claim.
7. Understand the future Ready Pack's additional value.
8. Join the private beta without believing a purchase, review, upload, or delivery has begun.

Nothing in the interface may imply government approval or an operational capability that does not exist.

## 15. Local answer and Ready Pack preview — 11 September 2026

The current development build includes an original answer-led demonstration based on independently checked official guidance. It is available only for the illustrated direct, personal, owner-accompanied, one-dog/cat pathway from Great Britain to France or the Netherlands. Assumptions and unapproved status are visible. It is not an expansion of publication-approved coverage; the production response continues to omit this research payload.

Every free result now opens an in-memory Ready Pack workspace with Preparation, Vet brief, Documents and Sources sections. A browser-print layout contains all sections and an explicit unreviewed-draft notice. Document choices are personal preparation notes, not evidence of compliance; they survive tab changes and return to the free guide, but are cleared by journey edits or page navigation/refresh.

This is a preview of the future US$5 product, not its commercial launch. It does not deliver a reviewed PDF, calculated reverse timeline, multi-pet intake, private six-month access, return checklist, calendar export, reminders, uploads, reviewer booking or payment. Existing launch gates and confirmed commercial scope remain unchanged. The free preview must not be represented as a purchased or reviewer-approved Ready Pack.

Research and branch-level evidence: `docs/research/2026-09-11-petcleared-flows-and-ready-pack.md`.

## 16. Country research and ordered answers — superseding the two-corridor preview

The later 11 September 2026 iteration expands the development-only research library to all 23 selectable jurisdictions: each can be the starting country with 22 other destinations. This supersedes section 15's two-corridor display limit, not its publication or commercial gates.

Personal travel and relocation results now compose a species-filtered destination checklist and a separate origin-export checklist. The free answer uses openly readable actions, requirement/conditional/planning badges, timing, practical bullets and adjacent official sources. Direct GB-to-EU AHC windows count issue day as day one; primary EU rabies dates describe only the 21-day wait and are not a personal readiness decision. Connecting journeys withhold date arithmetic. Unsupported direct AU/NZ origin pathways show a prominent stop before standard preparation instructions.

Sale, adoption and ownership-transfer classifications continue to use the bounded question pathway; an ordinary personal-pet dossier is not a commercial certification engine. Recent history, age, breed, records, exact operating airline and permits remain uncollected or unreviewed. Country coverage does not mean every requirement for 506 ordered corridors has been individually confirmed.

The Ready Pack preview preserves the same entry/departure separation, conditionality, planning dates, claim-level sources and blockers in its Preparation and print representations. Payment, review, uploads, reminders, account access and reviewed fulfillment remain unavailable.

Permanent research index: `docs/research/README.md`. Dated overview and 23 country dossiers record sources, access dates, origin groupings, departure processes, contradictions and remaining gaps. Earlier research is retained as history. Owner approval remains required before these researched instructions are published.


## 17. Journey intent and compact plan — 12 September 2026

This supersedes section 16’s fully expanded display and purpose-selection description. The first form step exposes travel with an owned pet, same-owner relocation, and breeding/new-owner/event journeys. The third choice reveals sale, adoption, transfer, breeding and event subtypes. The form collects a species-specific pet count and, where another person accompanies the animal, owner-travel timing. These facts do not establish eligibility.

Personal travel and relocation retain the dated personal-pet research. Other purposes, more than five pets, or an owner travelling more than five days apart receive an explicitly incomplete purpose-review preparation brief, not an automatic legal “commercial” label. Jurisdiction-specific evidence distinguishes animal-health, customs and licensing definitions. The conservative review boundary may include genuine personal journeys and event exceptions.

Results now use a compact numbered plan, visible actions/timing and expandable bullets/sources. Flights and research sources sit in accessible tabs. Duplicate GB/EU AHC preparation is consolidated without dropping origin evidence; the GB return item is conditional for visits and omitted for relocation. This is an outbound guide, not a completed return assessment.

The Ready Pack uses the same compact preparation component, retains its vet brief and in-memory document tracker, and prints a separate full-detail draft. Counts apply to one species; individual pet records, individual eligibility and mixed-species itineraries are not implemented. Publication approval and all paid-service gates remain unchanged.

New research: docs/research/2026-09-12-journey-purpose.md. Implementation and browser evidence: docs/audits/2026-09-12-journey-purpose-and-compact-plan.md.

## 18. Consultation offer replaces paid packs, 12 September 2026

The user-supplied consultation proposal, followed by the user's explicit pricing/booking decision, supersedes earlier Ready Pack and readiness-check offers. Available information, compact plans, vet briefs, document notes, timing guidance and sources stay free. Publication-review holds are factual-safety gates, not purchase gates, and remain intact.

Pet Travel Consultation costs US$5 for one planned journey. It includes a personal review, one call with no fixed time limit and a written recap with no fixed delivery deadline. It does not imply unlimited additional calls or ongoing journey management. The user explicitly rejected the proposal's enquiry-first flow: the website uses booking details and Stripe authorisation, followed by human suitability review before payment capture. Preferred availability is not a reserved appointment. The team agrees the call time directly.

The original Who We Are hero, introduction, four story paragraphs and sign-off from commit 4808709 are preserved. The PDF's rewritten story is not adopted. Obsolete active-service, 24-hour-refund and secure-upload promises are not reinstated.

The former Ready Pack workspace is now free travel tools. /ready-pack and /services redirect to /consultation. The consultation page, result offer, navigation, payment terms and privacy text reflect the new service. No enquiry draft, artificial approval, account, document intake or automatic scheduling was added.

Consultation booking is enabled in application policy, but runtime Stripe credentials and live readiness remain required. This local environment has neither configured credentials nor an authenticated Stripe connector. Test-mode defaults remain; no public deployment, actual authorisation or capture has been performed. Operator identity, jurisdiction-specific terms, secure records handling and an actual staffed review/scheduling process are launch dependencies. See docs/operations/consultation-service.md.
