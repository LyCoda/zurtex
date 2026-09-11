import type { Metadata } from "next";
import { ArrowRight, Mail, ShieldAlert } from "lucide-react";
import { MarketingPage } from "@/components/marketing-shell";

export const metadata: Metadata = { title: "Contact | Zurtex" };

export default function ContactPage() {
  return (
    <MarketingPage
      title="Questions and corrections are welcome."
      intro="Email Zurtex about a booking, an official-source correction or the product. To start a consultation, use the booking page. Do not email identity or veterinary documents."
      aside={
        <div className="contact-panel">
          <Mail size={25} />
          <a href="mailto:help@zurtex.org">
            help@zurtex.org <ArrowRight size={17} />
          </a>
          <p>No response-time promise applies during private beta.</p>
        </div>
      }
    >
      <section className="contact-guidance">
        <div>
          <h2>For a consultation</h2>
          <p>
            Start your booking online. If you already have a booking, include its reference in your
            email, not payment details or pet records.
          </p>
          <a className="text-link" href="/consultation#book">
            Book my consultation <ArrowRight size={17} />
          </a>
          <h2>For source corrections</h2>
          <p>
            Include the affected country or airline and a link to the competent authority or
            operating carrier. Explain what appears outdated or incomplete.
          </p>
        </div>
        <div className="document-warning">
          <ShieldAlert size={24} />
          <div>
            <h2>Keep documents out of email</h2>
            <p>
              Do not attach passports, microchip records, vaccination certificates, identity
              documents or full itineraries. Secure uploads are not available.
            </p>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
