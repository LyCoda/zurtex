# PetCleared route flows and the Zurtex Ready Pack

Research date: 11 September 2026. Product research and implementation specification. Regulatory findings are **drafts awaiting owner approval**, not travel clearance.

## Executive assessment

PetCleared's strongest transferable pattern is an answer-led result: a compact itinerary followed by an ordered, expandable preparation sequence. It exposes useful information before asking for payment. The paid offer follows the main checklist rather than interrupting the search. Its premium destination, however, currently states that purchase is unavailable. Marketing and legal descriptions of delivery should not be treated as proof of a functioning paid service.[^1][^6]

Zurtex should adopt this interaction principle, not competitor prose or branded presentation. The appropriate version is a clear free answer followed by an original, context-aware Ready Pack workspace. Zurtex's confirmed US$5 family-itinerary price, human-review requirement and six-month access model remain distinct from PetCleared's intended export-oriented product. Calendar files, reminders and return checklists remain outside Zurtex's launch scope.

The implemented local preview now demonstrates that sequence. Detailed draft answers are limited to direct, personal, owner-accompanied Great Britain → France/Netherlands journeys for one dog or cat. Unsupported journeys retain bounded question guides. Neither branch makes a readiness decision or calculates personal deadlines from a date alone. Production never receives the draft answer payload.

## Evidence scope

The comparison covers the public search, dated and undated results, dog/cat differences, mixed-pet results, return-leg navigation, commercial input, a complex-route loading failure, premium navigation, and the public explanatory/legal pages. Synthetic itineraries were used. No account, purchase, email submission, correction report or paid download was completed.

This is a branch-level study, not a validation of every origin/destination pair in the country selector. Successful UK → Netherlands cases establish the curated result's behavior. Japan requests exposed a loading/error branch, not a usable Japan checklist. Payment fulfillment, cache behavior, reminders and monitoring remain unverified. No accuracy conclusion about PetCleared's entire catalogue follows from this sample.

## 1. Search and transition

The public form collects origin/destination, an optional departure date, dog and cat counts, optional dog breed, a return-trip selection and an optional commercial classification. A country swap control reduces re-entry. The result can be reached anonymously. The undated branch demonstrates that an itinerary can still produce a relative preparation sequence without a calendar date.[^5]

Zurtex differs intentionally. Its minimum request uses intended **arrival**, one species, accompanying-person relationship, movement purpose and transport mode. An airline is optional, and the airline on the booking does not establish the operator of every segment. Those fields protect against treating cargo as synonymous with sale or transfer. This implementation does not add a family pet-count editor or return-date intake; claiming those are supported would exceed the current behavior.

The transition should communicate a bounded task rather than suggest automated approval. Loading means the guide is being prepared. A result heading receives focus when available; errors remain beside the form. Edits preserve the form values but discard the old assessment and package, preventing stale requirements from surviving a changed route.

## 2. Observed branch matrix

| Case | Observed behavior | Zurtex implication |
|---|---|---|
| One dog, dated, one-way | Itinerary summary, difficulty and review date precede five expanded steps with dates, then an upsell and supporting links. | Put the answer and its evidence state before the commercial offer.[^1] |
| One cat, dated, one-way | Core sequence remains; some lower dog-related commentary persists. | Species filtering must cover notes as well as main tasks.[^2] |
| One cat, five-day return | Outbound/Return navigation changes the requirement set; shared items appear covered by the outbound journey. | Reuse shared facts without marking compliance complete automatically.[^3] |
| Two dogs and one cat, return | Shared household instructions plus a clearly dog-specific return item. | A future family model should share itinerary tasks and retain pet-specific exceptions.[^4] |
| One dog, no date | Relative timing remains; calendar dates and premium offer disappear. | Missing dates need not erase general value; urgency must not imply lateness.[^5] |
| One dog, Japan, no date | Loading progresses through claimed source checks, then shows an unavailable result with a refresh suggestion. | Preserve itinerary, explain the failure and provide recovery without invented fallback facts.[^10] |
| Japan, commercial | Commercial classification survives into the result header; requirements also fail to load. | The input branch is observed; its successful commercial answer is not verified.[^11] |
| Premium navigation | The result's paid-pack link leads to a coming-soon page with no functioning checkout. | Separate an interactive preview from a product actually available to buy.[^6] |

## 3. The post-destination answer

A useful answer has three layers. First is the plain-language conclusion: what this kind of journey generally involves. Second is the action sequence, with applicability and timing beside each item. Third is supporting detail: official references, open questions, carrier conditions and exceptions. This information architecture is an inference from the observed cases, not a claim about PetCleared's internal design process.

Zurtex's local corridor preview uses five original decision units: identification/record alignment, rabies validity, the direct-GB blood-test pathway, official-vet certification, and border checks. Each has a concise answer, a relative timing label, explanatory detail and direct official links. Reading is explicitly distinct from meeting a requirement.

The headline should answer a user's implicit question—what will I need to arrange?—without jumping to “you can travel.” A status of “more information needed” is compatible with a helpful answer. The currently illustrated pathway remains conditional because the form does not establish residence, historical movements, vaccination chronology or breed classification.

PetCleared's result dates and “covered outbound” labels reveal two hazards worth avoiding. A first-vaccination deadline is not evidence that an already-vaccinated pet is overdue. Shared outbound paperwork is not evidence of completion or continued validity on return. Zurtex therefore does not infer either conclusion from itinerary dates or navigation state.[^1][^3]

## 4. Premium: stated offer versus working service

| Dimension | Public evidence | Confidence |
|---|---|---|
| Price | Dated result markets a one-off £4.99 trip product. | Directly observed.[^1] |
| Paid contents | PDF and calendar output are described; the result also advertises rule-change watching. | Stated offer, not verified delivery.[^6] |
| Purchase | Premium page says the product is not ready to buy. | Directly observed.[^6] |
| Commerce terms | July terms describe Paddle, digital delivery and a fourteen-day refund policy. | Documented intention; not a successful transaction.[^7] |
| Personal data | Privacy describes account-free use and purchase-related email/notification handling. | Policy claim; not a tested backend.[^8] |
| Subscription | FAQ discusses a planned annual tier. | No working annual product observed.[^9] |

The contradictions matter more than a speculative conversion analysis. The result, FAQ, terms and availability page must describe the same state. A payment-provider name in terms does not demonstrate checkout, tax handling or delivery. No refund, email or notification workflow was tested.

PetCleared's terms also reserve its content and checklists against competitor copying. Zurtex's implementation consequently uses independently sourced facts and original writing. The comparison does not supply an extracted competitor content library.[^7]

## 5. Zurtex's own package boundary

The canonical commercial product remains a US$5 introductory, human-reviewed PDF for one family itinerary. It is intended to include a reverse timeline, a dated calendar section inside the PDF, vet brief, document tracker, form links, airline/transit checklists and a source snapshot. Planned private access lasts six months; minor corrections are included, while material route changes require a new pack. Pricing after launch, tax treatment and a complete fulfillment/refund policy remain unresolved in PRODUCT.md and ZURTEX_DECISIONS.md.

The **implemented preview** is deliberately narrower: Preparation, Vet brief, Documents and Sources sections, connected directly to the free result. It preserves route context and document-preparation selections while switching sections or returning to the guide. A print action provides a working-draft layout containing all four sections, scope assumptions, outstanding questions and sources—not merely the currently visible tab.

No authentication, persistent storage, document upload, payment, review booking, reviewer assignment or reviewed-file delivery is implied. Document choices describe the user's preparation state, never a validation outcome. Refreshing, navigating away or editing the route clears the in-memory workspace. No itinerary is added to a URL. This avoids inheriting the competitor's share-link privacy tradeoff.

The free preview is not a covert launch of premium. The unavailable purchase control is visible with the planned price and family-itinerary unit. The preview's one-pet intake does not yet fulfill that future family model. Human review is an operational prerequisite, not a badge to decorate an automated document.

## 6. Independent regulatory cross-check

The checked corridor is Great Britain—England, Scotland and Wales—to mainland France or the Netherlands, personal travel with no ownership change. Northern Ireland, non-owner accompaniment, relocation-specific obligations, unusual transit, breed restrictions and airline acceptance are not silently absorbed into that pathway.

Current official guidance supports checking identification before the qualifying rabies vaccination; the pet must be at least twelve weeks old when vaccinated. A primary course has a minimum waiting period, while an uninterrupted booster differs from a lapsed course. A vaccine-specific valid-from date should drive any future calculation, not an unconditional “vaccination plus 21” formula.[^12]

GOV.UK explicitly counts the AHC issue date as day one of the ten-day EU-entry period: its example permits a certificate issued on 1 November through 10 November. The certificate must be issued after rabies protection becomes valid. These are separate clocks.[^13]

The direct GB pathway benefits from the EU's listed-country blood-test exemption. Earlier movements or a changed transit route require a fresh applicability review; the exemption is not a global statement about the pet.[^14]

The April 2026 rule change is particularly important. Current guidance describes six months for onward EU travel and GB return, rather than the older four-month formulation. Rabies expiry can shorten validity. EU onward validity is anchored to entry checks; GB return validity uses the AHC issue date. Old certificate templates may be issued through 30 September 2026, with new templates required from 1 October. Transition provisions do not override normal entry-window limits.[^15][^16][^17]

Passport exceptions need separate review: current GB/EU guidance restricts outbound use by GB residents, while national pages contain broader or older wording. France also has dog-category rules, and the Dutch guidance requires attention to local customs handling. A source conflict belongs in an approval queue, not in an AI-generated assurance.[^15][^18][^19]

Return travel was researched but not added to the launch UI. Dogs returning from France or the Netherlands to GB generally need the applicable veterinary tapeworm treatment in the 24–120-hour pre-entry window; cats do not inherit that dog-only requirement. Calculation requires an arrival timestamp and time-zone-aware elapsed hours. Entry to GB by ordinary commercial air transport has its own cargo/approved-route rules; outbound cabin selection cannot establish return acceptance.[^20][^21]

## 7. Architecture and publication controls

The researched answer is a separate typed object with a version, research date, assumptions, linked requirements and unresolved facts. Its publication state is draft and its approver remains null. The assessment endpoint adds it only when the server environment is explicitly development. The ordinary evaluator never returns it. Browser parameters cannot turn it on.

Production continues to return the safe source-backed question guide. This is a local editorial demonstration, not a replacement for the canonical rule contract. Before publication, each material claim still needs scoped applicability, effective dates, conflict resolution, approval history and owner sign-off. Research freshness and publication approval must remain separate fields.

The package workspace consumes the returned assessment; it does not refetch competitor data or call an AI to improvise missing rules. It has no checkout or order side effects. Changing a journey produces a new assessment key and removes incompatible package state. The print layout exposes the unreviewed status and outstanding facts; it must never be marketed as the reviewed PDF promised by the future paid product.

## 8. Acceptance and remaining work

Implemented checks cover development-only exposure, production fail-closed behavior, corridor boundaries, dog/cat filtering, source-link integrity, unknown-history timing restraint, disabled commerce and the existing route parser. Browser checks cover the actual staged form, result focus, section switching, document selections, context-preserving return and desktop/mobile overflow.

Remaining release work is substantive, not cosmetic:

1. Obtain owner review of the first corridor's rule records, including the 2026 transition and passport conflicts.
2. Add the facts needed for real applicability and date calculations; verify chronology, expiry, leap-day and time-zone boundaries.
3. Model a family itinerary with shared tasks and per-pet exceptions before selling a family pack.
4. Build reviewer operations, secure private access and actual PDF fulfillment; test print/PDF pagination in a supported output environment.
5. Resolve operator, tax, terms, refunds, privacy and retention choices before enabling commerce.
6. Expand coverage one reviewed corridor at a time; keep held routes explicit.

The research therefore supports the new flow, not a claim that “every PetCleared route has been copied” or that Zurtex's paid service is complete. The usable deliverable is an original local preview with honest coverage and a clear approval path.

## Sources

All public pages below were consulted on 11 September 2026. Observation labels distinguish functioning browser behavior from page claims. Travel guidance can change after this date.

[^1]: PetCleared, [dated dog result: UK → Netherlands](https://petcleared.com/results?origin=United+Kingdom&destination=Netherlands&petType=dog&dogs=1&cats=0&returnTrip=false&departureDate=2026-09-25). Observed public result.
[^2]: PetCleared, [dated cat result](https://petcleared.com/results?origin=United+Kingdom&destination=Netherlands&petType=cat&dogs=0&cats=1&returnTrip=false&departureDate=2026-09-25). Observed public result.
[^3]: PetCleared, [cat return leg](https://petcleared.com/results?origin=United+Kingdom&destination=Netherlands&petType=cat&dogs=0&cats=1&returnTrip=true&stayDays=5&departureDate=2026-09-25&leg=return). Observed public result.
[^4]: PetCleared, [mixed-pet return leg](https://petcleared.com/results?origin=United+Kingdom&destination=Netherlands&petType=dog-and-cat&dogs=2&cats=1&returnTrip=true&stayDays=5&departureDate=2026-09-25&leg=return). Observed public result.
[^5]: PetCleared, [undated dog result](https://petcleared.com/results?origin=United+Kingdom&destination=Netherlands&petType=dog&dogs=1&cats=0&returnTrip=false), and [search](https://petcleared.com/). Observed public controls.
[^6]: PetCleared, [Trip Pack](https://petcleared.com/trip-pack). Browser-verified availability and stated future contents; no purchase completed.
[^7]: PetCleared, [Terms](https://petcleared.com/terms). Public legal claims, not verified commerce operations.
[^8]: PetCleared, [Privacy](https://petcleared.com/privacy). Public policy claims.
[^9]: PetCleared, [FAQ](https://petcleared.com/faq) and [Methodology](https://petcleared.com/methodology). Public product/method claims; the methodology excludes airline and transit coverage and describes cached/generated results, which were not independently validated.
[^10]: PetCleared, [UK → Japan, personal](https://petcleared.com/results?origin=United+Kingdom&destination=Japan&petType=dog&dogs=1&cats=0&returnTrip=false). Observed loading followed by unavailable result.
[^11]: PetCleared, [UK → Japan, commercial](https://petcleared.com/results?origin=United+Kingdom&destination=Japan&petType=dog&dogs=1&cats=0&returnTrip=false&commercial=true). Commercial header and unavailable result observed.
[^12]: GOV.UK, [Rabies vaccinations and boosters](https://www.gov.uk/taking-your-pet-abroad/rabies-vaccinations-and-boosters).
[^13]: GOV.UK, [Getting an animal health certificate](https://www.gov.uk/taking-your-pet-abroad/getting-an-animal-health-certificate).
[^14]: European Commission, [Listed territories and non-EU countries](https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/listing-territories-and-non-eu-countries_en).
[^15]: DEFRA/APHA, [New EU rules for pet travel for GB residents](https://www.gov.uk/government/news/new-eu-rules-for-pet-travel-for-gb-residents), published 21 April 2026.
[^16]: European Commission, [Bringing a pet into the EU](https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/bringing-pet-eu-non-eu-country_en).
[^17]: [Commission Implementing Regulation (EU) 2026/705](https://eur-lex.europa.eu/eli/reg_impl/2026/705/oj/eng), Articles 6–8, and APHA, [pet travel checks by transport carriers](https://www.gov.uk/government/publications/pet-travel-checks-on-pets-by-transport-carriers/pet-travel-checks-on-pets-by-transport-carriers).
[^18]: French Customs, [UK pet-travel formalities](https://www.douane.gouv.fr/fiche/royaume-uni-voyageurs-quels-criteres-et-formalites-pour-voyager-avec-votre-animal-de), updated 31 July 2026.
[^19]: NVWA, [Taking pets to and from the UK](https://english.nvwa.nl/topics/animal-health/brexit/taking-pets-to-and-from-the-united-kingdom-after-brexit). Date not displayed; potentially stale passport/count sections noted.
[^20]: GOV.UK, [Tapeworm treatment for dogs entering GB](https://www.gov.uk/bring-pet-to-great-britain/tapeworm-treatment-dogs).
[^21]: GOV.UK, [Travel routes for pets entering GB](https://www.gov.uk/bring-pet-to-great-britain/travel-routes-pets).
