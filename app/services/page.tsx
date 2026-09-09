/* oxlint-disable next/no-html-link-for-pages -- Native navigation avoids the deployed Vinext RSC Link runtime failure. */
import type { Metadata } from 'next';
import { ArrowRight, Check, FileCheck2 } from 'lucide-react';
import { MarketingPage, WaitNotice } from '@/components/marketing-shell';
export const metadata: Metadata = { title: 'Our Services | Zurtex' };
const deliverables = [
  [
    'Your route, brought together',
    'Origin, destination, transit and the apparent requirements for the journey you tell us about.',
  ],
  [
    'A timeline you can follow',
    'Important waiting periods, deadlines and veterinary steps, worked back from your travel date.',
  ],
  [
    'A careful look at your records',
    'Received, missing, unclear or inconsistent items made visible.',
  ],
  [
    'Sources you can go back to',
    'Official government and operating-airline links, with the date we checked them.',
  ],
  [
    'Better questions for the right people',
    'A focused list to take to your veterinarian, airline or the relevant authority.',
  ],
];
export default function ServicesPage() {
  return (
    <MarketingPage
      title="A little clarity before a big journey."
      intro="Our International Pet Travel Readiness Check gives you a second set of eyes on your route, records and deadlines."
      variant="services-page"
      aside={
        <div className="service-ticket">
          <div>
            <span>One journey. One refundable reservation.</span>
            <strong>
              <small>US$</small>7
            </strong>
            <span>
              Launch price <s>US$14</s>
            </span>
          </div>
          <p>For personal international travel with your own dog or cat.</p>
          <a className="primary-button" href="/#route-screen">
            Check my route <ArrowRight size={18} />
          </a>
          <small>24–48 hours after acceptance and complete intake.</small>
        </div>
      }
    >
      <section className="service-delivery">
        <div>
          <h2>
            Something useful
            <br />
            to take to your vet.
          </h2>
          <p className="section-lead">
            A concise email or PDF, prepared for your journey. No blanket
            checklist. No automatic travel approval.
          </p>
          <div
            className="report-preview"
            aria-label="Illustrative readiness brief"
          >
            <div>
              <FileCheck2 size={24} />
              <strong>Your readiness brief</strong>
              <span>Illustrative example · not travel advice</span>
            </div>
            <dl>
              <div>
                <dt>Journey</dt>
                <dd>Hong Kong → London · one dog</dd>
              </div>
              <div>
                <dt>Timing</dt>
                <dd>Work back from your departure date</dd>
              </div>
              <div>
                <dt>Records</dt>
                <dd>Operating flight number: still needed</dd>
              </div>
              <div>
                <dt>Next step</dt>
                <dd>
                  Which airline operates each leg, and can it accept your dog?
                </dd>
              </div>
            </dl>
            <p>
              Your actual brief includes checked official links and their review
              date.
            </p>
          </div>
        </div>
        <div className="delivery-list">
          {deliverables.map(([title, text]) => (
            <article key={title}>
              <Check size={20} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="journey-steps">
        <h2>Here’s how we’ll help.</h2>
        <ol>
          <li>
            <h3>Tell us the basics</h3>
            <p>
              Choose your origin, destination, approximate date, operating
              airline and pet. Our initial screen checks the service scope.
            </p>
          </li>
          <li>
            <h3>Reserve, then pause</h3>
            <p>
              Authorize a temporary US$7 card hold through Stripe. We do not
              capture the funds, and the hold is released after confirmation.
            </p>
          </li>
          <li>
            <h3>Use your secure link</h3>
            <p>
              Once accepted, our team emails a separate secure upload link and
              tells you exactly which records to share.
            </p>
          </li>
          <li>
            <h3>Receive your brief</h3>
            <p>
              We aim to email your readiness check within 24–48 hours of
              acceptance and complete information.
            </p>
          </li>
        </ol>
      </section>
      <WaitNotice />
      <section className="detail-pair">
        <div>
          <h2>What we look at</h2>
          <ul>
            <li>Origin, destination, transit and return plans</li>
            <li>Travel dates and your next veterinary appointment</li>
            <li>
              The operating airline on every segment, including codeshares
            </li>
            <li>Cabin or accompanied-hold arrangements</li>
            <li>Your pet’s species, age, microchip and rabies status</li>
            <li>
              Requested vaccination, laboratory, certificate and itinerary
              records, shared only after acceptance
            </li>
          </ul>
        </div>
        <div>
          <h2>Where our help ends</h2>
          <p>
            We don’t issue, alter, endorse or submit certificates; book flights
            or quarantine; advise on medication, sedation or fitness to fly; or
            provide veterinary, legal, customs or immigration advice.
          </p>
          <p>
            Commercial transfers, rescue or adoption movements, unaccompanied
            cargo, exotic species and complex or unclear routes may need a
            specialist. Mandatory waiting periods cannot be shortened by a
            readiness check.
          </p>
          <p>
            Our review reflects the facts and sources on its stated date. If
            your route, airline, pet or date changes, contact us about a new
            review.
          </p>
        </div>
      </section>
    </MarketingPage>
  );
}
