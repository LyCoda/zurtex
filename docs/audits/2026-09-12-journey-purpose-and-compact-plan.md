# Journey purpose and compact plan — 12 September 2026

## Outcome

Implemented and checked in the local preview. The first step now distinguishes travelling with a pet, moving home with the same pet, and breeding or a new owner. The latter reveals specific sale, adoption, transfer, breeding and event choices. Pet count and the owner's travel timing are carried into the result and vet brief.

Personal plans use a compact numbered list with expandable details. Flights and sources have their own tabs. The Ready Pack uses the same concise requirements, while its print content keeps the practical details expanded. This is a refinement of Zurtex's existing identity, not a new visual system.

No public deployment, payment activation, persistent storage or human-review service was introduced. Ready Pack remains a free, in-memory preview.

## Research and scope

See the [journey-purpose research](../research/2026-09-12-journey-purpose.md) and [eight-jurisdiction Asia supplement](../research/2026-09-12-journey-purpose-asia.md), alongside the existing country dossiers. These records distinguish animal-health rules, customs treatment and business licensing. Relocation and cargo transport do not, by themselves, establish a commercial movement.

The purpose-review branch is an explicitly incomplete preparation brief, not a verified commercial checklist or legal classification. Purpose, larger pet groups and owner timing conservatively determine which guide is appropriate; destination-specific eligibility still needs checking. Dog-specific US/Canadian evidence is not reused for cats. No commercial medical deadlines or clearance promises are generated.

The GB-to-Netherlands personal example has five entry steps, with the duplicate AHC instruction merged while retaining its sources. A return task is conditional for a holiday and omitted for relocation. Existing raw research dossiers and production draft-publication gates remain intact.

## Critique and iteration

The initial independent usability critique scored 22/40. Its priorities were making journey intent explicit and reducing the dashboard's information load. The parallel pre-change static check found no TSX findings; this did not replace visual or usability review.

After implementation, the static detector reported zero primary findings and 116 advisory findings across the checked TSX/CSS. These include existing global drift and compact typography values. They were not represented as a clean token audit or used to trigger an unrelated global redesign. The complete output is in [journey-detector.json](../../.impeccable/review/journey-detector.json).

A fresh independent finish reviewer identified two content defects: the result did not explain the supplied owner-timing/group-size reason for review, and the vet brief omitted owner timing. Both were corrected and recaptured at desktop and mobile sizes. The reviewer then returned **ship for those two scored fixes**, with no visible regression in the four correction captures; this was not an unrestricted whole-surface certification. A separate documentation review informed the product, architecture, design and surface-record updates.

## Verification

| Check | Result |
| --- | --- |
| Automated tests | 41 passed, including purpose, count, timing, species-source filtering and legacy parsing |
| Type checking and scoped lint | Passed |
| Cloudflare production build | Passed; existing runtime/build notices remain |
| Whitespace check | Passed; Windows line-ending warnings only |
| Desktop and mobile | Tested at 1280 × 900 and 390 × 844 |
| Personal and relocation plans | Correctly separated from new-owner/breeding review; relocation cargo remained personal |
| Purpose-specific review | Breeding, owner separation and six-pet examples exercised |
| Keyboard and details | Requirement expansion and tab focus/activation checked |
| Ready Pack | Open/back focus, in-memory document state, pet count, purpose and owner timing checked |
| Overflow and console | No page-level horizontal overflow or browser warning/error observed in the checked states |

Browser checks included the first-step purpose choices, conditional subtypes, a personal GB/NL plan, relocation by cargo, a two-dog breeding journey to Canada, and a six-dog journey with the owner outside the five-day window. Expanded requirements retained their conditions and official links.

## Visual evidence and limits

Valid viewport/scrolled captures are under `.impeccable/review/`:

- `journey-desktop.png`, `journey-mobile.png`, `journey-mobile-expanded.png`
- `journey-choices-desktop.png`, `journey-pack-mobile.png`, `journey-breeding-mobile.png`
- `journey-review-reason-desktop.png`, `journey-review-reason-mobile.png`
- `journey-owner-timing-desktop.png`, `journey-owner-timing-mobile.png`

The last four show the two reviewer corrections. Earlier round-one captures are historical, not final evidence. Full-page capture failed in the browser backend; viewport and scrolled captures were used instead. Browser print pagination was not tested: the shared expanded print structure was inspected, but no print-layout approval is claimed. The 116 design-token advisories remain a separate maintenance concern. Research and local checks do not establish travel approval or complete commercial coverage.
