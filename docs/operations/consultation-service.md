# Pet Travel Consultation: operations and launch handoff

Decision date: 12 September 2026. Source: the supplied zurtex-consultation-service-draft.pdf plus the user's subsequent explicit override. This is an operating runbook, not evidence that staffing, payments or records intake are live.

Deployment update: the revised site is now on the existing Cloudflare Worker and custom domains. The hosted environment retains an existing matching Stripe test key and shows Test checkout; live payments remain disabled. This supersedes the initial local-only connection state below, not the operational launch dependencies. See [the release record](../audits/2026-09-12-cloudflare-release.md).

## Confirmed offer

- US$5 for one planned journey, with a personal review, one call without a fixed time limit, and a written recap without a fixed delivery deadline.
- All available route information and preparation tools stay free. Coverage/approval limitations remain visible.
- No enquiry-preparation form. Booking details lead to Stripe authorisation, then human review before collection. Call time is agreed directly, not chosen from fictional availability.
- No certificates, medical advice, transport booking, ongoing journey management or unlimited follow-up calls.
- Retain the original Who We Are story from commit 4808709. Do not replace it with the PDF's adapted version.

## Human review and payment

1. In the existing Stripe account, find the consultation Checkout/PaymentIntent identified by workflow `consultation_manual_review_v1`. Its metadata contains the route basics and preferred call availability; hosted Checkout supplies contact information.
2. Confirm US$5 / USD / manual capture. Review the journey, service suitability and actual reviewer capacity. Resolve missing scope facts without requesting medical records by email.
3. Check the actual authorisation expiry in Stripe, including `capture_before` for cards. Calls and recap timing do not extend a card hold. Never use automatic delayed capture or capture merely to prevent expiry.
4. If suitable, record the review decision in the payment's metadata/operational record, notify the customer of acceptance, and capture US$5 in the authenticated Stripe Dashboard. Agree the call time directly. Payment received is not itself an appointment confirmation.
5. If unsuitable, explain the limitation before collecting payment and cancel the uncaptured authorisation. If it already expired, no capture is possible; do not charge again without a new customer-authorised checkout. Refund any collected payment that must be returned, rather than calling it a released hold.
6. Arrange any necessary records via an approved secure channel with purpose, authorised access and retention/deletion rules. No upload feature exists in this build.
7. Conduct the conversation and provide the written recap with unresolved vet/airline/authority questions. Honour the stated scope and any separately agreed timing.

Stripe's [authorise-and-capture documentation](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method) confirms that manual capture keeps authorisation separate from collection and that uncaptured authorisations expire. Use the actual payment's deadline rather than assuming an indefinite or uniform hold. The integration excludes Affirm, Afterpay/Clearpay and Klarna because some instalment methods can take an upfront payment during authorisation.

## Launch dependencies and present state

- Local credentials are absent; the Stripe connector returned not connected. No actual Stripe authorisation, capture, cancellation, refund or customer message was sent in this task.
- Use the existing Stripe account. Supply credentials through ignored local configuration or the host's secret store, never chat/source control. `.env.example` documents names only. Prefer a restricted key with the needed Checkout/read permissions; operator capture occurs in the Dashboard.
- `CONSULTATION_BOOKING_ENABLED` is true. The old pack/reservation flags stay false. Stripe test mode and `ZURTEX_LIVE_READY=false` remain until an authorised, verified live launch.
- Configure the correct public site/terms links in the Stripe account, a verified webhook endpoint and appropriate payment methods. Test the hosted form, return cookie, pending/declined/expired/captured/refunded states and live-mode separation before public launch.
- Confirm staffing and an actual scheduling/contact process. There is no automated email or calendar integration in this build. Metadata is a review queue only if the team actively monitors it.
- Finalise legal operator identity, applicable consumer/privacy terms, cancellation/rescheduling handling, retention and secure record intake. These pages are local-preview drafts, not a completed legal compliance review.
- Existing purchase terms are not retroactively replaced. Honour them or agree a resolution; retain historical US$7 hold-release handling.
- Do not publish detailed country research merely because a consultation is paid. Publication approval remains separate.

## Manual communication templates

These are proposed templates, not sent emails. Replace bracketed fields only with verified facts. Never send an acceptance or booking confirmation just because Stripe redirects successfully.

### Hold received, review pending

We have received your consultation booking details for [route]. Your US$5 payment is authorised, not collected. A team member will check whether we can help before approving the consultation. Your preferred time is not yet reserved. Please do not email veterinary or identity records.

### Accepted, arrange the call

We can help you talk through [confirmed scope] for [route]. We have approved your consultation and [collected / will collect] the US$5 payment. Can you speak at [verified time and time zone]? The call is confirmed only after we agree the time. There is no fixed call-length limit; we will send a written recap without a fixed delivery deadline.

### Unable to help

After reviewing [route], we cannot responsibly cover [specific limitation]. We have [cancelled the authorisation / confirmed it expired] and have not collected payment. [Suitable official contact or specialist direction, if verified.] Your bank controls when a released hold disappears.

### Written recap

Thank you for talking through your journey with us. Your next steps are [actions and responsible person]. The questions still needing an official answer are [questions, authority and source links]. This recap helps you prepare; it does not certify documents or guarantee boarding or entry.
