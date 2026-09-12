---
name: Zurtex
description: Familiar, caring guidance for international journeys with dogs and cats.
colors:
  canvas: "#fff"
  sky: "#edf8f7"
  sky-strong: "#d9f0ed"
  ink: "#12383d"
  body: "#31565a"
  muted-ink: "#536f73"
  teal: "#0b5c59"
  teal-dark: "#073f3e"
  coral: "#bf3b4e"
  coral-dark: "#a92f42"
  line: "#d7e4e3"
  line-dark: "#b8cecc"
  warning: "#78501b"
  warning-bg: "#fff8e8"
  danger: "#8a3341"
typography:
  display:
    fontFamily: 'Afacad, "Trebuchet MS", sans-serif'
    fontSize: "3.4rem"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.025em"
  headline:
    fontFamily: 'Afacad, "Trebuchet MS", sans-serif'
    fontSize: "2.5rem"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  title:
    fontFamily: 'Afacad, "Trebuchet MS", sans-serif'
    fontSize: "1.7rem"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  body:
    fontFamily: 'Afacad, "Trebuchet MS", sans-serif'
    fontSize: "18px"
    lineHeight: 1.5
  label:
    fontFamily: 'Afacad, "Trebuchet MS", sans-serif'
    fontSize: "1rem"
    fontWeight: 550
    lineHeight: 1.5
rounded:
  status: "5px"
  control: "8px"
  disclosure: "10px"
  surface: "14px"
  circle: "50%"
spacing:
  compact: "8px"
  field: "16px"
  section: "24px"
  spacious: "32px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.control}"
    padding: "10px 23px"
  button-primary-hover:
    backgroundColor: "{colors.coral-dark}"
    textColor: "{colors.canvas}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.teal}"
    rounded: "{rounded.control}"
    padding: "10px 23px"
  button-secondary-hover:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.teal-dark}"
  field:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "48px"
    width: "100%"
  guide-navigation:
    textColor: "{colors.body}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  guide-navigation-current:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.teal}"
  guide-status:
    backgroundColor: "{colors.warning-bg}"
    textColor: "{colors.warning}"
    rounded: "{rounded.status}"
    padding: "3px 9px"
  guide-welcome:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.body}"
    rounded: "{rounded.surface}"
    padding: "26px 30px"
---

# Design System: Zurtex

## Overview

**Creative North Star: "For the ones who come with us."**

Zurtex feels familiar, caring and clear. Its established identity combines white and pale aqua surfaces, deep teal text, muted crimson actions, Afacad typography and an original filled paw with a Z-shaped central pad. Natural pet-owner imagery provides the emotional connection; the current airport hero is a generated brand image in photographic style.

This documents the user-directed restoration of the earlier Zurtex identity and the subsequent requested logo, hero and minimal loader refresh on 12 September 2026. The rejected navy grid, cream and orange direction is not visual authority. Tokens come from `app/globals.css`; typography is loaded in `app/layout.tsx`. Surface composition and task flow belong in `.impeccable/surfaces/app-page-tsx.md`; the later asset and loading direction is recorded in `docs/design/2026-09-12-brand-refresh.md` and `docs/design/2026-09-12-minimal-loading.md`.

**Key Characteristics:**

- Spacious white and pale aqua surfaces.
- Friendly Afacad typography and an original paw with a Z-shaped pad.
- Crimson primary actions with teal navigation and selection.
- Natural pet-owner imagery with recorded provenance, including the generated airport hero.
- Readable questions, visible sources and honest uncertainty.

## Colors

The palette is light and calm, with a restrained warm accent for action.

### Primary

Muted crimson (`coral`) identifies the principal next action; `coral-dark` supplies its hover state. Preserve the existing token names even though the visible accent is crimson.

### Secondary

Deep teal (`teal`) carries links, selected controls, navigation, numbered markers and the paw mark. `teal-dark` strengthens secondary hover states. Pale aqua (`sky`) provides broad backgrounds and selected surfaces; `sky-strong` supports text selection.

### Neutral

White (`canvas`) is the main background. `ink` belongs to headings and labels, `body` to prose, and `muted-ink` to supporting information. `line` divides content; `line-dark` outlines controls.

Warm `warning` on `warning-bg` identifies information that still needs checking. `danger` identifies errors.

**The Meaningful State Rule.** Preserve readable state labels alongside color. A reading mark must never look or read like travel approval.

## Typography

Afacad is the display, body and control family, with Trebuchet MS and sans-serif fallbacks. Its rounded character supplies warmth without introducing a separate decorative face.

The frontmatter records desktop roles. The main display scales through 2.85rem and 2.6rem to 2.35rem on phones. Informational page titles use 3.1rem, then 2.6rem and 2.4rem. Body text becomes 17px at the phone breakpoint.

Headings use balanced wrapping. Labels stay in sentence case. Supporting paragraphs generally stop at 70–72ch; introductory copy is narrower. Planning dates use tabular numerals. Preserve relative hierarchy rather than imposing a new mathematical type scale.

## Layout

The primary content width is 1200px. Informational reading areas use a 1168px outer container with 24px horizontal padding. Broad sections breathe through larger margins; fields and related controls use compact, consistent gaps.

The implemented route form has four desktop columns, two below 1080px, and full-width origin and destination fields below 600px. Arrival date and species remain alongside one another on phones. The second stage changes from three columns to one below 820px. Phone primary form actions fill the available width.

The route result is a single-column document capped at 940px, with Your plan, Flights and Sources tabs. Below 700px the route heading and editing action stack, the route wraps naturally, and purpose choices become a vertical list. Source entries stack below 600px.

The guide-assembly loading screen uses a 1080px outer container and two columns separated by 64px, becoming one column at 760px. Its folded-map graphic is 216px wide, reducing to 180px on smaller screens. The heading tops out at 2.65rem and uses 2.35rem in the single-column layout. All five stage rows remain visible in the document.

The header is sticky. CSS governs document scrolling and switches to automatic scrolling for reduced-motion preferences.

## Elevation & Depth

Depth comes mainly from pale aqua against white and fine dividing lines. The shared ambient shadow (`--shadow`) lifts the integrated search panel and mobile navigation. It is not a default decoration for every section.

The observed shadow is `0 16px 45px rgba(12, 63, 62, 0.1)`. Preserve its low contrast. Checklist items and source rows remain separated by rules rather than individual raised cards.

## Shapes

Controls have gently curved corners using the control radius. Larger informational and search surfaces use the surface radius. Status labels are slightly tighter; disclosures use the intermediate radius.

The brand mark is an original filled paw: four rounded toe pads above a Z-shaped central pad, with no enclosing circle. The logo pairs it with outlined Afacad lettering at weight 650. Use the supplied SVG geometry in `public/brand/zurtex-logo.svg`, its white reversed variant, and `public/brand/zurtex-mark.svg`; do not rebuild the lettering as live text. The shared header/footer logo is 164px wide, reducing to 140px at 600px, with its 261:72 aspect ratio preserved. The standalone mark is also the configured favicon. Circles remain appropriate for numbered progress and checklist markers.

The landing hero is `public/images/zurtex-airport-companion-v2.webp`, with the original generated PNG retained alongside it. It depicts a seated woman and an adult golden retriever at an airport window, with no carrier or crate and the woman's ankles outside the frame. Preserve believable anatomy and scale, natural texture and both faces in responsive crops; the phone crop uses `object-position: 50% 20%`. This is a built-in ImageGen brand image, not a real customer photograph or evidence of airline eligibility. Its exact prompt and provenance are recorded in `docs/design/2026-09-12-brand-photo-prompt.md`, with the prompt also saved as the adjacent `.txt` file, embedded in the PNG and carried by `public/images/zurtex-airport-companion-v2.webp.json` for the web asset. This requested replacement supersedes the former airport image. The supporting companionship photograph remains credited to Thomas de Fretes / Unsplash on the About page.

## Components

### Buttons

Primary buttons are crimson with white text; secondary buttons are white with teal text and a fine control border. Both use 600-weight type, a minimum 46px height and the frontmatter padding. The Back action is transparent and removes left padding.

Hover darkens the primary action or adds pale aqua to secondary actions. Keyboard focus uses a 3px teal outline offset by 4px. The underlying button primitive supplies a small pressed translation. Loading disables submission and changes the action label.

### Inputs / Fields

Use visible labels and native controls. Fields are white with a fine darker border, teal hover borders and the shared keyboard-focus outline. Selects reserve right-side space for their chevron. Dog and cat choices use native radios presented as adjacent outlined choices; selection adds pale aqua and teal.

Errors use a separate readable message and alert semantics. Do not rely on red borders alone.

### Navigation

Desktop header links are quiet text links with crimson hover/current treatment. On smaller screens a menu button reveals the white navigation panel.

Route and free travel-tool tabs identify the current panel with teal text and an underline. Preserve the installed tab semantics, accessible labels and visible keyboard focus.

### Cards / Containers

The search panel is white and softly lifted. Guide introductions are pale aqua and flat. Warning status labels sit within the guide introduction and remain textual. Avoid turning every paragraph, source or checklist item into a card.

### Checklist and source patterns

For researched results, use compact numbered disclosure rows separated by rules. Keep the action title, timing and any conditional planning date visible; conditional steps say “If applicable”. Open a row for practical bullet points, the date’s conditions and official-source links. Entry requirements and departure preparations remain separate sections to arrange in parallel. Blocking facts stay visible; purpose-review plans state that the full entry requirements are not yet determined. Assumptions use a secondary disclosure, and the unresearched fallback retains bounded questions. The guide and free travel tools share this structure; printing expands the preparation details. Journey edits remove the obsolete result before resubmission. Guide/tools back-navigation retains in-memory document notes and restores focus.

Reduced-motion preferences disable smooth scrolling and reduce transition and animation durations to 0.01ms, with a single animation iteration.

### Verification progress

Use a small crimson plane over a pale aqua folded-map outline with teal route linework. The map is geometric, with no asserted geography. Quiet numbered stage rows use fine dividers and readable state labels; current activity, native progress, limitations and the cancellation control remain visible. Preserve all existing verification-process wording and dynamic server messages, including the existing limited-state message behavior.

The plane advances along its curve as the static guide’s five assembly stages finish, using the same completed-stage count as the native progress element. A 650ms transition connects the plane positions; native progress updates immediately without a width transition. Motion does not loop. Reduced-motion preferences remove the plane transition while preserving the meaningful position. Heading focus and the polite activity announcement remain intact.

## Do's and Don'ts

### Do:

- Do preserve white, pale aqua, deep teal, crimson, Afacad and the new paw with its Z-shaped pad.
- Do use the replacement airport hero and retain its generated-image provenance alongside credited supporting photography.
- Do keep both country fields full-width on phones.
- Do retain visible labels, keyboard focus and reduced-motion support.
- Do distinguish reading progress from confirmed requirements.
- Do tie the loading plane to the visible guide-assembly stages and describe the static process accurately.

### Don't:

- Don't restore the rejected navy grid, cream and orange identity.
- Don't replace pet-owner imagery with decorative technical graphics.
- Don't add fabricated palette ramps or unsupported status colors.
- Don't imply that a polished result supplies travel approval, verified requirements or calculated deadlines.
