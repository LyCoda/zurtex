/* oxlint-disable next/no-html-link-for-pages -- Native navigation avoids the deployed Vinext RSC Link runtime failure. */
import type { Metadata } from 'next';
import { PolicyPage, WaitNotice } from '@/components/marketing-shell';
export const metadata: Metadata = { title: 'Terms of Service | Zurtex' };
export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of service. Clear from the start."
      intro="What our readiness check covers, what we ask of you, and where the final decisions belong."
      summary="A human-prepared administrative review for one journey. It is not a certificate, veterinary opinion or travel approval."
      sections={[
        ['agreement', 'The agreement'],
        ['service', 'Our service'],
        ['acceptance', 'Acceptance'],
        ['responsibilities', 'Your responsibilities'],
        ['delivery', 'Delivery & changes'],
        ['payment', 'Payment & cancellation'],
        ['rights', 'Rights & liability'],
        ['contact', 'Contact & disputes'],
      ]}
    >
      <section id="agreement">
        <h2>The agreement</h2>
        <p>
          These draft terms cover the Zurtex website and International Pet
          Travel Readiness Check. The operator’s legal entity, geographic
          business address, governing law and dispute forum must be finalised
          before paid public launch.
        </p>
        <p>
          By ordering, you confirm that you have read these terms and the{' '}
          <a href="/privacy">Privacy Notice</a> and are at least 18 years
          old or otherwise legally able to enter the contract.
        </p>
      </section>
      <section id="service">
        <h2>What you are buying</h2>
        <p>
          An administrative, informational review of the route, itinerary and
          pet records you supply, compared with official sources available on
          the review date. We organise apparent requirements, timing issues and
          questions for your veterinarian, airline or government authority.
        </p>
        <p>
          This is preliminary and specific to your facts. It is not a health
          certificate, permit, veterinary or legal opinion, customs service,
          booking, transport service or official approval. We cannot guarantee
          endorsement, boarding, entry, quarantine release, return travel or
          third-party decisions.
        </p>
        <h3>Using your readiness check</h3>
        <p>
          You may share it with your veterinarian, airline or relevant authority
          to prepare the named journey. You may not resell or publish it, or
          represent it as an official certificate or approval.
        </p>
      </section>
      <section id="acceptance">
        <h2>When we accept a case</h2>
        <p>
          The initial service is for individual owners on noncommercial
          international journeys with a dog or cat. We may decline before or
          after payment if a route cannot be checked responsibly, time is
          insufficient, material information is missing, rules are unclear or
          specialist services are required.
        </p>
        <WaitNotice />
        <p>
          If we decline a paid case before delivering a substantive review, our{' '}
          <a href="/payments-refunds">
            full service-scope refund promise
          </a>{' '}
          applies.
        </p>
      </section>
      <section id="responsibilities">
        <h2>What we need from you</h2>
        <ul>
          <li>
            Accurate, complete and legible information, including every transit
            point, operating carrier and relevant travel date.
          </li>
          <li>Prompt notice when your plans or pet details change.</li>
          <li>
            Official advice, examinations, documents, permits and final
            confirmation from authorised professionals and authorities.
          </li>
          <li>
            Genuine, lawfully obtained records, submitted only through the
            secure link we provide after acceptance.
          </li>
        </ul>
        <p>
          Do not use the review to claim official approval or mislead an
          airline, veterinarian, authority or anyone else.
        </p>
      </section>
      <section id="delivery">
        <h2>Timing and changes</h2>
        <p>
          We aim to deliver within 24–48 hours after acceptance and complete
          intake. Incomplete, illegible or changed information may extend that
          estimate. Payment alone does not start the delivery clock.
        </p>
        <p>
          A review reflects sources and facts on its stated date. Changes to the
          route, airline, date, pet, movement type or official requirements may
          need a new review, with any new fee disclosed before purchase.
          Third-party rules, capacity, websites and decisions are outside our
          control.
        </p>
        <p>
          We take reasonable steps to restore interrupted website access, but
          cannot promise uninterrupted availability.
        </p>
      </section>
      <section id="payment">
        <h2>Payment, cancellation and ending work</h2>
        <p>
          The price and currency are shown before payment through Stripe
          Checkout. The{' '}
          <a href="/payments-refunds">Payments & Refunds Policy</a>{' '}
          applies alongside mandatory consumer rights.
        </p>
        <p>
          You may contact us to cancel. Statutory rights and any charge for work
          already done depend on applicable law and checkout disclosures. Where
          relevant, we collect express permission to begin personalised work
          during a withdrawal period.
        </p>
        <p>
          We may stop work if continuing would be unsafe, unlawful, misleading
          or outside scope. We explain the decision and apply the refund policy.
        </p>
      </section>
      <section id="rights">
        <h2>Your rights remain protected.</h2>
        <p>
          Nothing here excludes liability or rights that cannot lawfully be
          excluded. Subject to that protection, Zurtex is not responsible for
          losses caused by inaccurate or incomplete customer information,
          changes after the source check, missed appointments or deadlines
          outside our control, or third-party decisions.
        </p>
        <p>
          Any jurisdiction-specific limitations must be reviewed for the actual
          operator and customer countries before public launch. We do not invent
          a liability cap or remove mandatory consumer remedies.
        </p>
        <h3>Updates to these terms</h3>
        <p>
          Material changes will be dated and posted before applying to new
          purchases. The version shown when you order governs that order unless
          a mandatory legal change applies.
        </p>
      </section>
      <section id="contact">
        <h2>Let’s try to put it right.</h2>
        <p>
          Contact <a href="mailto:help@zurtex.org">help@zurtex.org</a> first so
          our small team can help resolve a concern. Final governing-law and
          dispute provisions will preserve any mandatory consumer rights and
          forums.
        </p>
      </section>
    </PolicyPage>
  );
}
