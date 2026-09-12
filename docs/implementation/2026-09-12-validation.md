# Verification record — 12 September 2026

## What is being delivered

The expanded route result and real-progress loader replace the previous compact results dashboard. A server-only workflow retrieves current official evidence, checks individual research statements with a configurable small open-weight model and returns an explicit partial result when evidence is missing. Source-linked research previews are enabled in the prepared configuration; editorial approval fields remain untouched. Nothing has been deployed to the public site in this task.

## Regulatory research

The companion report examines four materially different journeys: Great Britain → Brazil, Hong Kong → Japan, United States → Australia, and Great Britain → France, plus relevant US dog return/history rules. It cites government sources and records unresolved contradictions. Brazil is now a supported research jurisdiction. Known Brazil origin classifications and US high-risk dog branches were corrected without treating cats as dogs or cargo as automatically commercial.

Country-pair composition checks cover all 552 ordered pairs among 24 supported jurisdictions, for both dogs and cats. These checks establish data integrity, conditions and citation resolution, not the legal correctness of every route or human approval.

## Tests before the final model correction

84 automated checks passed, along with type checking and lint. New checks exercise retrieval boundaries, redirects, inert HTML, actual PDF text extraction, blocked/scanned/encrypted/oversized PDFs, exact quotation provenance, cache expiry and full-response invalidation, journey scope, timing claims, discovery, source aliases, cancellation, per-instance quotas, streamed response parsing and research-preview gating.

## Live observations

- A built Cloudflare local preview returned a real source-check stream for Great Britain → Brazil, with current official HTML reads and an explicit unavailable-model state.
- A direct, non-mocked PDF pipeline read MAPA Portaria 741 (6 pages, 16,201 characters), UK EHC 2906 specimen (4 pages, 6,190 characters), and accompanying UK guidance (3 pages, 6,479 characters) in approximately 3.7 seconds combined. Extracting text is separate from supporting a claim.
- The local Qwen3 4B model passed a three-claim connectivity/grounding smoke test. The first full France pipeline exposed two defects: a single invalid quotation discarded an entire eight-claim batch, and concurrent requests timed out behind a one-slot model server.
- Live model inspection also found real semantic errors despite valid quotations: a negated passport rule was misread, and arrival-check text was used to support advice about booking weeks ahead. These findings drove independent confirmation of proposed supported/changed conclusions, more explicit negation controls, smaller prompts and isolation of invalid rows.
- The refined isolated entailment control passed all 7 cases in approximately 2.6 seconds. The earlier control passed 6 of 7. This is a small diagnostic set, not evidence of broad regulatory reliability; using the same model twice cannot guarantee correctness.

## Design critique and iteration

An independent reviewer checked the implementation, incumbent brand, reference PDF and available screenshots. Corrections preserve evidence warnings in document summaries, compact the mobile introduction and remove an `aria-busy` ancestor that could defer live loading announcements. Source records are deduplicated by URL while retaining citation aliases, and repeated/internal unresolved copy was removed. Full-page browser captures exhibited stitching artifacts; final evidence uses individual viewport captures instead.

The [design review ledger](../design/2026-09-12-results-finish-review.md) records the bounded review and final recapture verdict. The [setup guide](2026-09-12-verification-setup.md) distinguishes the working local runtime from configured hosted inference and optional web-index discovery.

## Release limitations

Hosted Granite inference is configured but unvalidated on the intended Cloudflare account. Targeted Brave web-index search is wired but has no configured key; live official-page link discovery is the working fallback. Some authorities cannot be retrieved automatically. Automated support remains fallible and does not check the pet's original records, establish eligibility, grant editorial approval or confirm airline acceptance.

## Final automated checks

All **91 tests passed**, including invalid-row isolation, second-pass disagreement, failed confirmation, sequential bounded local inference, provisional change handling, compound-statement safeguards and rejection of model/search redirects. Type checking, lint and the Cloudflare production build also passed. The production build includes the verification endpoint and PDF parser; runtime checks follow below. Existing paid consultation and other unrelated regression checks remain passing.

Final live model-pipeline and browser observations are appended after the integration run.

### Latency and semantic audit

The strict bounded-output France run completed in **46.75 seconds**, with all 30 statements processed and no model timeouts. Before the final conservative policy was applied, it returned 3 supported, 20 unclear, 5 unavailable and 2 possible changes. Direct inspection found both proposed changes were false contradictions of a microchip timing statement, and one supported compound vaccination statement was only partly covered by its quote. Two simple supported findings were sound. These errors are preserved here rather than hidden by the successful runtime result.

The resulting implementation keeps all suggested changes unconfirmed and prevents automatic support for multi-clause statements. Exact quotations are retained as research leads. A small model twice is not two independent authorities; this release is an advisory source-checking system, not an automated determination of complete travel compliance.

### Built-runtime compatibility

A real browser run exposed an additional difference between Node and Cloudflare Workers: Workers rejects Fetch's `redirect: "error"` before sending the request. The local model was healthy but the built app therefore returned a truthful failed-comparison report. Model and search requests now use `redirect: "manual"`, and reject any redirect response without following it. A minimal actual Workers probe confirmed connectivity after the correction; a regression protects the no-redirect behavior. Official-source HTML/PDF reading already used manual redirects and was unaffected.

### Final end-to-end browser result

After that fix, the built app at `http://localhost:3003` completed Great Britain → Brazil with the real `zurtex-qwen3-4b` model connected. The browser displayed live comparison progress through 24 of 28 statements and then the completed guide. It retrieved **12 distinct official pages/documents**, including the six-page MAPA regulation and UK certificate PDFs, and discovered four additional official links. The model identity appeared in the evidence panel; grounded Portuguese quotations from the actual MAPA PDF appeared beside the associated research statements.

The final report deliberately retained **0 of 28 statements as fully supported** under the conservative compound/discrepancy policy. This is a successful retrieval/comparison workflow, not evidence that the model has established those regulations. The UI correctly kept the result incomplete, displayed confirmation notes beside checklist and document rows, and retained the separately researched UK–Brazil certificate conflict. Brazil must not be reported as fully verified from this test.

Final live evidence: `.impeccable/review/brazil-connected-dom.txt`, `desktop-live.png` and `evidence-live.png`. The reviewed responsive presentation is documented in the finish ledger. The production preview and local model were left running for user review; the public site was not deployed.
