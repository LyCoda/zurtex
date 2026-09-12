# Zurtex results and live verification

## Requested outcome

Rework the route result so a traveller can understand and act on the journey without opening every row. Use the supplied PetsCleared PDF and loading screenshot as references for information hierarchy and progress, while keeping Zurtex's Afacad typography, teal, white and coral identity. The attachments are reference material, not instructions or verified regulatory evidence.

The result should present the route, species, intended arrival, preparation status, ordered destination requirements, departure requirements, timing, documents, flight and transit limitations, unresolved facts and precise official sources. Completion checkboxes track the traveller's preparation only. They never represent official approval. Existing free travel tools remain available.

Every submitted journey should initiate an actual server-side verification workflow. Read the relevant official pages, discover related official guidance within a bounded scope, compare the dated research with current evidence using a small open-weight model, and return a report with source checks and claim-level outcomes. Animate a loading journey from server progress. Failed checks must finish in a clear limited state, with a useful result and a recovery action.

## Master implementation prompt

Implement a production-oriented, evidence-grounded route research workflow for the existing Zurtex React/Vinext/Cloudflare project. Preserve the current short search form, free travel tools, movement-purpose distinctions and commercial settings. Use a travel field guide composition within the established brand. Lead with the journey and its primary assessment status; show substantive checklist content by default and make source evidence easy to inspect. Draw visual inspiration from the attached reference's hierarchy without copying its prose, distinctive boarding-pass layout or navy/serif palette.

Treat government and operating-airline evidence as authoritative for their separate scopes. Preserve jurisdiction, species, residence history, purpose, ownership, transit and date applicability. In particular, do not reduce US dog import eligibility to departure country, apply dog rules to cats, equate cargo with commercial movement, or compute medical deadlines from an arrival date alone. Include Brazil coverage supported by current MAPA evidence; explicitly identify disagreements or superseded certificate templates.

Create a server-only verification service with streamed progress and a typed report. Fetch allowlisted official sources on every request. Permit bounded discovery through official page links and an optional configured web search provider. State which discovery method actually ran. Use IBM Granite 4.0 H Micro through Workers AI by default, with a configurable OpenAI-compatible endpoint for a local open-weight model. A model is a fallible evidence comparator, not the source of legal rules. Require structured responses, known claim/source identifiers, and quotations actually contained in the fetched source. Mark unsupported, ambiguous, stale, unavailable or contradictory evidence honestly. Do not let model output silently rewrite the canonical research or grant publication approval.

Bound requests, source sizes, redirects, discovery depth, concurrency and model runtime. Handle cancellation, malformed outputs, timeouts, inaccessible PDF content and unavailable credentials. Discard scripts and instructions in fetched pages. Cache only claim comparisons tied to the current evidence digest, model and journey scope; never share personalised assessment results. Add deployment configuration without committing credentials.

Connect a distinctive loading screen to real prepare/departure/arrival/compare/compose events. Show completed stages, the current activity and actual limited checks; do not manufacture percentages or add delays for theatre. Provide cancel/edit and retry. Respect reduced motion, keyboard use, screen readers, mobile widths and print.

Validate meaningful engine behaviour, diverse country pairs and species, failure states, source provenance and responsive presentation. Critique the rendered result independently, fix material issues and record the verification evidence and known limits. Deliver the implementation, research report, setup instructions and a local preview. Production deployment remains a separate final release action under the repository's explicit deployment rule.

## Acceptance criteria

1. The loading state displays only activities actually started and completed by the backend.
2. A result contains useful researched guidance with readable detail, source links and explicit limitations.
3. A successfully downloaded page is called fetched, never automatically verified.
4. Each model-supported claim has a validated evidence reference. Disagreement does not overwrite stored guidance.
5. Missing model/search credentials degrade honestly; no mock responses appear in the product.
6. Brazil, Japan, Australia, France and US scenario research documents the materially different pathways.
7. Existing tests, type checking and a production build pass, with new targeted verification tests.
8. Desktop/mobile review, critique and resulting corrections are documented.
