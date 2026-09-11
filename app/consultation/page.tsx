import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { MarketingPage } from "@/components/marketing-shell";
import { ConsultationBookingForm } from "@/components/consultation-booking";
import { countries } from "@/lib/route-coverage";
import { createStripeClient, stripeMode } from "@/lib/stripe";
import { isFeatureEnabled } from "@/lib/feature-policy";

export const metadata: Metadata = {
  title: "Pet Travel Consultation | Zurtex",
  description:
    "Free pet travel information, with optional US$5 personal consultation. A journey review, a conversation without a fixed time limit and a written recap.",
};
export const dynamic = "force-dynamic";

export default function ConsultationPage() {
  return (
    <MarketingPage
      title="A little support for a big journey."
      intro="Our pet travel information is yours to explore at your own pace. When you would like to talk it through, a consultation gives you time with a real person to look at your journey and make sense of what comes next."
      variant="consultation-page"
      aside={
        <aside className="consultation-offer" aria-label="Consultation price and scope">
          <h2>Pet Travel Consultation</h2>
          <p className="consultation-price">
            US$5 <span>for one planned journey</span>
          </p>
          <ul>
            <li>A personal review of your journey</li>
            <li>A call with no fixed time limit</li>
            <li>A written recap of your next steps</li>
          </ul>
          <a className="primary-button" href="#book">
            Book my consultation <ArrowRight size={18} />
          </a>
          <p className="section-footnote">
            A temporary hold first. Payment only after human approval. Call time agreed with you; no
            fixed recap deadline.
          </p>
          <a className="text-link" href="/#route-screen">
            Explore my route for free <ArrowRight size={17} />
          </a>
        </aside>
      }
    >
      <section className="consultation-included">
        <div>
          <h2>A helpful second set of eyes.</h2>
          <p>
            Having the information does not always make the next step obvious. We can help you work
            through the dates, understand which records to check and prepare your questions for the
            vet or airline.
          </p>
        </div>
        <div>
          <h3>Support, not a gate to the information.</h3>
          <p>
            Available route guidance, preparation steps, document checklists, timing guidance and
            official links stay free. A consultation is optional. Source dates and gaps remain
            visible, whether or not you book.
          </p>
          <p>
            We do not issue certificates, book transport, provide medical advice, guarantee boarding
            or entry, or manage the journey for you.
          </p>
        </div>
      </section>
      <section className="consultation-process" aria-labelledby="consultation-process-title">
        <h2 id="consultation-process-title">From your questions to your next steps.</h2>
        <ol>
          <li>
            <strong>Explore your route</strong>
            <p>
              Read the free guidance and official sources. Keep the questions you want to talk
              through.
            </p>
          </li>
          <li>
            <strong>Start your booking</strong>
            <p>
              Share the journey basics and preferred call times, then authorise US$5 through Stripe.
              This places a temporary hold, not an approved booking.
            </p>
          </li>
          <li>
            <strong>Let us check the journey</strong>
            <p>
              A team member checks suitability before approving and collecting payment. If we cannot
              help, we explain why and release the hold. We agree your call time directly.
            </p>
          </li>
          <li>
            <strong>Talk it through</strong>
            <p>
              Work through your route, timing and questions with a person. The call has no fixed
              time limit. Any records needed must use a separately arranged secure channel, never
              email.
            </p>
          </li>
          <li>
            <strong>Keep the next steps</strong>
            <p>
              Receive a short written recap, including questions that still need an official answer.
              There is no fixed recap deadline and no ongoing journey-management service.
            </p>
          </li>
        </ol>
      </section>
      <ConsultationBookingForm
        countries={countries.map(({ code, name }) => ({ code, name }))}
        configured={
          isFeatureEnabled("CONSULTATION_BOOKING_ENABLED") && Boolean(createStripeClient())
        }
        testMode={stripeMode() === "test"}
      />
      <section className="consultation-close">
        <Image
          src="/images/companions.jpg"
          alt="A white dog sitting close to a ginger kitten"
          width={900}
          height={1350}
          sizes="240px"
        />
        <div>
          <h2>They’re family. Of course you have questions.</h2>
          <a className="text-link" href="/about">
            Meet the people behind Zurtex <ArrowRight size={17} />
          </a>
          <p className="photo-credit">
            Photograph by{" "}
            <a href="https://unsplash.com/photos/a-dog-and-a-cat-sitting-on-the-floor-OOUlnUvZniU">
              Thomas de Fretes / Unsplash
            </a>
            .
          </p>
        </div>
      </section>
    </MarketingPage>
  );
}
