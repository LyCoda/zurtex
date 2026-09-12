# Running the new Zurtex results

This change adds an expanded journey guide, streamed source-checking progress, HTML and text-PDF retrieval, and a small-model evidence comparison. The ordinary route composer remains deterministic. Automated checks qualify its statements; they do not rewrite the country library or approve travel.

## Local model installed for this task

The tested local runtime is stored outside the repository in the developer's model cache. It uses the `Qwen3-4B-Instruct-2507-Q4_K_M.gguf` weights from the [LM Studio Community GGUF repository](https://huggingface.co/lmstudio-community/Qwen3-4B-Instruct-2507-GGUF) and the official llama.cpp b10927 CUDA build. The original model is published by [Qwen under Apache 2.0](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507). The cache directory contains publisher metadata, SHA-256 checks, runtime logs and three PowerShell helpers:

- `start-zurtex-model.ps1`: starts the loopback model server in a hidden window.
- `test-zurtex-model.ps1`: runs a small grounding smoke test. This is a connectivity test, not a regulatory benchmark.
- `stop-zurtex-model.ps1`: stops this model process and releases its GPU memory.

The endpoint is `http://127.0.0.1:11435/v1`; the model name is `zurtex-qwen3-4b`. No local API key is required. It is not exposed to the network and no startup service was installed. Downloaded archives, weights and extracted runtime use approximately 4 GB of disk. The initial 24,576-token configuration used roughly 4.5 GiB of additional GPU memory on this machine. Actual usage varies with context and other applications.

The weights and runtime are intentionally outside the repository. Another developer must supply a compatible model server or configure the hosted provider. A public Cloudflare Worker cannot reach this laptop's localhost endpoint.

## Preview the production build with the local model

From the project folder in PowerShell, start the model with its helper, then run:

```powershell
node scripts/cloudflare.mjs build
$env:ZURTEX_VERIFICATION_PROVIDER = 'openai-compatible'
$env:ZURTEX_MODEL_BASE_URL = 'http://127.0.0.1:11435/v1'
$env:ZURTEX_VERIFICATION_MODEL = 'zurtex-qwen3-4b'
$env:PORT = '3003'
node scripts/preview-local.mjs
```

Open `http://localhost:3003`. The preview helper removes the hosted AI binding from a generated local configuration and supplies only these non-secret settings. It does not deploy the site or write API keys. A normal development server can use the same three model variables. `.env.example` documents both the tested llama.cpp configuration and an Ollama alternative.

Each submitted journey makes real requests for relevant authority pages. Source links discovered on those pages work without a search key. The local model then compares the retrieved passages with the displayed research statements. Lack of a source, model failure or disagreement remains visible. Preparation checkboxes are page-session state only; they do not persist user records or establish eligibility.

## Hosted configuration

`wrangler.jsonc` prepares an `AI` binding with default model `@cf/ibm-granite/granite-4.0-h-micro`. The existing account login did not permit a direct AI inference smoke test in this task, so hosted inference remains unvalidated. Before releasing, validate the binding on the intended account and set provider-wide usage controls. No new cloud credentials, paid service or production deployment was created here.

The server also accepts `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_AI_API_TOKEN` when a native binding is unavailable, or an explicitly configured HTTPS OpenAI-compatible provider. Supply secrets through the deployment's secret store. Never use `NEXT_PUBLIC_` variables or browser-supplied endpoint/key values.

For targeted web-index discovery, configure `BRAVE_SEARCH_API_KEY` server-side. Without it, the product truthfully reports **Official source links** as its discovery method. It must not claim that a general web search ran. Search snippets are never accepted as evidence; the underlying authority page must be read.

`ZURTEX_RESEARCH_RESULTS_ENABLED=true` exposes source-linked research previews in the built app. This flag does not confer editorial approval: dossier approval fields remain unchanged, and incomplete evidence remains marked. To disable detailed research presentation outside development, remove the exact `true` opt-in.

## Evidence and operational limits

- Every request refetches its selected official pages. Only grounded comparisons may be cached, for 15 minutes in one process, bound to the full response digest, statements, journey scope, prompt version and model.
- The workflow has finite source, text, model and total-time budgets. Some authorities block automation. Text-PDF support excludes scanned, encrypted, oversized and unreadable documents.
- The model has no tools. Code controls discovery, authority allowlists, redirects and parsing. Source-page instructions are untrusted data.
- Structured output and exact quotations establish provenance, not regulatory truth. Independent confirmation of proposed model conclusions reduces obvious entailment errors; a human must still resolve flagged conditions and conflicts.
- Rate and concurrency controls are per running instance. They are not a substitute for deployment-wide quotas or account-level spend controls.
- Data coverage, live source retrieval, model comparison and human review are distinct. A composed country pair is not a fully verified legal pathway.

See the accompanying [architecture research](../research/2026-09-12-verification-architecture.md), [regulatory research](../research/2026-09-12-live-verification-regulatory-research.md) and [design review](../design/2026-09-12-results-finish-review.md).
