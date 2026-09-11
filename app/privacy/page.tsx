import type { Metadata } from "next";
import { PolicyPage } from "@/components/marketing-shell";
export const metadata: Metadata = { title: "Privacy | Zurtex" };
const sections: [string, string][] = [
  ["free-guide", "Free route guide"],
  ["booking", "Consultation booking"],
  ["documents", "Documents and records"],
  ["email", "Email and service records"],
  ["rights", "Questions and requests"],
];
export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy notice"
      intro="Read the free guide without an account. Share only the basics needed for a consultation booking."
      summary="The guide does not need your email. Booking details and payment information are handled separately, with no medical-document upload in this website."
      sections={sections}
    >
      <section id="free-guide">
        <h2>Free route guide</h2>
        <p>
          The route form sends journey fields to Zurtex to generate your result: countries, dates,
          species, pet count, travel purpose, accompaniment and timing, travel mode, and optional
          airline or transit details. No name or email is required. The guide and document-status
          notes stay in the current page, not a customer account; leaving, refreshing or editing the
          journey clears them.
        </p>
      </section>
      <section id="booking">
        <h2>Consultation booking</h2>
        <p>
          When you continue to checkout, the journey basics, pet count, purpose, airline,
          connections and preferred call times are sent to Zurtex and stored with the Stripe
          booking/payment record so the team can check suitability and arrange the consultation.
          Stripe collects your contact and payment details in its hosted checkout. This website does
          not receive your full card number.
        </p>
        <p>
          A secure, HTTP-only cookie holds the checkout reference for up to 30 days so the same
          browser can check payment status. It is not a customer account. Avoid sharing your
          checkout or return link.
        </p>
        <p>
          If checkout is not configured, no Stripe booking or payment record is created. Test-mode
          checkout uses Stripe's test environment.
        </p>
      </section>
      <section id="documents">
        <h2>Documents and records</h2>
        <p>
          Do not enter veterinary details, identity numbers or microchip numbers in the booking
          fields, or email medical or identity records. This website has no document-upload
          facility. If records are needed for an accepted consultation, the team must arrange a
          separate secure method and explain access and retention before collection.
        </p>
      </section>
      <section id="email">
        <h2>Email and service records</h2>
        <p>
          Messages you choose to email to help@zurtex.org are used to respond and manage your
          request. The separate beta-news form only prepares an email in your own application; it is
          not a consultation booking. Hosting, email and payment providers also process technical
          and transaction records needed to deliver and secure their services.
        </p>
      </section>
      <section id="rights">
        <h2>Questions and requests</h2>
        <p>
          For privacy, correction or deletion requests, contact{" "}
          <a href="mailto:help@zurtex.org">help@zurtex.org</a>. The legal operator, full provider
          list, retention periods and applicable privacy rights must be finalised before public
          launch. Some transaction records may need to be retained under applicable obligations.
        </p>
      </section>
    </PolicyPage>
  );
}
