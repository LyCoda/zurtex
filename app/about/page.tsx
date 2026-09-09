/* oxlint-disable next/no-html-link-for-pages -- Native navigation avoids the deployed Vinext RSC Link runtime failure. */
import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Heart } from 'lucide-react';
import { MarketingPage } from '@/components/marketing-shell';
export const metadata: Metadata = { title: 'Who We Are | Zurtex' };
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
            sizes="(max-width: 780px) 90vw, 440px"
            priority
          />
          <figcaption>
            For the ones who make anywhere feel like home.
          </figcaption>
        </figure>
      }
    >
      <section className="story-layout">
        <h2>
          It started with
          <br />a trip. And a lot
          <br />
          of questions.
        </h2>
        <div className="story-copy">
          <p className="large-copy">
            We thought travelling internationally with our dog would be
            straightforward. A vet appointment, a few documents, a flight
            together.
          </p>
          <p>
            Then came the government websites, the vaccination timelines, and
            the airline’s separate rules. Every new page seemed to bring another
            question. Had we found the current requirements? Were the dates in
            the right order? What did we need to ask our vet?
          </p>
          <p>
            That’s the problem Zurtex is here to help with. We’re a small,
            hands-on team that looks at one journey at a time, checks the
            official sources, and brings the paperwork and timing into a clearer
            order.
          </p>
          <p>
            We know there’s a much-loved dog or cat behind every itinerary. That
            matters to us as much as getting the details right.
          </p>
          <span className="team-signoff">
            With care, <strong>the Zurtex team</strong>
            <Heart size={19} aria-hidden="true" />
          </span>
        </div>
      </section>
      <section className="care-section">
        <div>
          <h2>
            Care is in
            <br />
            the small things.
          </h2>
          <p>Here’s what that means when we look at your journey.</p>
        </div>
        <div className="care-list">
          <article>
            <h3>A person reads your case.</h3>
            <p>
              Your review is prepared by our team. We explain what we found,
              what’s missing, and what still needs an official answer.
            </p>
          </article>
          <article>
            <h3>We’re honest when we can’t help.</h3>
            <p>
              Some journeys need a specialist. If we cannot responsibly review a
              paid case, we initiate a full refund within 24 hours of that
              decision.
            </p>
          </article>
          <article>
            <h3>Your records deserve care, too.</h3>
            <p>
              We ask for only the documents needed, through a separate secure
              link after acceptance. Please don’t email pet or identity records.
            </p>
          </article>
        </div>
      </section>
      <section className="honest-boundary">
        <h2>
          A second set of eyes.
          <br />A clearer next step.
        </h2>
        <div>
          <p>
            We organise travel information. Your veterinarian, airline and
            government authorities make the final decisions. We don’t issue
            certificates, book transport, give medical advice or guarantee
            boarding or entry.
          </p>
          <a className="text-link" href="/services">
            See exactly how we help <ArrowRight size={17} />
          </a>
        </div>
      </section>
      <p className="photo-credit">
        Companionship photograph by{' '}
        <a href="https://unsplash.com/photos/a-dog-and-a-cat-sitting-on-the-floor-OOUlnUvZniU">
          Thomas de Fretes / Unsplash
        </a>
        .
      </p>
    </MarketingPage>
  );
}
