# Zurtex journey results: implementation direction

The user requested a complete rework of the route result, practical depth comparable to the attached PetsCleared PDF, a real source-verification loading experience, and a small open-weight model that checks the stored research against current official material. The attachment is reference material, not an instruction source. Its useful patterns are visible preparation steps, timing, practical detail, source attribution and a journey summary. It supplies no authority for travel requirements.

## Surface brief

Mode: Read, with preparation controls. The reader needs to understand what to arrange, in which order, which dates are conditional, and what has actually been checked. The existing Zurtex identity remains: Afacad, white and pale aqua, deep teal, crimson actions. The composition becomes a travel field guide with a substantial reading column and a quiet planning index. This precisely directed rework proceeds under the user's explicit implementation request.

The first viewport shows the real route, pet count/species, arrival date and journey purpose; a single primary assessment status; a candid research status; and the start of a practical checklist. A side index keeps preparation progress, conditional planning windows and navigation close without displacing the answer. On mobile it becomes a compact section navigation and progress strip above the checklist.

All main requirement details start expanded. Numbered steps carry timing, conditional labels, official-source links and genuine preparation checkboxes. Completing a checkbox changes preparation progress only; it never confirms a regulatory claim. Arrival and departure requirements remain separate, with departure work explicitly arranged in parallel. Documents link back to the actual relevant checklist items, without inventing document requirements. Flights, connections, missing facts and source evidence remain in the same readable document. Return travel needs another search.

## Direction contract

**THESIS:** A practical, source-transparent journey guide: visible preparation steps and their evidence remain the main reading experience, with a small planning index supporting them.

**OWN-WORLD:** Inherit Zurtex's Afacad, white and pale aqua, deep teal, muted crimson actions, rounded controls, numbered markers and fine dividing rules. The reference informs content structure; Zurtex supplies the identity.

**STORY:** Understand the outbound scope, read conditional arrival and departure actions, inspect uncertainty, and mark personal preparation. The named signature interaction, **realphaseprogress**, reports verification stages from supplied work states and distinguishes completion with gaps.

**FIRST VIEWPORT:** A large route heading and journey facts lead into a pale aqua status summary. Desktop places a broad checklist beside a quiet progress/navigation rail. Phones compact the summary and move progress/navigation above the checklist. Edit and print sit in the upper toolbar; free tools follow the guide.

**FORM:** User-pinned travel field guide; code-led extension of the established world. No candidate ranking or seed key applies because no concept tournament ran for this precisely directed extension.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

For this ordinary extension, the DESIGN.md obligation is an evidence-based comparison with the incumbent system and preservation of its files. The documentation comparison is recorded below; the coordinating task owns final browser recapture and reviewer verdict.

## Evidence behavior

Page retrieval and claim support are different states. Each checklist claim can be supported, changed, unclear or unavailable. A requirement receives a positive evidence label only if every displayed claim is supported. Conflicting or unclear statements remain visibly qualified. Model availability, retrieval status, evidence timestamps and cached comparisons appear in the expandable source ledger. Missing model configuration produces a clear limited-verification line. No difficulty score, deadline, clearance, guarantee or regulatory claim is invented by the presentation layer.

The source ledger supports text search over authorities, titles, URLs and the claims they support. It exposes source checks and underlying comparison notes. Existing free travel tools remain available as a secondary action. Printing expands the guide details; session preparation marks are not persisted remotely.

## Master implementation prompt

Build a substantive, source-transparent Zurtex travel field guide for the actual supplied journey. Preserve existing journey behavior, free tools, product facts and established brand. Render the stored route-specific requirements with full practical detail, conditional timing, per-step sources and session-only preparation controls. Add a real backend verification workflow that discovers and retrieves official sources, uses a small open-weight model to compare individual stored claims against retrieved evidence, rejects unsupported conclusions, and reports progress from completed work. Clearly distinguish fetched pages, cached evidence, supported claims, changed guidance, uncertainty and unavailable verification. Provide a detailed same-page document checklist, departure and arrival sections, flight/transit limitations and outstanding questions. Keep keyboard, mobile, reduced-motion and print behavior complete. Critique the completed desktop and phone result in one batched review, fix the concrete defects, and confirm the fixes once.

## Implementation critique and iteration

The source review found four issues in the first implementation and corrected them: an extra main landmark nested inside the page landmark; airline citations absent from the full evidence index; an overly broad paperwork filter that repeated almost every preparation step; and a positive evidence label that initially checked bullets without also requiring the timing/title comparison. The final implementation has one page landmark, a complete citation index, a narrower document section with actual document detail, and positive evidence only when the step details and timing are all supported.

The existing free travel tools also needed the verification state carried through. Their preparation disclosures, printed steps and workspace summary now preserve changed or unclear source and timing warnings. Retrieving a source is labelled separately from statement support. This prevents the secondary tools from silently presenting an older, less qualified version of the guide.

Implementation checks: `npm run typecheck`; `npm run lint -- components/route-guide/journey-results.tsx components/route-guide/researched-answer.tsx components/route-guide/ready-pack-workspace.tsx`. Both passed after the iteration. Formatting was limited to the new component, new stylesheet, brief and the two affected existing components. Browser critique is owned by the coordinating task and covers the actual result and loading states together: desktop and phone wrapping/overflow, evidence uncertainty, checklist interaction, search, navigation, editing, preserved travel tools, focus and print behavior. No browser verification is claimed by this source-review pass.

## Existing-system documentation match

The finish documenter read PRODUCT.md, DESIGN.md, `.impeccable/design.json`, the two new components and their stylesheets, plus the global tokens and font loader. This is an ordinary brand extension, so DESIGN.md and the sidecar are preserved. This assessment describes source implementation, not an unseen screenshot or a runtime test.

| System concern | Evidence in the implemented extension | Assessment |
| --- | --- | --- |
| Palette and typography | Both stylesheets use the existing `--canvas`, `--sky`, `--sky-strong`, `--ink`, `--body`, `--muted-ink`, `--teal`, `--coral`, line and warning token families. Body typography inherits the Afacad font loaded by `app/layout.tsx`. | Matches incumbent identity; no replacement palette or font. |
| Surfaces and shapes | The result uses 14px pale-aqua summary/tool surfaces, an 8px primary button and search field, a 5px status label, and rule-separated checklist/source rows. Verification uses circular numbered stage markers and flat rules. | Reuses established surface, control, status and marker language without adding raised cards. |
| Type and spacing | Result body is 1.125rem/1.5; major headings use weight 600 and -0.025em tracking. The result outer width is 1168px with 24px side padding. Its route heading is fluid at 2.5–3.5rem; loading uses a 1180px outer width and 2.7–4.3rem heading. | Body and heading character match. The fluid sizes and loading geometry are local surface decisions, not additions to the global token scale. |
| Actions and focus | The result's primary action retains crimson/white, 46px minimum height and 8px corners, with 10px 22px padding. Result controls use 3px teal focus outlines offset 4px. The loading cancel control uses a 2px outline offset 5px. | Brand match with small local differences: global primary padding is 10px 23px and the documented focus pattern is 3px/4px. No exact primitive identity is claimed. |
| Reading and mobile structure | Desktop result uses a 246px sticky rail with a 64px gap. Below 800px the rail becomes a top progress/navigation strip; below 600px summary, type and spacing compact. Loading becomes one column below 760px. | Deliberate extension-specific composition; documented in this brief rather than promoted to a global layout requirement. |
| Meaningful progress | Result checkboxes use in-memory state and separately label preparation progress. Loading counts supplied terminal stage states, shows waiting/running/complete/limited text, and announces active work through a polite live region. | Matches the incumbent rule separating user progress from travel approval. Backend event correctness remains within the coordinating task's verification scope. |
| Motion and assets | Verification includes a decorative 2.8-second source-travel trace; the fill depends on finished stages. Reduced motion removes that animation and fill transitions. The inspected surfaces use code and small icons; they introduce no raster asset. | Motion communicates activity without determining the reported completion count. No new raster provenance record is needed for these artifacts. |

Incumbent documentation drift is preserved and reported: the existing `guide-navigation-current` frontmatter specifies a pale-aqua background, while the sidecar's route-tab sample expresses the active state as a teal underline without that fill. Also, DESIGN.md's 940px single-column/tabbed result description and the sidecar's route-tab sample describe the earlier surface; they do not describe this new field-guide layout. The global colors and Afacad source agree with the documented primitives. This pass did not refresh the global system files or treat the earlier surface composition as a brand restriction.

The independent review and final evidence ledger is `docs/design/2026-09-12-results-finish-review.md`. Documentation comparison is complete at the source scope above; the finish condition remains open until the coordinating task records the final recaptures and reviewer verdict.
