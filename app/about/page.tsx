import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import { MarketingPage } from "@/components/marketing-shell";

export const metadata: Metadata = { title: "Who We Are | Zurtex" };

export default function AboutPage() {
  return (
    <MarketingPage
      title="Small team. Big soft spot for pets."
      intro="We’re animal lovers who think preparing for a trip should leave you with more time for your pet, and fewer tabs open."
      variant="about-page"
      aside={
        <figure className="companions-photo">
          <Image
            src="/images/companions.jpg"
            alt="A white shepherd resting beside a ginger kitten at home"
            width={900}
            height={1350}
            sizes="(max-width: 820px) 88vw, 420px"
            priority
          />
          <figcaption>For the ones who make anywhere feel like home.</figcaption>
        </figure>
      }
    >
      <section className="story-layout">
        <h2>It started with a trip. And a lot of questions.</h2>
        <div className="story-copy">
          <p className="large-copy">
            We thought travelling internationally with our dog would be straightforward. A vet
            appointment, a few documents, a flight together.
          </p>
          <p>
            Then came the government websites, the vaccination timelines, and the airline’s separate
            rules. Every new page seemed to bring another question. Had we found the current
            requirements? Were the dates in the right order? What did we need to ask our vet?
          </p>
          <p>
            That’s the problem Zurtex is here to help with. We’re a small, hands-on team that looks
            at one journey at a time, checks the official sources, and brings the paperwork and
            timing into a clearer order.
          </p>
          <p>
            We know there’s a much-loved dog or cat behind every itinerary. That matters to us as
            much as getting the details right.
          </p>
          <span className="team-signoff">
            With care, <strong>the Zurtex team</strong> <Heart size={19} aria-hidden="true" />
          </span>
        </div>
      </section>
      <section className="honest-boundary">
        <h2>A second set of eyes. A clearer next step.</h2>
        <div>
          <p>
            Zurtex is a planning and preparation service for international travel with dogs and
            cats. It does not approve, clear, certify, guarantee or arrange travel, and it does not
            replace a government authority, veterinarian, airline or specialist.
          </p>
          <p>
            Explore the information freely, or choose a personal consultation to talk through one
            planned journey. Booking starts with a temporary US$5 hold and a human suitability
            check.
          </p>
          <a className="primary-button" href="/consultation">
            See how we help <ArrowRight size={18} />
          </a>
        </div>
      </section>
      <p className="photo-credit">
        Companionship photograph by{" "}
        <a href="https://unsplash.com/photos/a-dog-and-a-cat-sitting-on-the-floor-OOUlnUvZniU">
          Thomas de Fretes / Unsplash
        </a>
        .
      </p>
    </MarketingPage>
  );
}
