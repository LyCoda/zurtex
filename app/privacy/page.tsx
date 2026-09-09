import type { Metadata } from 'next';
import { PolicyPage, WaitNotice } from '@/components/marketing-shell';
export const metadata: Metadata = { title: 'Privacy Notice | Zurtex' };
export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy, with care for your records."
      intro="Pet paperwork can contain personal details. We keep the request narrow and explain what happens to the information you share."
      summary="Basic journey details first. Documents only after acceptance, through a separate secure upload link. Never by ordinary email."
      sections={[
        ['operator', 'Who handles your data'],
        ['collect', 'What we collect'],
        ['purpose', 'Why we use it'],
        ['retention', 'Retention & deletion'],
        ['providers', 'Providers & transfers'],
        ['security', 'Security'],
        ['rights', 'Your rights'],
      ]}
    >
      <section id="operator">
        <h2>Who handles your information</h2>
        <p>
          This launch draft describes Zurtex’s intended handling of information
          when you visit, contact us, pay or request a readiness check. The
          operator’s legal name and business address will be added before paid
          public launch. Privacy questions go to{' '}
          <a href="mailto:help@zurtex.org?subject=Privacy%20request">
            help@zurtex.org
          </a>
          .
        </p>
      </section>
      <section id="collect">
        <h2>Only what the next step needs.</h2>
        <h3>Before a case is accepted</h3>
        <p>
          Basic route details include origin, destination, travel date,
          operating airline and whether you travel with a dog or cat. Stripe
          Checkout collects your payment and contact details; we receive the
          limited order and transaction information needed to confirm payment,
          contact you, issue refunds and handle disputes.
        </p>
        <h3>After a person accepts your case</h3>
        <p>
          Our representative sends a separate secure upload link and a specific
          records request. Requested vaccination, laboratory, certificate,
          veterinary or travel records can contain owner names, addresses and
          signatures. We receive those records only when you submit them through
          that link.
        </p>
        <WaitNotice />
        <p>
          Do not email passports, identity documents, certificates, veterinary
          or pet records, full payment details, passwords, or unrelated medical
          or financial information. We do not receive or store full card numbers
          or card security codes.
        </p>
      </section>
      <section id="purpose">
        <h2>Why we use your information</h2>
        <p>
          To screen your route, prepare and deliver the review, communicate with
          you, confirm payments and refunds, maintain necessary business
          records, secure the service and meet legal obligations.
        </p>
        <p>
          Where GDPR applies, performance of the service contract is the
          principal basis for intake and fulfilment. Legal obligations and
          assessed legitimate interests may support limited accounting, security
          and dispute records. We seek consent where required, including for any
          future optional marketing.
        </p>
        <p>
          Owner and pet documents are not used for marketing, profiling or
          unrelated research. Any future mailing list would use a separate
          opt-in and an unsubscribe option.
        </p>
      </section>
      <section id="retention">
        <h2>A short working life for documents.</h2>
        <p>
          Our proposed retention policy is to delete working copies of intake
          documents and their personal details from active systems{' '}
          <strong>within 24 hours after final delivery or a decline</strong>.
          This period must be verified across the selected upload, storage,
          email and device systems before document intake opens.
        </p>
        <p>
          Limited payment, accounting, tax, fraud, dispute and legal records may
          need to be retained separately under a documented schedule. They
          should contain only what is necessary. Stripe retains information
          under its own legal obligations and policies; deleting Zurtex’s
          working records does not delete information held independently by
          Stripe.
        </p>
        <p>
          Restricted backup copies expire on the provider’s secure expiry cycle.
          The maximum backup period and the separate business-record retention
          schedule will be published when the production systems are confirmed.
          We do not promise that every copy held by every provider disappears
          immediately.
        </p>
      </section>
      <section id="providers">
        <h2>Service providers and transfers</h2>
        <p>
          The website is prepared for Cloudflare hosting and Stripe payment
          processing. Secure file-transfer and email providers must be confirmed
          before document intake opens. Information is shared only with
          providers needed to operate the service or where disclosure is legally
          required.
        </p>
        <p>
          Customers, Zurtex and its providers may be in different countries.
          Where GDPR applies, a lawful transfer mechanism and appropriate
          processor terms are required. The final notice will identify the
          actual provider arrangements and relevant transfer safeguards.
        </p>
        <p>
          Read{' '}
          <a href="https://www.cloudflare.com/privacypolicy/">
            Cloudflare’s privacy policy
          </a>{' '}
          and <a href="https://stripe.com/privacy">Stripe’s privacy policy</a>{' '}
          for their own processing.
        </p>
      </section>
      <section id="security">
        <h2>Security, without exaggerated claims.</h2>
        <p>
          Document intake requires secure transfer and storage, access limited
          to team members who need the records, multi-factor authentication,
          deletion procedures and an incident-response process. Those controls
          must be verified before records are accepted. No system can be
          guaranteed completely secure.
        </p>
        <p>
          The approach is informed by GDPR and Hong Kong privacy principles,
          including collecting less and keeping information only as long as
          needed. This is not a claim of GDPR compliance or ISO certification.
          ISO/IEC 27001 and 27701 are management-system standards, not laws.
        </p>
      </section>
      <section id="rights">
        <h2>Your choices and rights</h2>
        <p>
          Depending on where you live, you may request access, correction,
          deletion, restriction or portability; object to certain processing;
          withdraw consent; or complain to a privacy regulator. Legal exceptions
          may apply.
        </p>
        <p>
          Email{' '}
          <a href="mailto:help@zurtex.org?subject=Privacy%20request">
            help@zurtex.org
          </a>
          . We may need enough information to verify a request without
          collecting unnecessary identity documents.
        </p>
      </section>
    </PolicyPage>
  );
}
