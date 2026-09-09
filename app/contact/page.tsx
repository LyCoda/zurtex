import type { Metadata } from 'next';
import { ArrowUpRight, Mail } from 'lucide-react';
import { MarketingPage, WaitNotice } from '@/components/marketing-shell';
export const metadata: Metadata = { title: 'Contact Our Team | Zurtex' };
const topics = [
  [
    'A question about your route',
    'Include your origin, destination, approximate travel date, operating airline, and whether you’re travelling with a dog or cat.',
    'Route question',
  ],
  [
    'Help with an existing order',
    'Include your checkout email and order or payment reference, if you have one.',
    'Existing order',
  ],
  [
    'A payment or refund question',
    'Share your payment reference and a short explanation.',
    'Payment or refund question',
  ],
  [
    'A privacy request',
    'Tell us what you would like to access, correct or delete.',
    'Privacy request',
  ],
];
export default function ContactPage() {
  return (
    <MarketingPage
      title="A real team at the other end."
      intro="A route question, a refund, or something you’re unsure about? Write to us. We’ll take a look and reply as soon as we can."
      variant="contact-page"
      aside={
        <div className="contact-address">
          <Mail size={30} aria-hidden="true" />
          <a href="mailto:help@zurtex.org">
            help@zurtex.org <ArrowUpRight size={23} />
          </a>
          <p>
            Our small team reads your message.
            <br />
            No need to have everything figured out first.
          </p>
        </div>
      }
    >
      <section className="contact-topics">
        <h2>What’s on your mind?</h2>
        <p>Pick a subject to open an email, or write to us directly.</p>
        <div>
          {topics.map(([title, description, subject]) => (
            <a
              key={subject}
              href={`mailto:help@zurtex.org?subject=${encodeURIComponent(subject)}`}
            >
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
      <WaitNotice />
      <section className="contact-kindness">
        <h2>Travelling very soon?</h2>
        <p>
          Email us before paying if your departure is close. We cannot guarantee
          acceptance or a completed review before your flight. The 24–48-hour
          delivery estimate starts only after acceptance and complete intake;
          mandatory waiting periods still apply.
        </p>
      </section>
    </MarketingPage>
  );
}
