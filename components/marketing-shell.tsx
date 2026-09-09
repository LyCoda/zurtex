/* oxlint-disable next/no-html-link-for-pages -- Native navigation avoids the deployed Vinext RSC Link runtime failure. */
import { ArrowRight, Heart, PawPrint } from 'lucide-react';
import type { ReactNode } from 'react';
import { MarketingHeader } from './site-header';
export { MarketingHeader } from './site-header';
export function MarketingFooter() {
  return (
    <footer className="zurtex-footer">
      <div className="footer-brand">
        <a className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            <PawPrint size={20} />
          </span>
          Zurtex
        </a>
        <p>
          A small team of animal lovers.
          <br />A little more clarity for the journey ahead.
        </p>
        <a className="contact-link" href="mailto:help@zurtex.org">
          help@zurtex.org <ArrowRight size={16} />
        </a>
      </div>
      <nav className="footer-directory" aria-label="Footer navigation">
        <div>
          <strong>Meet Zurtex</strong>
          <a href="/">Home</a>
          <a href="/about">Who we are</a>
          <a href="/services">Our services</a>
          <a href="/contact">Contact our team</a>
        </div>
        <div>
          <strong>The useful details</strong>
          <a href="/payments-refunds">Payments & refunds</a>
          <a href="/privacy">Privacy notice</a>
          <a href="/terms">Terms of service</a>
          <a href="/#route-screen">Check my route</a>
        </div>
      </nav>
      <div className="footer-bottom">
        <span>© 2026 Zurtex · Administrative research & organisation</span>
        <span>
          <Heart size={15} aria-hidden="true" /> For the ones who come with us.
        </span>
      </div>
    </footer>
  );
}
export function TeamNote() {
  return (
    <section className="team-note">
      <PawPrint size={34} aria-hidden="true" />
      <p>
        They’re family.
        <br />
        <strong>We keep that in mind with every review.</strong>
      </p>
      <a className="text-link" href="/about">
        The story behind Zurtex <ArrowRight size={17} />
      </a>
    </section>
  );
}
export function WaitNotice() {
  return (
    <aside className="wait-notice">
      <span className="notice-heading">
        Just paid? Leave the next step to us.
      </span>
      <p>
        Payment is not acceptance. Wait for our team to review your route and
        contact you. Send documents only after a Zurtex representative provides
        your separate secure upload link. Never attach records to an ordinary
        email.
      </p>
    </aside>
  );
}
export function MarketingPage({
  title,
  intro,
  children,
  variant = '',
  aside,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  variant?: string;
  aside?: ReactNode;
}) {
  return (
    <>
      <MarketingHeader />
      <main id="main-content" className={`zurtex-page ${variant}`}>
        <section className="page-intro">
          <div>
            <h1>{title}</h1>
            <p>{intro}</p>
          </div>
          {aside}
        </section>
        <div className="page-body">{children}</div>
      </main>
      <MarketingFooter />
    </>
  );
}
export function PolicyPage({
  title,
  intro,
  summary,
  sections,
  children,
}: {
  title: string;
  intro: string;
  summary: string;
  sections: [string, string][];
  children: ReactNode;
}) {
  return (
    <MarketingPage
      title={title}
      intro={intro}
      variant="policy-page"
      aside={
        <div className="policy-summary">
          <span>The short version</span>
          <p>{summary}</p>
          <small>Draft for launch · 9 September 2026</small>
        </div>
      }
    >
      <div className="policy-layout">
        <nav className="policy-index" aria-label="On this page">
          <strong>On this page</strong>
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
          <a href="mailto:help@zurtex.org">
            Ask us about this <ArrowRight size={15} />
          </a>
        </nav>
        <article className="policy-copy">{children}</article>
      </div>
    </MarketingPage>
  );
}
