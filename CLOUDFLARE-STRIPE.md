# Zurtex on Cloudflare + Stripe

The site uses React/Vinext and runs on Cloudflare Workers with static assets. All six subpages share the original landing page's design system. The existing private Sites preview remains a separate publishing target.

## Local preview

Use Node 22.13+ and the pinned pnpm dependencies. Run `pnpm install --frozen-lockfile`, then `pnpm dev`. Open the URL printed by the server.

## Deploy to your Cloudflare account

1. Run `pnpm exec wrangler login` and select your Cloudflare account.
2. Run `pnpm build:cloudflare`. This omits the Sites publishing plugin and builds the standalone Worker configured in `wrangler.jsonc`.
3. Optional deployment verification: `pnpm exec wrangler deploy --config dist/server/wrangler.json --dry-run`.
4. Run `pnpm deploy:cloudflare` to build and deploy. The script uses the generated Worker config, so it includes the server and static assets. Do not upload only the client folder to Pages: the Stripe API routes need the Worker.
5. In Cloudflare Workers → zurtex → Settings → Domains & Routes, connect your actual domain. Set ZURTEX_SITE_URL to its HTTPS origin. Keep that value in `wrangler.jsonc` vars as well so a later deploy preserves it. The domain has deliberately not been guessed.

`wrangler.jsonc` pins a compatibility date supported by the locked local Workers runtime. Use `pnpm preview:cloudflare` after a Cloudflare build to test the production bundle locally.

## Connect Stripe

The website does not collect card details. Hosted Checkout and API keys stay server-side. No Stripe key is required in the browser and no paid account data has been created by this work.

1. Create a restricted **test** API key in your Stripe account. Grant Checkout Sessions create/read and the permissions required for inline Products/Prices and Payment Intents. Verify the final permission set in sandbox; do not substitute an unrestricted live key to fix permissions.
2. Store it as the Cloudflare Worker secret STRIPE_SECRET_KEY with `pnpm exec wrangler secret put STRIPE_SECRET_KEY --name zurtex`. Enter the key at the prompt. Never put it in client code or Git. For local development, copy `.env.example` to ignored `.dev.vars` and add the test key there.
3. Keep STRIPE_MODE=test and ZURTEX_LIVE_READY=false. Set ZURTEX_SITE_URL to the actual local or deployed origin. Configure Stripe Dashboard business support, privacy and terms URLs; hosted Checkout requires your Terms of Service URL when terms consent is enabled.
4. Enable successful payment email receipts and team payment notifications in Stripe. Preview a real sandbox receipt and confirm the payment description and business details appear correctly. PaymentIntent and product descriptions contain the wait-for-team instruction, but receipt templates are Stripe-controlled. Check this explicitly before launch.
5. Test a successful payment, cancellation/back navigation, decline, delayed payment if enabled, duplicate-request retry and full refund. Client-side confirmation never accepts a case; the Stripe Dashboard payment is the staff's source of truth even if the customer closes their browser.
6. Only after the launch checklist is resolved, replace the test secret with a restricted live key and set STRIPE_MODE=live and ZURTEX_LIVE_READY=true. Both are required for live checkout. Live return URLs must use HTTPS. Redeploy or apply updated variables in Cloudflare, and retain matching non-secret values in your config.

The price is server-owned at US$7, one-time. No payment_method_types override, subscription, automatic renewal or unverified automatic-tax setting is added. An attempt ID makes retries idempotent. Terms/early-service acknowledgement and policy version are stored in Session and PaymentIntent metadata. Status verification checks mode, currency, amount, service marker and payment status, requires the original browser's HttpOnly cookie, sends no contact details back, and does not cache the result.

## Manual fulfilment: the intended small-team workflow

A webhook/database/upload portal is not necessary for this manually operated version and is not represented as implemented. Staff must monitor successful payments directly in Stripe, including customers who do not return from checkout. Do not treat a success URL, an unpaid Session or the metadata label alone as proof of payment.

1. Open the successful payment in Stripe; verify paid status, amount, route metadata and the checkout email. Acknowledge the order with the exact instruction: “Payment is not acceptance. Stop and wait for our team. Do not send documents until a Zurtex representative sends your secure upload link.”
2. Manually assess scope using current official sources. Accept only supportable cases. Payment does not constitute acceptance.
3. If declining, initiate the full refund within 24 hours of the decision, to the original payment. Handle it in Stripe; no unauthenticated refund API exists on this website.
4. If accepting, send a separate secure upload link from the approved production file-transfer provider with the precise records required. Never ask for email attachments.
5. Deliver the human review within the stated target after complete intake, then apply the verified retention procedure.

If volume later requires automatic staff alerts or order tracking, add a Stripe signature-verified webhook and a durable, idempotent order store before automating fulfilment. Do not automate acceptance from checkout events.

## Launch facts still required

The provided Word document is a policy draft, and its internal action notes were treated as source context, not as new user instructions. No company, address, jurisdiction or certification has been invented.

- Confirm the legal entity and geographic address; finalise jurisdiction/dispute provisions and appropriate legal review. Replace the clearly marked draft policy text.
- Select actual secure file-transfer and email providers, processor agreements and transfer safeguards. Implement and test access control, MFA, deletion in active systems within 24 hours, backup expiry, and the limited transaction/security record schedule. Upload intake remains closed until these controls work.
- Confirm the monitored help@zurtex.org mailbox, Stripe business identity, support details and manual payment notification workflow.
- Complete live sandbox payment/receipt/refund tests. No connected Stripe credential was available during implementation, so tests here do not claim a real Stripe transaction.
- Tax treatment and statutory withdrawal disclosures depend on the actual operator and customer jurisdictions. No unverified compliance or tax claim is enabled.

## References

- Cloudflare Vite deployment: https://developers.cloudflare.com/workers/vite-plugin/get-started/
- Stripe Checkout: https://docs.stripe.com/api/checkout/sessions/create
- Stripe refunds: https://docs.stripe.com/refunds
- Requested design-system reference: https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/airbnb
- Requested critique/polish workflow: https://github.com/pbakaus/impeccable
- About photograph: Thomas de Fretes, https://unsplash.com/photos/a-dog-and-a-cat-sitting-on-the-floor-OOUlnUvZniU (Unsplash License; companionship, not a photo of the founders).
