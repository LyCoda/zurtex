# Consultation service implementation audit

Date: 12 September 2026. Scope: local implementation and bounded verification, not public deployment or commercial launch approval.

## Source and decision precedence

The complete three-page consultation-service reference PDF supplied for the review was extracted, rendered and visually inspected. Its free-information / optional-human-support direction informed the build. The user's later explicit answer overrides the draft's unconfirmed pricing, call duration, recap timing and enquiry-first proposal:

- US$5 for one planned journey.
- One call with no fixed time limit; written recap with no fixed delivery deadline.
- Booking details and a Stripe authorisation hold before manual suitability review and collection.
- No consultation enquiry-preparation form.
- Preserve the original Who We Are story, not the PDF rewrite.

The unlimited timing decision is not represented as unlimited additional calls, ongoing journey management or an indefinite card authorisation. The PDF itself was not changed.

## Implemented

- `/consultation` introduces the service, its scope, five-step process and booking form. `/ready-pack` and `/services` redirect to it.
- Route guidance, preparation steps, vet brief, document notes and source links remain free. Existing factual-publication and unsupported-route limits remain; payment never unlocks unapproved requirements.
- Navigation, result offers, free tools, methodology, contact and policy pages use the consultation model. Old pack delivery/access promises were removed from the current offer.
- The original About hero, four story paragraphs and sign-off from commit `4808709` are restored. The incumbent Afacad type, white/aqua surfaces, teal text, crimson actions and existing pet photo are preserved.
- Server-owned pricing is 500 USD cents. Checkout uses manual capture, consent, bounded booking data, same-origin checks and stable retry keys. No public capture endpoint exists.
- Return status validates the session reference and expected amount/currency/workflow/capture mode. Authorised, collected, released, refunded, partially refunded and unresolved states are separate; collected payment is not presented as a confirmed call time.
- New consultation holds are never automatically captured or cancelled by the status route or webhook. Exact historical US$7 reservation release handling remains isolated for earlier customers.
- Manual review, capture/cancellation, scheduling, secure records and communication responsibilities are recorded in [the operations handoff](../operations/consultation-service.md). Templates are unsent drafts.

## Automated verification

- 46 tests pass, including five consultation suites covering strict input parsing, server-owned checkout values, status validation, webhook isolation and preservation of the original story/free tools.
- TypeScript checking passes.
- The production Cloudflare build passes. The Sites build helper failed on this Windows environment; the project's existing Cloudflare build command was the successful fallback.
- A separate read-only payment review exercised nine lifecycle cases and six mismatch cases with isolated mocks. It found no material handler defect. Cookie mismatch is rejected before lookup, and new consultation status performs no capture/cancel action.
- Cookie matching proves possession of a session reference, not authenticated customer identity. Responses expose only payment lifecycle state, test mode and applicable hold expiry.
- Stripe tests use mocks; no real authorisation, capture, cancellation, refund or customer message occurred.

## Browser and visual verification

One batched desktop/mobile inspection found a select-width issue. A single correction batch made booking fields consistently full-width, followed by confirmation captures. The inspection covered the actual user viewport, 1280px desktop and 390px mobile targets. Captures are settled viewport/scrolled evidence, not full-page images.

Verified:

- Consultation navigation and booking anchor.
- Native required fields, route/species/purpose controls and consent using synthetic details.
- Clear disabled-checkout explanation when credentials are absent.
- Mobile menu Escape handling and focus restoration.
- Original Who We Are presentation and loaded photo on desktop/mobile.
- Free guide to tools, document-note retention across back-navigation, and restored focus.
- Cancelled return state does not imply payment approval or a confirmed booking.
- No horizontal page overflow in checked states; browser warning/error log was empty.

Print pagination, real hosted Checkout, actual held/captured/refunded return screens and public deployment were not browser-verified.

Evidence in `.impeccable/review/`:

- `consultation-user-1821.png`
- `consultation-desktop.png`, `consultation-mobile.png`
- `consultation-booking-desktop.png`, `consultation-booking-mobile.png`
- `consultation-checkout-mobile.png`
- `consultation-about-desktop.png`, `consultation-about-mobile.png`
- `consultation-free-tools-desktop.png`, `consultation-free-tools-mobile.png`
- `consultation-status-desktop.png`, `consultation-status-mobile.png`

The detector was run once: zero primary findings and 117 advisory findings (113 font-size, three radius and one color). The full report is `.impeccable/review/consultation-detector.json`. Advisories were not used to create new tokens or justify unrelated global styling changes.

## Independent finish verdict

Disposition: **ship, LOCAL UI only**. The reviewer inspected all 12 valid captures and sampled the implementation. No material local UI fixes remained. The specified incumbent-world extension did not require a new concept seed or approved comp.

The review confirmed preserved typography/color/material, clear separation of free tools from US$5 support, readable mobile forms, the original story, and honest disconnected-checkout/return states. The original PDF was not supplied to that reviewer, and non-cancelled payment states were source-reviewed rather than live-rendered. This verdict does not establish live payments, service staffing or commercial launch readiness.

The independent documenter recommended terminology-only reconciliation in DESIGN.md and the free-tools surface brief. Existing tokens and `.impeccable/design.json` remain unchanged. The documenter also caught an inherited disabled cursor on the now-active consultation link; the root corrected it to a pointer without changing layout, then repeated tests, type checking and the production build. Both the documenter and finish reviewer verified the targeted correction; the final scoped disposition remains ship for local UI only.

## Remaining launch blockers

The local environment has no configured Stripe credentials, and the Stripe connector is not signed in. Booking is enabled in application policy, but the preview correctly prevents an actual checkout while disconnected. Test-mode defaults and `ZURTEX_LIVE_READY=false` remain.

Connect the existing account through secure configuration, verify hosted sandbox checkout and the manual Dashboard review/capture/cancel workflow, and confirm staffed scheduling, legal operator details and secure records handling before an authorised live launch. No new account, infrastructure purchase or deployment was performed.
