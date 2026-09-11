# Cloudflare release: 12 September 2026

## Published release

- User explicitly requested publishing the revised Zurtex build to the existing GitHub repository and Cloudflare Worker, then approved the publishing connections.
- Repository: `LyCoda/zurtex`.
- Release branch: `codex/consultation-cloudflare-release`.
- Deployed runtime source: `977cbd711144eb7cc73996047f7c8f05a60337a6`.
- Worker: `zurtex-site`.
- Active Worker version: `972b962e-e775-45a3-8a48-5c06e59b7bab`.
- URLs: https://zurtex.org, https://www.zurtex.org and https://zurtex-site.natechu65.workers.dev.
- Prior pre-release rollback version: `12f58ca5-1bc5-4cc9-81de-787fc3135129`.

The existing direct Cloudflare build/deployment path was preserved. No new Worker, DNS zone, storage, paid infrastructure or automatic deployment pipeline was created. Existing Stripe secrets were preserved without reading their values. Local skills, tool hooks, generated screenshots and output folders were not committed.

## Verification and correction

47 tests, type checking and the Cloudflare production build pass. The initial live check exposed the global proxy overriding the API's stronger Referrer-Policy. Commit `977cbd7` fixes the proxy to use no-referrer, no-store and noindex/nofollow on API and consultation-booking responses. The corrected Worker was deployed and rechecked.

Live HTTP checks passed on both custom domains for the home page, consultation, About, methodology and cancelled booking return. Thirteen referenced stylesheet/script/font assets per home page returned 200. The original Who We Are headline remains present. The private booking page includes noindex/nofollow and no-referrer metadata; defensive response headers are also present after the correction. `/services` and `/ready-pack` redirect to `/consultation`.

A synthetic US-to-France relocation assessment returned 200, more-information-needed status, no invented earliest date and no draft research answer. Its no-store, no-referrer and noindex headers passed. Invalid checkout input was rejected with 400 without creating a Stripe session. No real or test authorisation, capture, cancellation, refund or customer message was performed during deployment.

## Deliberately unchanged limits

- `STRIPE_MODE=test` and `ZURTEX_LIVE_READY=false`. The hosted site has a matching existing test key and displays **Test checkout**; live payments are not enabled or verified.
- Consultation uses manual capture after human approval. No automatic approval, capture or scheduling was added.
- Detailed country research remains development-only. The public site provides cautious route questions and official sources until publication approval exists.
- Uploads, legacy paid-pack sales and legacy capture flags remain disabled.
- Staffed scheduling, secure records, legal operator details and live-payment verification remain separate operational launch requirements.

## Rollback

Use the existing Cloudflare account's Worker deployment history to restore `12f58ca5-1bc5-4cc9-81de-787fc3135129` if a release-breaking issue is confirmed. Inspect version bindings and current secrets before rollback; do not assume code rollback also reverts every account setting. Do not use the intermediate `7c87cd9e-929f-4053-9526-d6b4b5e26717` version, which predates the privacy-header correction. A rollback was prepared, not executed.
