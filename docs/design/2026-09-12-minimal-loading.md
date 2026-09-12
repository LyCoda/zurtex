# Zurtex minimal verification loader

## Scope and authority

The user requested a visibly simpler loading screen and offered a plane landing on a map or a paw as the visual, while explicitly keeping all wording about the verification process. The selected direction is the plane and map. This is a narrow refinement of the established Zurtex surface: mode **Operate**, existing white and pale aqua, deep teal, muted crimson and Afacad. The loading component and its stylesheet are the only UI files in this change. Shared branding and backend work belong to the coordinating task.

The incumbent source-check headings, explanatory copy, stage descriptions, state labels, fallback activity, cancellation label and accessibility labels remain exactly as supplied. Dynamic server messages continue to render from the same expressions, including the existing limited-stage message behavior. No stage, control, or information section has been hidden.

## Direction contract

**THESIS:** Make waiting feel clear and calm: show the route, the actual work underway, and a small plane settling onto a map as real source checks finish.

**OWN-WORLD:** Use the established white canvas, pale aqua map, teal linework, restrained crimson plane, Afacad type, circular stage markers and fine row dividers. The map is a folded geometric outline with one curved route; it asserts no real geography or country boundary.

**STORY:** Read the outbound route, see the current server activity and actual completed-stage count, then scan all five source-check descriptions. Cancel and edit remains available throughout. The named signature interaction is **plane landing on real stage events**: the plane position is computed from the same completed-stage count as the native progress element. There is no timer, repeated journey, looping spinner, artificial percentage or idle motion.

**FIRST VIEWPORT:** A compact cancel/journey toolbar and route heading establish context. A 216px map diagram and restrained heading sit above the unchanged activity, progress and limitation copy. Five quiet, rule-separated stage rows occupy the adjacent desktop column. At 390px the composition becomes one column, the diagram is 180px wide and the heading is 2.35rem; current activity, progress and the start of the stage list are the viewport targets. Long route names may wrap, and the cancellation target is at least 44px tall.

**FORM:** Code-led refinement inside the existing visual world, directly shaped from the user-pinned request. Exact SVG geometry supplies the map and Lucide supplies the PlaneLanding symbol. No raster picture, comp round, replacement global design system, or new visual-world selection is required.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

For this narrow extension, DESIGN.md is compared with the finished source and preserved. The coordinating task owns the browser inspection and final review verdict. No new raster asset is used by this loading screen.

## Implementation record

- Reduced the headline maximum from 4.3rem to 2.65rem, narrowed the outer composition to 1080px, reduced column separation to 64px and made stage rows more compact.
- Replaced the large paw and file endpoints, running dot and repeated travel animation with the small folded map and plane.
- Preserved the original completed-stage calculation, running-stage selection, fallback message, stage-state handling, native progress value, cancellation callback, heading focus and polite atomic activity announcement.
- Used a quadratic curve to derive the plane's six positions from zero through five completed stages. The 650ms transition connects actual stage changes; the icon stops whenever no new stage completes.
- Reduced-motion preferences remove the movement while retaining the current meaningful plane position and native progress value.
- Kept all five rows visible, including their original descriptions or existing server-provided limited-state messages. Stage labels continue to communicate state without depending on color.

## Copy preservation evidence

Before editing, the component was parsed with the TypeScript parser and a sorted snapshot captured of nonempty JSX text, stage title/description literals, conditional string branches and accessibility attribute literals. JSX formatting whitespace was normalized. After editing and formatting, the same extraction returned an identical array.

Before SHA-256: `289786a70972b8fa5770ef0ddd80d7a49fc20242e56cfee4d5459d13127058e3`

After SHA-256: `289786a70972b8fa5770ef0ddd80d7a49fc20242e56cfee4d5459d13127058e3`

Comparison: **exact match**. This check covers the following original literal snapshot; empty and semantic values are included because they were part of the captured branches and attributes.

```json
[
  "",
  "A clearer journey.",
  "A little checking.",
  "Bring your guide together",
  "Cancel and edit journey",
  "Check departure requirements",
  "Checking now",
  "Compare the checklist with the sources we could read.",
  "Connecting to your source check…",
  "Cross-check the evidence",
  "Find entry conditions and related official guidance.",
  "Find the right guidance",
  "Finished",
  "Finished with gaps",
  "Keep supported findings and open questions visible.",
  "Match the route, species and travel purpose.",
  "Read the destination rules",
  "Read the export authority's guidance.",
  "Some authorities take longer to respond. If a source cannot be read or a rule cannot be confirmed, your guide will say so.",
  "Source-check progress",
  "Source-check stages",
  "Source-check stages finished",
  "Up next",
  "We’re opening the official guidance for your route and checking it against your travel checklist.",
  "of",
  "polite",
  "s",
  "stages finished",
  "step",
  "to",
  "true",
  "true",
  "true",
  "verification-heading",
  "· Outbound journey"
]
```

Dynamic journey values and server activity/limited-state expressions were also preserved in source. Formatting completed for the two UI files. Browser appearance, responsive geometry, runtime cancellation and stage updates remain for the coordinating task's combined verification pass; this document does not claim an unseen browser result.

## Existing-system match

All colors continue to use the existing token families. Type inherits the existing Afacad family. Row dividers and circular state markers match the incumbent document patterns; the map is a local progress detail. The loading screen introduces no global tokens, font, shared control changes, raised cards, shadows, gradients or new backend behavior. The prior loading geometry and decorative travel animation described in the earlier results direction record are superseded for this surface by this document.
