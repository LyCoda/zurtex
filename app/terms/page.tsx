import type { Metadata } from "next";
import { PolicyPage } from "@/components/marketing-shell";
export const metadata: Metadata = { title: "Consultation terms | Zurtex" };
const sections: [string, string][] = [
  ["free", "Free information"],
  ["consultation", "Consultation scope"],
  ["approval", "Approval and scheduling"],
  ["limits", "Service boundaries"],
  ["contact", "Contact"],
];
export default function TermsPage() {
  return (
    <PolicyPage
      title="Information and consultation terms"
      intro="Use the travel information independently, or choose a US$5 consultation for one planned journey."
      summary="Information is free. Consultation payment is collected only after human approval. Neither the guide nor a consultation approves your pet for travel."
      sections={sections}
    >
      <section id="free">
        <h2>Free information</h2>
        <p>
          Available route guidance, checklists, preparation tools, timing guidance and source links
          do not require a purchase. Research dates and gaps remain visible. Some detailed research
          is still held for verification; buying a consultation does not unlock withheld
          instructions or make a route approved.
        </p>
      </section>
      <section id="consultation">
        <h2>Consultation scope</h2>
        <p>
          The service includes a review of the journey details supplied, one call without a fixed
          time limit, and a written recap of next steps and unresolved questions. There is no fixed
          recap deadline. It does not include ongoing journey management or unlimited additional
          calls.
        </p>
        <p>
          Share accurate route and scheduling information. Do not put medical records, identity
          details or microchip numbers in the booking form. If records are needed, the team must
          arrange an appropriate secure channel separately.
        </p>
      </section>
      <section id="approval">
        <h2>Approval and scheduling</h2>
        <p>
          Checkout authorises a temporary US$5 hold while a person checks suitability. It is not
          acceptance or a confirmed appointment. We collect payment only after human approval and
          agree the call time with you directly. If we cannot help, we explain the limitation and
          release the hold.
        </p>
        <p>
          See the <a href="/payments-refunds">payment, cancellation and refund policy</a>. Test-mode
          checkout does not create a paid service order.
        </p>
      </section>
      <section id="limits">
        <h2>Service boundaries</h2>
        <p>
          Zurtex helps you understand and organise information. It does not give medical or legal
          advice, issue or validate certificates, determine fitness to fly, book transport, shorten
          mandatory waits, or guarantee boarding or entry. Your veterinarian, airline and government
          authorities make their own decisions.
        </p>
        <p>
          Rules can change. Check the official source for your precise route, pet and flight. A
          source-check date is not a guarantee that the rule is still current.
        </p>
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <p>
          Email <a href="mailto:help@zurtex.org">help@zurtex.org</a>. These are local-preview
          service terms. The legal operator identity, governing law and jurisdiction-specific
          consumer terms still need review before public launch.
        </p>
      </section>
    </PolicyPage>
  );
}
