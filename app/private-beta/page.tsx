import type { Metadata } from "next";
import { BetaRequestForm } from "@/components/beta-request-form";
import { MarketingPage } from "@/components/marketing-shell";

export const metadata: Metadata = {
  title: "Private Beta | Zurtex",
  description: "Hear about improvements to the free Zurtex route guide.",
  robots: { index: false, follow: true },
};

export default function PrivateBetaPage() {
  return (
    <MarketingPage
      title="Help shape a clearer route guide."
      intro="Try the free information and tell us what would make planning easier. This beta news list is separate from consultation bookings."
      variant="private-beta-page"
      aside={<BetaRequestForm compact />}
    >
      <section className="beta-expectations">
        <div>
          <h2>What happens now</h2>
          <p>
            The request opens your email app with a pre-filled message to Zurtex. We may reply about
            research or early access. There is no automated marketing database, purchase, service
            order or guaranteed place.
          </p>
        </div>
        <div>
          <h2>What does not happen</h2>
          <ul>
            <li>No payment or card authorisation.</li>
            <li>No document upload or medical-record collection.</li>
            <li>No promise of human review or delivery.</li>
            <li>No travel approval or booking decision.</li>
          </ul>
        </div>
      </section>
    </MarketingPage>
  );
}
