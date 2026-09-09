/* oxlint-disable next/no-html-link-for-pages -- Native navigation avoids the deployed Vinext RSC Link runtime failure. */
import type { Metadata } from 'next';
import { PolicyPage, WaitNotice } from '@/components/marketing-shell';
export const metadata: Metadata = { title: 'Reservations | Zurtex' };
export default function PaymentsPage() {
  return (
    <PolicyPage
      title="Reservations. No funds captured."
      intro="Reserve a readiness check with a temporary US$7 card authorization. Zurtex releases the hold without capturing the funds."
      summary="US$7 temporary authorization. No completed charge. No subscription."
      sections={[
        ['price', 'Price & payment'],
        ['after-payment', 'After checkout'],
        ['refunds', 'Our refund promise'],
        ['other-requests', 'Other requests'],
        ['cancellation', 'Cancellation rights'],
      ]}
    >
      <section id="price">
        <h2>What Stripe authorizes</h2>
        <p>
          Stripe places a temporary <strong>US$7 authorization</strong> on your
          card to confirm the reservation. Zurtex does not capture the funds.
          There is no subscription or automatic renewal.
        </p>
        <p>
          You enter payment details on Stripe’s hosted checkout page. Zurtex
          does not receive or store your full card number or card security code.
          Stripe processes transaction, device and fraud-prevention information
          under its <a href="https://stripe.com/privacy">own privacy policy</a>.
        </p>
      </section>
      <section id="after-payment">
        <h2>After checkout, wait for us.</h2>
        <WaitNotice />
        <p>
          We receive limited reservation, contact and authorization information
          so we can identify your request and get in touch. A team member
          manually reviews your basic route details. Only if we accept the case
          will we send a separate secure upload link and tell you which records
          we need.
        </p>
        <p>
          We never ask for certificates, veterinary records, passports or
          identity documents through checkout or an ordinary email reply.
        </p>
      </section>
      <section id="refunds">
        <h2>We release the authorization.</h2>
        <p>
          Zurtex cancels the authorization without capturing it. Your bank may
          continue showing a pending hold until it processes the release.
        </p>
        <div className="refund-timeline">
          <div>
            <strong>Within 24 hours</strong>
            <span>
              Zurtex cancels the card authorization without capturing funds.
            </span>
          </div>
          <div>
            <strong>Usually 5–10 business days</strong>
            <span>
              Your bank or card issuer removes the pending hold. Timing varies.
            </span>
          </div>
        </div>
        <p>
          Because Zurtex does not capture the funds, there is normally no charge
          to refund. Contact your card issuer if a released hold remains visible.
        </p>
        <p>
          We’re sorry when we can’t help a pet owner. We’ll explain the
          boundary and, where practical, point you
          toward the relevant authority or specialist.
        </p>
      </section>
      <section id="other-requests">
        <h2>Something else went wrong?</h2>
        <p>
          If you see a completed charge rather than a pending authorization, email{' '}
          <a href="mailto:help@zurtex.org?subject=Refund%20request">
            help@zurtex.org
          </a>{' '}
          with your checkout email, payment reference if available, and a short
          explanation. We review requests fairly and respond promptly. Please
          don’t attach pet records or full card details.
        </p>
      </section>
      <section id="cancellation">
        <h2>Your cancellation rights</h2>
        <p>
          We honour statutory cancellation and withdrawal rights where they
          apply. Nothing here limits consumer rights or remedies that cannot
          lawfully be excluded.
        </p>
        <p>
          Where you ask us to begin work during an applicable withdrawal period,
          we request your express agreement. You acknowledge that any applicable
          withdrawal right may end once the service is fully performed with your
          prior agreement. Rights and any proportionate charge for work begun
          depend on applicable law.
        </p>
        <p>
          Read this policy alongside our{' '}
          <a href="/terms">Terms of Service</a>. Contact our team if you
          want to cancel.
        </p>
      </section>
    </PolicyPage>
  );
}
