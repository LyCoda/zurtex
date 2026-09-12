# Zurtex results and verification: finish ledger

Scope: the journey result and source-verification loading state, extending Zurtex's existing visual identity. Direction: `docs/design/2026-09-12-results-direction.md`. Build path: code-led. The PetsCleared attachment supplies structural inspiration; no approved visual comp governs the build.

## Independent review findings and correction status

The independent finish reviewer requested the following three material corrections. The documenter verified their source changes; the reviewer subsequently scored every correction resolved from source and fresh, valid viewport captures.

| Finding | Applied correction visible in source | Final reviewer score |
| --- | --- | --- |
| Preserve document warnings | `journey-results.tsx` checks document-linked claims for changed/unclear status, retains the document's conditional label, and displays “Needs source confirmation” with a direction to resolve source and timing questions. | Resolved |
| Compact the mobile result | The 600px rules in `journey-results.css` reduce route/title spacing, summary padding, scope repetition, progress-strip gaps, and section-navigation spacing. | Resolved: navigation around 680px; checklist around 980px after the necessary certificate warning |
| Remove blanket `aria-busy` from loading | `verification-loading.tsx` has no `aria-busy` on its section. The active activity message retains `role="status"`, polite live announcements and atomic text; stage text and the native progress element remain present. | Resolved |

## Evidence boundary

The documenter inspected the current components, stylesheets, global tokens, font loader and existing product/design documents. The documenter did not inspect screenshots, run the browser, build the application, run tests, or rerun a design detector. Test outcomes already recorded in the direction brief belong to the earlier implementation pass.

Final reviewer disposition: **“ship this UI revision.”** All five final viewport captures were judged valid, with readable and consistent layouts. Desktop identity and hierarchy, mobile text and controls, and loading progress were preserved. This verdict covers presentation and the source-level corrections. It does not certify provider reliability, regulatory accuracy or whole-app readiness. Screen-reader announcements were checked in source, not with assistive technology.

Final capture evidence under `.impeccable/review/`: `desktop-final.png` (1440×1000), `mobile-final.png` (390×844), `mobile-checklist-final.png`, `loading-desktop-final.png` and `loading-mobile-final.png`. Additional evidence view: `mobile-evidence-final.png`. The browser's rendered phone document measured 375px client width and 375px scroll width with its scrollbar: no horizontal document overflow.

Browser interactions confirmed both cancellation paths restore the editable journey with its supplied values, preparation checkboxes update the count, section navigation works, source search filters matching authorities, and the preserved free-tools workspace opens with the same evidence limitations. The complete build passes 91 automated tests, type checking and lint; the provider-specific runtime record is kept in `docs/implementation/2026-09-12-validation.md`.

## Documentation outcome

**Existing system match documented.** Source evidence confirms palette, Afacad, flat tonal surfaces, numbered markers, familiar corners and meaningful state labels are reused. Surface-specific geometry and minor action/focus differences are recorded in the direction brief. DESIGN.md and `.impeccable/design.json` remain unchanged; observed incumbent documentation drift is reported there. No new shipping raster is introduced by the two inspected UI components.

Finish status: source documentation complete; independent UI verdict complete with all requested corrections resolved.
