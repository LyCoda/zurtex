/* oxlint-disable next/no-html-link-for-pages -- Native navigation avoids the deployed Vinext RSC Link runtime failure. */
import type { Metadata } from 'next';
import { PolicyPage, WaitNotice } from '@/components/marketing-shell';
export const metadata: Metadata = { title: 'Payments & Refunds | Zurtex' };
export default function PaymentsPage() {
  return (
    <PolicyPage
      title="Payments & refunds. A fair promise."
      intro="One readiness check, one payment. And if we can’t responsibly help with your route, your full service fee comes back to you."
      summary="US$7 launch price. No subscription. A full refund if our team cannot review your paid case."
      sections={[
        ['price', 'Price & payment'],
        ['after-payment', 'After checkout'],
        ['refunds', 'Our refund promise'],
        ['other-requests', 'Other requests'],
        ['cancellation', 'Cancellation rights'],
      ]}
    >
      <section id="price">
        <h2>What you pay</h2>
        <p>
          The initial readiness check costs{' '}
          <strong>US$7 at launch, reduced from US$14</strong>. The total price
          and currency are shown before you pay. There is no subscription or
          automatic renewal.
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
          We receive limited order, contact and payment-confirmation information
          so we can identify your purchase and get in touch. A team member
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
        <h2>If we can’t help, we refund you.</h2>
        <p>
          If our manual review shows that we cannot responsibly deliver a
          substantive readiness check for your route, we approve and initiate a{' '}
          <strong>full refund within 24 hours of that decision</strong>.
        </p>
        <div className="refund-timeline">
          <div>
            <strong>Within 24 hours</strong>
            <span>
              Zurtex initiates the refund after deciding the case is outside
              scope.
            </span>
          </div>
          <div>
            <strong>Usually 5–10 business days</strong>
            <span>
              Your bank or card issuer credits the original payment method.
            </span>
          </div>
        </div>
        <p>
          The refund goes through Stripe to your original payment method. A card
          refund cannot be redirected to a different card or bank account. A
          recent charge may disappear as a reversal instead of appearing as a
          separate credit. Bank timing varies; see{' '}
          <a href="https://docs.stripe.com/refunds">Stripe’s refund guidance</a>
          .
        </p>
        <p>
          We’re sorry when we can’t help a pet owner. We’ll explain the
          boundary, return the full service fee and, where practical, point you
          toward the relevant authority or specialist.
        </p>
      </section>
      <section id="other-requests">
        <h2>Something else went wrong?</h2>
        <p>
          We also provide a full refund for a duplicate charge or confirmed
          payment error. If the delivered service wasn’t as described, email{' '}
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
