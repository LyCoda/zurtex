import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing-shell";
import { ConsultationStatus } from "@/components/consultation-status";
export const metadata: Metadata = {
  title: "Consultation booking | Zurtex",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default function BookingPage() {
  return (
    <MarketingPage
      title="Your consultation booking"
      intro="A clear place to check the payment hold and what happens next."
      variant="consultation-status-page"
    >
      <ConsultationStatus />
    </MarketingPage>
  );
}
