# User-directed design reevaluation

## Direction

The user preferred the earlier zurtex.org presentation and explicitly rejected the navy/chart local redesign. PetCleared was inspected for its route-input and ordered-results interaction, not for reusable regulatory facts or copied visual styling.

The revised preview restores the original aqua/white/teal/crimson identity and existing photographs. It uses two short question stages and a separate route dashboard with editable trip details, expandable questions, reading marks, flight checks, timing limitations and direct source links.

## Material findings addressed

- Visual identity had drifted into an impersonal operations-console theme.
- The form exposed too many facts simultaneously.
- Existing results became stale when the form changed and successful results did not move keyboard focus.
- Airline labels implied actual operating-flight evaluation that did not exist.
- Held country and airline summaries were still displayed.
- Source metadata was generic and disconnected from findings.
- US dog evidence could be used without a cat-specific branch.

## Remaining product work

1. Have an authorised content owner approve claim-level destination and origin/export rules, including applicability, effective dates and conflicts.
2. Build deterministic evaluation and record-driven follow-up questions for a deliberately narrow initial corridor set.
3. Add boundary-tested veterinary timing only after the records and approved rules exist.
4. Cover operating flight segments, transit airports and territory-specific paths.
5. Validate the complete free-answer experience before enabling any paid or human-review operation.

The current dashboard is a research-question guide. It does not yet match a mature service's personalised regulatory answers, timeline or persistent trip account. This limitation is displayed in the product and remains a release boundary.

## Verification

- Original identity compared against git commit `0bfb0f1` and the public site.
- PetCleared route search and result inspected with a synthetic journey.
- Desktop and mobile staged search, result focus and Edit journey exercised.
- Twenty automated tests pass, including country/species coverage, held-claim suppression, direct source references, US cat separation and carrier/transit/region normalisation.
- Type check, application-scoped lint and Cloudflare build pass.
- Scoped design detector returned no findings; that is not a whole-product certification.
- Full-page browser screenshot stitching produced malformed captures. Review evidence uses explicit viewport captures instead.
- Production has not been changed.
- Fresh independent finish review: `ship` within the reviewed viewport/code scope, after resolving phone country-label truncation and CSS-governed reduced-motion scrolling. Reduced-motion runtime emulation was unavailable; that fix was reviewed in source. This verdict is not production-readiness approval.
