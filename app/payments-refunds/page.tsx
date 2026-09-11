import type { Metadata } from "next";
import { PolicyPage } from "@/components/marketing-shell";
export const metadata: Metadata = { title: "Payments, cancellations & refunds | Zurtex" };
const sections: [string, string][] = [
  ["price", "The consultation"],
  ["hold", "Temporary payment hold"],
  ["changes", "Cancellation and rescheduling"],
  ["previous", "Previous purchases"],
  ["questions", "Questions"],
];
export default function PaymentsPage() {
  return (
    <PolicyPage
      title="Payments, cancellations and refunds"
      intro="Travel information is free. A Pet Travel Consultation costs US$5 for one planned journey."
      summary="A temporary payment hold comes first. A team member reviews the journey before payment is collected. The hold does not confirm an appointment."
      sections={sections}
    >
      <section id="price">
        <h2>The consultation</h2>
        <p>
          US$5 covers a personal review of the journey details, one consultation call with no fixed
          time limit, and a written recap. There is no fixed recap delivery deadline. This is not an
          ongoing journey-management service or unlimited follow-up consultations.
        </p>
        <p>
          The call time is agreed directly with you after review. Secure record uploads, transport
          bookings and certificates are not included in this website's booking flow.
        </p>
      </section>
      <section id="hold">
        <h2>Temporary payment hold</h2>
        <p>
          Stripe handles checkout and authorises US$5 without collecting it immediately. We collect
          the payment only after a person approves the consultation. If we cannot help, we explain
          why and cancel the authorisation.
        </p>
        <p>
          Holds have an expiry set by the payment network. If a hold expires uncaptured, it is
          released; it cannot be kept open indefinitely. Any new authorisation requires you to
          complete checkout again. Your bank controls when a released hold disappears from your
          account.
        </p>
        <p>
          When checkout is labelled as a test, it does not create a paid consultation. If the
          payment connection is unavailable, the site cannot place a hold.
        </p>
      </section>
      <section id="changes">
        <h2>Cancellation and rescheduling</h2>
        <p>
          To cancel before payment is collected, email help@zurtex.org with your booking reference
          and ask us to release the hold. Do not include card information.
        </p>
        <p>
          After acceptance, contact us before the agreed call if you need to cancel or change the
          time. We will discuss the available options with you. If Zurtex cannot deliver an accepted
          consultation, we will arrange a refund. No automatic fee or response-time promise is
          stated here.
        </p>
        <p>
          Refunds and released authorisations are different: a refund returns a collected payment,
          while release removes an uncaptured hold. Your bank's processing time can vary. Nothing
          here limits rights that apply under consumer law.
        </p>
      </section>
      <section id="previous">
        <h2>Previous purchases</h2>
        <p>
          This new offer does not replace an existing customer's agreed purchase terms. Contact us
          with your previous order reference so we can honour the service or agree a resolution.
          Historical test authorisations continue to be released under their original workflow.
        </p>
      </section>
      <section id="questions">
        <h2>Questions</h2>
        <p>
          Email <a href="mailto:help@zurtex.org">help@zurtex.org</a>. Operator identity,
          jurisdiction-specific rights and final service policies require review before public
          launch.
        </p>
      </section>
    </PolicyPage>
  );
}
