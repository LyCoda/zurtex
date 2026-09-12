# Zurtex

Zurtex is a source-linked planning and preparation service for international travel with dogs and cats. A traveller supplies a route and a few journey details, then receives an ordered preparation guide with official-source links, timing questions, document prompts and clear limitations.

The current private beta includes:

- a concise dog-and-cat route search;
- structured research for 24 jurisdictions;
- streamed official-source verification progress;
- bounded HTML and text-PDF retrieval from approved authority domains;
- an optional small open-weight model for evidence comparison;
- printable preparation, veterinarian, document and source tools.

Zurtex is a planning aid. It does not approve travel, replace a veterinarian or authority, verify an animal's records, or guarantee airline acceptance.

## Local development

Requirements:

- Node.js 22.13 or newer
- pnpm

Install dependencies and start the development server:

```powershell
pnpm install
pnpm dev
```

Open `http://localhost:3000`. Copy `.env.example` to `.env.local` when local configuration is needed. Keep all keys server-side and never commit an environment file.

## Verification model

The application works without a connected model and labels its evidence comparison as limited. For local model-backed checks, run an OpenAI-compatible server and set:

```text
ZURTEX_VERIFICATION_PROVIDER=openai-compatible
ZURTEX_MODEL_BASE_URL=http://127.0.0.1:11435/v1
ZURTEX_VERIFICATION_MODEL=zurtex-qwen3-4b
```

Model weights and inference runtimes are deliberately excluded from this repository. The tested `Q4_K_M` file is hosted in the [LM Studio Community Qwen3-4B-Instruct-2507 GGUF repository](https://huggingface.co/lmstudio-community/Qwen3-4B-Instruct-2507-GGUF). It uses the Apache-2.0 Qwen3-4B-Instruct-2507 model through llama.cpp. See [the verification setup](docs/implementation/2026-09-12-verification-setup.md) for provenance, checksums, provider configuration and limitations.

## Validation

```powershell
pnpm test
pnpm typecheck
pnpm lint --quiet
pnpm build:cloudflare
```

The current change set passes 91 automated tests, type checking, linting and a Cloudflare production build. The [validation record](docs/implementation/2026-09-12-validation.md) separates automated tests, live observations and known limits.

## Deployment

Cloudflare configuration is defined in `wrangler.jsonc`. Deployment requires the intended Cloudflare account, its server-side secrets and an authorised Workers AI binding. Production deployment is a separate release action and is not performed by the local preparation workflow.
