# Zurtex 2.0 — Product Decisions

**Document status:** Controlling product decision record

**Decision owner:** Zurtex owner/operator

**Last updated:** 11 September 2026

**Applies to:** The `LyCoda/zurtex` redesign, private beta, Route Guide, Ready Pack, route engine, airline evaluator, payments, content governance, analytics, and future implementation documents.

---

## 1. Purpose and precedence

This file records the product owner's confirmed choices for Zurtex 2.0. It is the primary internal source of truth for business and product decisions.

When another project document conflicts with this file, use this order:

1. Current official government and operating-airline evidence for factual travel requirements.
2. This `ZURTEX_DECISIONS.md` file for product and business choices.
3. `instructions.md` for working rules and implementation safeguards.
4. Approved technical, content, and design specifications.
5. Earlier executive summaries, research blueprints, and implementation prompts.
6. Existing repository behaviour.
7. Competitor inspiration or model assumptions.

Earlier research remains useful evidence, but it must not override the decisions below.

### Status labels

- **CONFIRMED** — approved product requirement.
- **PROVISIONAL** — accepted working default that may remain behind a feature flag.
- **DEFERRED** — deliberately excluded from the first release.
- **BLOCKED** — must not be activated until an operational, legal, technical, or evidential dependency is resolved.
- **OPEN** — still requires an owner decision.

---

# 2. Executive product decision

## 2.1 Positioning — CONFIRMED

Zurtex will primarily be described as:

> **A pet-travel planning and preparation service.**

Zurtex helps travellers understand the currently available requirements for moving a dog or cat internationally and offers a paid, human-reviewed preparation pack that organises those requirements into a practical plan.

The core proposition is:

> **See the key requirements before you pay. Purchase a Ready Pack when you want a detailed, human-reviewed plan organised around your journey.**

Zurtex is not a government authority, veterinary practice, law firm, airline, customs broker, pet-relocation company, or issuer of permits or health certificates.

## 2.2 Target customers — CONFIRMED

The initial target audience includes:

- Pet owners relocating internationally.
- International students and expatriates.
- Families moving countries.
- Frequent travellers with pets.
- People transporting pets in connection with adoption, sale, or transfer.

Adoption, sale, and ownership-transfer journeys are target customer needs, but they are not automatically eligible for the standard personal-travel Ready Pack. They must be classified separately and may require paid human review, specialist referral, or an unsupported-route result.

## 2.3 Supported traveller relationship — CONFIRMED

The core journey model supports cases where:

- The owner travels with the pet; or
- A family member or authorised person travels with the pet.

The engine must still apply any destination-specific timing and ownership rules. The interface must not imply that every authorised-person arrangement is legally non-commercial.

## 2.4 Additional revenue — CONFIRMED

In addition to the Ready Pack, Zurtex may offer:

- A separate paid human-review service for complex, ambiguous, commercial, adoption, sale, transfer, cargo, quarantine, or otherwise unsupported journeys.

This service may only be offered when a real reviewer is available and the service scope, price, response time, and deliverable are disclosed accurately.

---

# 3. Private-beta and demand-validation mode

## 3.1 Initial launch mode — CONFIRMED

The first launch is a **private beta and demand test**.

The existing public website should remain live while the redesign is developed and tested on a feature branch and preview environment.

Zurtex should collect a Ready Pack waiting list before the operational paid service is fully available.

## 3.2 Human-review readiness conflict — BLOCKED

The intended end-state is that every paid Ready Pack receives human review before delivery. However, the owner does not currently intend to perform live manual reviews during the initial demand-validation phase.

Therefore:

- Do not capture payment for a Ready Pack that will not actually be reviewed and delivered.
- Do not promise a 24–48-hour reviewed deliverable until review operations are active.
- Do not enable document uploads unless an accepted case has a real reviewer and defined operational purpose.
- Do not label ordinary routes as requiring manual review merely to increase conversion.
- Do not describe the private beta as a functioning human-review service when it is only measuring interest.

### Allowed validation experience

During demand validation, Zurtex may:

- Show the free Route Guide.
- Preview the Ready Pack.
- Collect a waitlist or early-access request.
- Measure clicks on the Ready Pack purchase or reservation action.
- Use a clearly disclosed, temporary refundable card authorisation only if no funds are captured, the hold is automatically released, and the customer is told that the action is an availability or interest reservation rather than an accepted service order.

### Operational activation gate

Paid Ready Pack delivery may be enabled only after all of the following exist:

1. A real reviewer accepts responsibility for every paid case.
2. The review process and quality checklist are documented.
3. Secure intake and deletion procedures are working.
4. The payment and refund flow is tested.
5. The 24–48-hour service promise is operationally achievable.
6. Customer-facing copy accurately describes what is delivered.

---

# 4. Free Route Guide

## 4.1 Free-result depth — CONFIRMED

The free result should provide substantial, useful information without providing the full paid timeline and action plan.

The free Route Guide should show, where supported and relevant:

- Microchip requirements.
- Rabies-vaccination requirements.
- Rabies-antibody titre requirements.
- Required waiting periods.
- Import permits.
- Veterinary health certificates.
- Government endorsement.
- Parasite treatment.
- Quarantine.
- Permitted entry airports or ports.
- Breed restrictions.
- Minimum pet age.
- Maximum number of pets.
- Airline compatibility or unassessed status.
- Transit-country warnings.
- Approximate preparation time.
- Estimated earliest feasible arrival date where determinable.
- Return-journey warning.
- Official source links.
- The source authority and effective date.

The free result must not include the full personalised reverse timeline, full calendar of dated actions, detailed step-by-step execution plan, or downloadable PDF. Those are part of the Ready Pack.

## 4.2 Earliest date and lead-time caveat — CONFIRMED

The free result should display approximate preparation time and an estimated earliest feasible arrival date only when the supplied information and approved rules support a defensible calculation.

Because the free questionnaire deliberately omits detailed microchip, vaccination, titre, and document dates, Zurtex must not fabricate a precise date. Where the date cannot be calculated, the result should say **More information needed** and explain that an exact route timeline requires additional facts in the Ready Pack intake.

## 4.3 Email and saving — CONFIRMED

- No email is required before viewing the free result.
- Email is requested when a customer purchases or requests the Ready Pack.
- A free result is not persistently saved at launch unless the user supplies an email as part of the Ready Pack or early-access process.
- No customer account is required.
- Saved results use private, opaque email links and must be `noindex`.

## 4.4 Free PDF — CONFIRMED

The free result is web-only. The downloadable PDF is part of the Ready Pack.

## 4.5 Public SEO corridor pages — DEFERRED

Zurtex will not launch public origin-to-destination SEO pages initially.

The initial focus is the route-search experience, private result, Ready Pack preview, methodology, country/airline evidence where useful, and private-beta validation. Public corridor pages can be reconsidered after product demand and content-maintenance capacity are established.

---

# 5. Free route-search questionnaire

## 5.1 Interaction model — CONFIRMED

The first route search must be deliberately short and low-friction.

Do not require a long dynamic questionnaire before showing the basic result. Display the free summary after the minimum route facts are supplied. The detailed route, medical-history, document, and timeline intake occurs only for a Ready Pack or genuinely necessary human review.

## 5.2 Required first-search fields — CONFIRMED

Ask for:

- Origin country or grouped jurisdiction.
- Destination country or grouped jurisdiction.
- Intended arrival date.
- Dog or cat.
- Whether the owner, family member, or authorised person travels with the pet.
- Movement purpose: personal travel, relocation, sale, adoption, or transfer.
- Intended travel mode: cabin, checked/accompanied hold, or cargo.

## 5.3 Optional first-search fields — CONFIRMED

- Marketing airline.
- Operating airline for each known segment.
- Transit country, but only when the customer indicates that the itinerary has a transit.

A customer may search without knowing the airline. In that case, Zurtex shows government information and marks the airline assessment as **Not yet assessed**.

If the customer provides an airline, operating-carrier information controls the assessment. The marketing carrier alone is insufficient for a complete result.

## 5.4 Fields not required for the free search — CONFIRMED

Do not require the following before the basic free result:

- Intended departure date.
- Return date.
- Pet age or date of birth.
- Breed.
- Weight.
- Microchip status or implantation date.
- Rabies-vaccination date.
- Microchip-before-rabies sequencing.
- Rabies titre date or result.
- Countries visited during the previous six months.
- Number of pets.
- Days between owner and pet travel.
- Transit airport.
- Existing permits or health certificates.

These facts may be collected later in the paid intake when they are needed for the detailed plan.

## 5.5 Connecting itineraries — CONFIRMED

Detailed connecting-flight and transit-airport assessment is part of the Ready Pack, not the initial free result.

The free result may:

- Ask whether a transit exists.
- Record a transit country if known.
- Display a clear warning that transit and airport-specific eligibility have not been fully assessed.

It must not present the journey as complete or feasible without that limitation.

---

# 6. Result presentation

## 6.1 Primary result states — CONFIRMED

Use three primary customer-facing states:

1. **More information needed**
2. **Actions required**
3. **Plan looks feasible**

The supporting copy, requirement list, uncertainty markers, and complexity rating can explain permit, quarantine, airline, commercial, specialist, or unsupported conditions without creating a confusing number of top-level statuses.

## 6.2 Complexity rating — CONFIRMED

Show a non-numeric preparation-complexity label, such as:

- Straightforward.
- Moderate preparation.
- Complex.
- Specialist route.

The rating describes preparation complexity, not legal approval, likelihood of acceptance, or probability of success.

## 6.3 Timing — CONFIRMED

Show:

- Approximate preparation duration.
- Earliest feasible arrival date where supportable.
- A clear explanation when more information is required for a precise calculation.

## 6.4 Uncertainty and verification — CONFIRMED

Use a combination of:

- Per-requirement verification or confidence status; and
- Prominent warnings wherever a rule is incomplete, route-dependent, held, or awaiting human confirmation.

Do not use one generic disclaimer as a substitute for item-level uncertainty.

---

# 7. Zurtex Ready Pack

## 7.1 Product model — CONFIRMED

Zurtex will offer one simple paid Ready Pack to minimise purchase friction.

Customer-facing proposition:

> **One one-time purchase for an organised, human-reviewed preparation plan for the family itinerary you submit.**

Do not create multiple Ready Pack tiers at launch.

## 7.2 Included deliverables — CONFIRMED

The Ready Pack includes:

- Personalised route summary.
- Step-by-step action plan.
- Reverse timeline from the intended arrival date.
- Calendar deadlines presented inside the PDF.
- Printable checklist.
- Veterinary appointment brief.
- List of vaccinations and treatments to discuss with the veterinarian.
- Document tracker.
- Permit instructions.
- Government form links.
- Airline booking checklist.
- Carrier or crate checklist.
- Transit checklist.
- Official source list.
- Saved snapshot of the rule versions and sources used.
- Human review before final delivery.

## 7.3 Excluded at launch — DEFERRED

The first Ready Pack does not include:

- Arrival-day checklist.
- Return-journey checklist.
- Rule-change alerts.
- Email reminders.
- Google Calendar or Apple Calendar files.
- A customer document vault as a marketed feature.
- Automated document-completeness checks.
- Automated extraction or validation of veterinary records.

A secure upload link may be used operationally for an accepted human-review case, but it is not a standalone customer feature and must remain disabled during demand validation when no reviewer is processing documents.

## 7.4 Review and delivery — CONFIRMED END-STATE / BLOCKED IN VALIDATION

- Every paid Ready Pack is human-reviewed before delivery.
- Delivery format is a downloadable PDF.
- The service target is delivery within 24–48 hours after case acceptance and receipt of complete required information.

This promise is blocked until the private-beta review operation is genuinely staffed.

## 7.5 Purchase coverage — CONFIRMED

One Ready Pack purchase covers all pets travelling on one family itinerary, subject to legal pet-count limits and the submitted route remaining within scope.

## 7.6 Access period — CONFIRMED

A Ready Pack remains active for six months.

## 7.7 Journey updates — CONFIRMED

- Minor corrections or updates are included.
- A material route change requires a new Ready Pack purchase.

Examples of material changes include a different origin, destination, travel purpose, operating airline, transit routing, substantially different arrival date, or a change that selects a different legal pathway.

The exact boundary between minor and major changes should be documented in the refund and amendment policy before operational launch.

## 7.8 Rule-change monitoring — DEFERRED

Rule-change alerts and ongoing monitoring are not included at launch.

The rule snapshot preserves what the pack used, but it is not a guarantee that the customer will receive future updates.

---

# 8. Pricing, reservation, payment, and refunds

## 8.1 Ready Pack price — CONFIRMED

- Launch price: **US$5**.
- Currency: **USD only**.
- Positioning: launch discount / introductory price.
- Pricing: one price for all supported routes at launch.

Tax treatment remains open and must not be invented in customer copy.

## 8.2 Legacy US$7 authorisation — PROVISIONAL

The current US$7 card authorisation may be repurposed as a refundable availability reservation during private-beta validation.

Requirements:

- The US$7 authorisation is not the US$5 product price.
- It must be described as a temporary, refundable authorisation or reservation.
- No funds are captured during demand validation.
- The hold is released when the reservation is not accepted or no service is delivered.
- The interface must state that a reservation is not case acceptance and does not guarantee delivery.
- Technical and payment-provider feasibility must be validated before launch.

A simpler waitlist without a card hold remains the preferred fallback if the reservation creates confusion or legal/operational risk.

## 8.3 Capture timing — CONFIRMED END-STATE

Payment is captured only after both conditions are satisfied:

1. A human has accepted the case; and
2. The Ready Pack has been successfully generated.

Do not capture funds merely because the customer submits an enquiry or temporary reservation.

## 8.4 Refunds — PARTIALLY CONFIRMED

Confirmed:

- The customer receives a full release/refund if Zurtex cannot generate the promised Ready Pack.

Still open:

- Customer input errors.
- Customer cancellation.
- Route or airline changes after purchase.
- Government-rule changes after delivery.
- Airline refusal after delivery.
- Refund eligibility after the PDF has been delivered.
- Withdrawal/cancellation rights and applicable regional requirements.

No final refund page should be published until these points are resolved and reviewed.

---

# 9. Human support and difficult routes

## 9.1 Review model — CONFIRMED END-STATE

The owner intends to review all paid packs personally when the operational service launches.

## 9.2 Support channel and target — CONFIRMED END-STATE

- Support channel: email.
- Response target: within 24–48 hours.

Do not present the target as active during demand validation unless the owner is actually monitoring and responding within that window.

## 9.3 Difficult-route handling — CONFIRMED

When a journey is complex or outside the standard Ready Pack pathway:

1. Show verified general information and official starting points where available.
2. Explain why the route cannot be fully assessed automatically.
3. Offer a separate paid human review only when that service is operational and the case is eligible.
4. Otherwise mark the route unsupported and recommend contacting the relevant authority or specialist.

## 9.4 Partners — CONFIRMED CURRENT STATE

Zurtex currently has no formal veterinarian, relocation, quarantine, airline, insurance, or other professional partners.

Do not imply endorsements, accreditation, partnerships, or referral arrangements that do not exist.

---

# 10. Geographic coverage

## 10.1 Coverage ambition — CONFIRMED

Zurtex aims to display all 23 currently researched markets when their information is verified.

If some markets or route layers are incomplete, they may remain visible with a transparent **limited coverage**, **more information needed**, **human review required**, or **unsupported** label.

The constraint is evidence and operational readiness, not computation alone.

## 10.2 Market priority — CONFIRMED

No smaller geographic priority list is currently selected. All already-verified countries are equal candidates for initial coverage.

## 10.3 Brand geography — CONFIRMED

Zurtex should appear globally neutral rather than Hong Kong- or Asia-first.

## 10.4 Regional subdivisions — CONFIRMED UI SIMPLIFICATION WITH SAFEGUARD

The first selector should avoid unnecessary regional complexity. A grouped country choice may be used for simplicity.

However, where the law materially differs—for example Great Britain versus Northern Ireland, Peninsular Malaysia versus Sabah/Sarawak, or mainland United States versus Hawaii/Guam—the engine must request the relevant subdivision before presenting a definitive result.

Do not silently treat legally different territories as identical. Use **More information needed** until the distinction is known.

---

# 11. Airline decisions

## 11.1 Airline input — CONFIRMED

Airline selection is optional for the initial free result.

If no airline is supplied, show:

> **Airline compatibility not yet assessed.**

## 11.2 Unsupported airlines — CONFIRMED

Include an **Other airline** option. Show limited analysis and request operating-carrier details rather than inventing eligibility.

## 11.3 Fees — DEFERRED

Do not display airline pet fees at launch.

## 11.4 Recommendations — CONFIRMED

Zurtex should assess the selected itinerary but should not recommend one airline over another at launch.

## 11.5 Codeshares — CONFIRMED

Support codeshare detection. The operating carrier for each segment controls the airline assessment.

Detailed multi-segment and transit assessment belongs to the Ready Pack.

---

# 12. Accounts, private links, documents, and retention

## 12.1 Accounts — CONFIRMED

No customer account is required at launch.

Saved journeys and paid-pack access use private links delivered by email.

## 12.2 Document uploads — LIMITED / BLOCKED DURING VALIDATION

- Document uploads are available only to accepted paid customers.
- Uploads occur through a secure website link sent by email.
- Documents are reviewed by a person only.
- Automated document analysis is deferred.
- Uploads must remain disabled while no reviewer is actively providing the service.

## 12.3 Retention — CONFIRMED PRINCIPLE / IMPLEMENTATION WINDOW OPEN

Journey data and uploaded documents should be deleted after the journey has passed.

The exact automated deletion timing, grace period, accounting exceptions, backups, and audit-log treatment remain open and must be specified before collecting real documents.

## 12.4 Customer deletion — CONFIRMED FOR LAUNCH

A self-service delete button is not required at launch.

Customers must still be given an email route to request deletion or correction. Implementation must comply with applicable privacy obligations in the regions served.

## 12.5 Customer regions — CONFIRMED

Zurtex is intended for worldwide customers.

Privacy, terms, payment, and retention policies therefore require professional review before broad public operation.

---

# 13. Regulatory content governance

## 13.1 Approver — CONFIRMED

The owner personally approves regulatory updates.

AI and automated monitoring may assist with discovery and comparison, but they may not publish changes automatically.

## 13.2 Recheck cadence — CONFIRMED

- Ordinary rules: recheck every three months.
- High-risk and date-sensitive rules: monitor automatically, then require manual approval before publication.

A more frequent internal review cadence may be applied where a source announces a transition or effective date.

## 13.3 Public evidence fields — CONFIRMED

Each result should visibly show:

- Official authority.
- Official source link.
- Effective date.
- Whether the rule was manually verified.
- Whether the rule may be incomplete.
- Relevant change history.

The exact **date checked** should be stored internally for governance and audit, but it does not need to appear on the main customer-facing result at launch.

## 13.4 Rule snapshot — CONFIRMED

Every Ready Pack preserves a snapshot of the source and rule versions used to create it.

## 13.5 Source conflicts — CONFIRMED

When official sources conflict or an interpretation could materially affect travel:

- Do not silently choose the more convenient answer.
- Escalate the route or requirement to human review.
- Hold the affected claim from confirmed automatic publication until resolved.
- Show the customer the limitation and relevant authority.

---

# 14. Brand and design

## 14.1 Brand qualities — CONFIRMED

Zurtex should feel:

- Trustworthy.
- Premium.
- Efficient.
- Friendly.
- International.
- Transparent.

## 14.2 Tone levels — CONFIRMED

- Playfulness: approximately **6.5/10**.
- Premium character: approximately **6.5/10**.

The result should feel warm and memorable without becoming childish, whimsical, or less credible than the subject matter requires.

## 14.3 Visual direction — CONFIRMED

Use:

- Real pet-and-traveller photography.
- Route-map and airport-display elements.
- A mostly clean interface with minimal decorative imagery.

## 14.4 Identity scope — CONFIRMED

The project may undertake a complete redesign, including new logo direction.

The existing identity does not need to be preserved, but the redesign must retain product clarity, accessibility, factual trust, and implementation practicality.

## 14.5 Interaction inspiration — CONFIRMED

Retain the useful principle of a concise selection interface that gathers only the minimum information needed and displays the result clearly.

PetCleared may inspire the selection and information-display experience, but Zurtex must not copy its design or use it as regulatory authority.

## 14.6 Avoid — CONFIRMED

Avoid:

- Generic SaaS dashboards.
- Excessive gradients.
- Corporate government-portal styling.
- Too many cards or nested cards.

---

# 15. Analytics and launch operations

## 15.1 Analytics events — CONFIRMED

Track privacy-safe events for:

- Route searches started.
- Route searches completed.
- Most searched corridors.
- Unsupported routes.
- Airline conflicts.
- Email capture.
- Ready Pack preview views.
- Purchases or accepted paid orders when enabled.
- Checkout abandonment.
- Repeat visits.
- Customer-support enquiries.
- PDF downloads.

Do not track official-source-link clicks at launch.

Analytics must not contain names, microchip numbers, vaccination details, uploaded-document content, or sensitive itinerary information.

## 15.2 Timing — CONFIRMED

There is no fixed public launch deadline. Reliability, truthful positioning, verified content, and operational readiness take priority.

## 15.3 Coverage versus conversion — CONFIRMED WITH SAFEGUARD

Zurtex may display all researched markets and route users to human review where the route genuinely requires it.

It must not manufacture a **manual review required** outcome solely to make the premium offer appear necessary. Conversion should come from the value of the detailed, reviewed timeline and preparation pack, not from withholding information or creating artificial uncertainty.

---

# 16. Legal identity and responsibility boundary

## 16.1 Operator — PARTIALLY CONFIRMED

Zurtex is currently operated by an individual.

Still required before public paid operation:

- Legal operator name.
- Country or jurisdiction of operation/registration.
- Service address or legally appropriate business contact details.
- Tax position.
- Customer-support identity.

## 16.2 Required disclaimers — CONFIRMED

Zurtex must state clearly that it is not:

- A government authority.
- A veterinary practice.
- A law firm.
- An airline.
- A customs broker.
- A pet-relocation company.
- An issuer of health certificates or permits.

## 16.3 Approved customer-facing boundary copy — CONFIRMED

Use wording substantially similar to:

> **Zurtex organises the information currently available from official sources around the journey details you provide. It is a planning aid, not an official decision or guarantee, and some requirements may depend on facts not yet supplied or may change before travel. When the human-reviewed Ready Pack service is available, it can provide a more detailed route-specific preparation plan. Final confirmation remains with the relevant authorities, your veterinarian, and each operating carrier.**

During demand validation, replace any active purchase language with **Join the private beta**, **Request early access**, or another truthful availability statement.

---

# 17. Resolved ambiguities and safe interpretations

The following interpretations reconcile answers that would otherwise conflict:

1. **Free information versus paid timeline:** The free result includes all major requirement categories, approximate lead time, and an earliest date only where defensible. The exact reverse timeline and detailed action plan are paid.
2. **Email only at purchase versus saved results:** The free result is shown without email and is session-only. Persistent saving begins when the customer provides email for the Ready Pack or private-beta request.
3. **Optional airline versus operating-carrier requirement:** Airline is optional for the free government result. When airline analysis is requested, the operating carrier for every known segment is required.
4. **Transit country in the free form versus paid transit support:** The free form may record that transit exists and its country, but full transit/airport analysis is paid.
5. **Grouped country selector versus legally different territories:** The first selector may be simple, but a legally material subdivision must be collected before a definitive result.
6. **Document uploads excluded from the pack versus paid-customer upload:** Upload is an operational intake mechanism for accepted human-review cases, not a marketed document-vault feature.
7. **Human-reviewed product versus demand test:** The human-reviewed Ready Pack is the intended product, but it must remain waitlist/reservation-only until real review delivery exists.
8. **All countries versus verified publication:** All 23 markets may be visible, but only verified claims may be shown as confirmed. Others receive transparent limited-coverage states.

---

# 18. Remaining open decisions and blockers

| Area | Status | Required decision or evidence |
|---|---|---|
| Human-review operation | BLOCKED | Confirm who will review real cases, working hours, quality process, and capacity. |
| Paid private beta activation | BLOCKED | Do not capture payment until review and delivery are operational. |
| Legal operator details | OPEN | Legal name, jurisdiction, address/contact information. |
| Tax treatment | OPEN | Whether the US$5 price includes applicable taxes and how taxes are handled. |
| Full refund policy | OPEN | Resolve cancellations, customer errors, changes, post-delivery refunds, and rule changes. |
| US$7 reservation mechanics | PROVISIONAL | Validate whether the temporary hold is technically, legally, and commercially appropriate. |
| Post-launch price | OPEN | Decide the standard price after the US$5 launch discount. |
| Minor versus material update | OPEN | Publish a precise amendment definition. |
| Retention deletion window | OPEN | Define deletion timing after travel, backups, and audit logs. |
| Secure upload provider | BLOCKED | Select and test secure storage, access control, expiry, and deletion. |
| Adoption/sale review scope | OPEN | Decide which transfer cases Zurtex will accept versus refer or mark unsupported. |
| Privacy and legal review | BLOCKED | Review terms, privacy, payment, refund, and worldwide service implications before broad launch. |
| Operational support promise | BLOCKED | Activate 24–48-hour language only when monitored and achievable. |
| Production route coverage | BLOCKED BY EVIDENCE | Publish exact routes only after all material import, export, transit, and airline layers are verified. |

---

# 19. Non-negotiable product rules

1. Show meaningful route information before payment.
2. Do not hide basic requirements solely to force purchase.
3. Do not invent regulatory or airline rules.
4. Do not describe Zurtex guidance as ground truth, clearance, certification, or a guarantee.
5. Keep government eligibility and airline carriage separate.
6. Treat cargo mode and commercial purpose as separate facts.
7. Use operating carriers for airline assessment.
8. Do not show false precision when the minimal free input cannot support an exact date.
9. Do not offer or charge for human review unless a human performs it.
10. Do not collect documents without a defined reviewer, purpose, security process, and deletion process.
11. Do not create artificial manual-review outcomes as a conversion tactic.
12. Keep the existing site live until the private-beta replacement passes preview and release checks.
