# Live source verification architecture

## Recommendation

Use a bounded retrieval and evidence-comparison service alongside the existing deterministic route composer. The small model compares stored claims with retrieved text. Application code controls network access, identifiers, applicability, timing and publication. This contains the consequences of model error and allows a useful partial result when any provider fails.

The reference images demonstrate a checklist format and a source-checking interface. They do not establish which model, crawler, cache or verification process PetsCleared uses. Its regulatory statements need independent checking against the competent authorities.

## Model choice

IBM Granite 4.0 H Micro is a 3B-parameter instruction model under Apache 2.0. Its published capabilities include extraction, classification, retrieval-augmented question answering and function calling; Portuguese, Japanese, Chinese and English are among its supported languages. These are relevant to cross-border pet travel evidence. They are not proof of regulatory accuracy. A route-specific evaluation set is still required before claiming dependable automated validation. [IBM model card](https://huggingface.co/ibm-granite/granite-4.0-h-micro).

Cloudflare serves it as `@cf/ibm-granite/granite-4.0-h-micro`, supports a JSON response format and exposes it through a Worker AI binding. This fits the existing deployment without a separately operated GPU server. Current documented pricing is approximately $0.017 per million input tokens and $0.112 per million output tokens; provider cost and usage limits should be checked at release. An illustrative 12,000-input/2,000-output-token comparison costs about $0.000428 for model inference alone, excluding search, retries, hosting and other charges. [Cloudflare model documentation](https://developers.cloudflare.com/workers-ai/models/granite-4.0-h-micro/), [pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/), [binding configuration](https://developers.cloudflare.com/workers-ai/configuration/bindings/).

Qwen3 30B A3B is a configurable hosted alternative for evaluating harder comparisons. It has approximately 30B total parameters with 3B active per token; it should not be described as a 3B model in storage or deployment terms. Selection between models should follow measured evidence accuracy and latency. [Cloudflare Qwen model documentation](https://developers.cloudflare.com/ai/models/%40cf/qwen/qwen3-30b-a3b-fp8/).

A local option is `qwen3:4b-instruct`, whose Ollama listing identifies a 4.02B model and 2.5GB quantized download. Ollama exposes an OpenAI-compatible chat API. Actual memory demand exceeds weight-file size and increases with context; local availability and latency must be measured on the host. A cloud Worker cannot access a private laptop's localhost endpoint. [Ollama model listing](https://ollama.com/library/qwen3:4b-instruct), [API compatibility](https://docs.ollama.com/api/openai-compatibility).

The implemented local development runtime uses Qwen3-4B-Instruct-2507 Q4_K_M through llama.cpp b10927, served only on the loopback interface. The model is a non-thinking, Apache-2.0 instruction model; the quantized weights and runtime archives were checked against the publishers' SHA-256 values. The local runtime and test results are recorded separately from the configured, untested hosted Granite option. [Official Qwen model card](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507), [GGUF distribution](https://huggingface.co/lmstudio-community/Qwen3-4B-Instruct-2507-GGUF), [llama.cpp release](https://github.com/ggml-org/llama.cpp/releases/tag/b10927).

## Discovery and evidence

The initial source set comes from dated country dossiers. Retrieve these pages anew for each journey, then follow a bounded set of relevant links within approved authority hosts. This is official-source discovery rather than a general web-index search. A configured Brave Search key enables targeted web discovery using country/species queries restricted to trusted authority domains. Query snippets are leads, not proof; the verifier must retrieve the underlying page before supporting a claim. [Brave Search API](https://api-dashboard.search.brave.com/api-reference/web/search/get).

Official-source coverage does not guarantee current or applicable evidence. Country pages can omit species exceptions, recent residence classifications, first-border entry requirements or certificate transition dates. Government export instructions can disagree with a destination's newer import notice. Save individual retrieval outcomes and flag conflicts instead of blending them into a confident answer.

Text-based authority PDFs are extracted with unpdf's serverless PDF.js build, using the same authority-host and redirect restrictions as HTML. Reads are bounded to 2 MB, 20 pages, 60,000 extracted characters and a six-second extraction deadline. External assets, evaluation, font loading and WASM are disabled. Scanned, encrypted, malformed and over-budget documents remain explicitly unread; an unread PDF is never evidence of support. [unpdf implementation and runtime documentation](https://github.com/unjs/unpdf).

## Comparison contract

Compare each material checklist statement against current source excerpts and the supplied journey context. Require a stable statement identifier, status, source identifiers and supporting quotation. Validate that each source was fetched successfully and that each quotation occurs in its extracted text. Exact quotation matching prevents fabricated evidence but does not prove semantic entailment: a small model can still select a real but irrelevant passage. Consequently the UI calls these automated checks and retains uncertainty about the animal's records and full legal eligibility.

Use explicit outcomes: supported by retrieved evidence, possible change, unclear, or unavailable. The worst relevant outcome controls the requirement-level presentation. Do not count an HTTP success as a supported requirement. Do not call extraction failures, inaccessible PDFs, model timeouts or schema failures complete verification.

The first live 4B-model test demonstrated why quotation validation alone is insufficient: it misread a negation and linked booking advice to an unrelated arrival-check quotation. The implementation isolates malformed claim rows, then makes an independent, compact confirmation call for proposed supported/changed verdicts using only the selected quotations and journey context. The initial label and rationale are withheld. Failed or disagreeing confirmation cannot retain a positive first-pass result or enter the cache.

Both calls use the same model, and the full-route audit demonstrated correlated errors even after seven isolated entailment controls passed. In particular, two checks misread “does not precede” and supported a multi-sentence vaccination statement using a quotation that covered only one condition. Consequently, all model-suggested changes remain **unclear** with a fixed provisional note; they are not cached or described as established regulatory changes. A conservative multi-clause detector also withholds positive support for sentences containing multiple conditions or connected assertions. Their source passages remain available for review. This deliberately reduces automated coverage until clause-by-clause evidence or stronger independent review is available. Simple statement support still requires both calls and exact evidence; it remains automated and fallible, not legal verification.

## Runtime and controls

The client POSTs journey facts and consumes streamed stage events. Stage transitions follow completed work. The final response always distinguishes source retrieval from model comparison and describes whether web search or official-link discovery ran. No user email, uploaded documents or identifying records are required for this workflow.

The server bounds body size, source bytes, redirects, fetch count, concurrency and model time. HTTPS authority allowlists protect against arbitrary fetch requests; validate every redirect destination and reject credentials, nonstandard ports and non-authority hosts. Fetched pages are untrusted content and must never become instructions, executable markup or tool definitions.

Cache comparison results only when their exact statements, source content digest, model and relevant scope match. Refetch sources on every request so the cache is invalidated by changed evidence. In-memory caching and rate controls apply only to one Worker instance and do not constitute a durable global abuse limit. A public high-volume release should use a provider/edge-wide quota and measured budget.

## Evaluation and release

Evaluate both species, direct and connecting routes, owner timing, changing ownership, multiple pets, US territory/history questions, EU document transition dates and difficult import pathways. Include unreachable sources, obsolete forms, conflicting pages, wrong-country citations, invented quotations, malformed JSON, cancellation and incomplete streams. Separate test doubles from live-provider observations in the release record.

The current design is suitable for assisted research and transparent preparation guidance. Automated evidence support is neither human review nor permission to travel. The source-derived regulatory report supplies the route-level findings and unresolved conflicts separately.

## Sources

Sources above were consulted on 12 September 2026. The regulatory companion report records authority-specific evidence and dates. No competitor source is treated as regulatory authority.
