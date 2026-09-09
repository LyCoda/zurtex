/* oxlint-disable next/no-html-link-for-pages -- Native navigation avoids the deployed Vinext RSC Link runtime failure. */
'use client';

import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  CreditCard,
  FileCheck2,
  Globe2,
  PawPrint,
  Plane,
  Route,
  ShieldCheck,
} from 'lucide-react';

import Image from 'next/image';


import { SyntheticEvent, useEffect, useState } from 'react';

import {
  airlines,
  countries,
  needsManualScopeCheck,
} from '@/lib/route-coverage';

import {
  MarketingHeader,
  MarketingFooter,
  TeamNote,
} from '@/components/marketing-shell';

type ScreenStatus = 'idle' | 'accepted' | 'research' | 'declined';

type RouteDetails = {
  origin: string;

  destination: string;

  departure: string;

  airline: string;

  movement: string;

  pet: string;
};

function scrollToScreen() {
  const screen = document.getElementById('route-screen');

  screen?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth',
    block: 'center',
  });

  screen?.querySelector('select')?.focus({ preventScroll: true });
}

function readFormValue(data: FormData, name: string) {
  const value = data.get(name);

  return typeof value === 'string' ? value.trim() : '';
}

export default function Home() {
  const [status, setStatus] = useState<ScreenStatus>('idle');

  const [formError, setFormError] = useState('');

  const [route, setRoute] = useState<RouteDetails | null>(null);

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [paymentState, setPaymentState] = useState<
    'idle' | 'verifying' | 'paid' | 'pending' | 'cancelled' | 'error'
  >('idle');

  const [consent, setConsent] = useState(false);

  const [attemptId, setAttemptId] = useState('');

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      const checkout = params.get('checkout');

      const sessionId = params.get('session_id');

      if (checkout === 'cancelled') {
        setPaymentState('cancelled');

        return;
      }

      if (checkout !== 'success' || !sessionId) return;

      setPaymentState('verifying');

      fetch(`/api/checkout-status?session_id=${encodeURIComponent(sessionId)}`)
        .then(async (response) => {
          const data = (await response.json()) as {
            paid?: boolean;

            pending?: boolean;
          };

          if (response.ok && data.pending) {
            setPaymentState('pending');
            return;
          }

          if (!response.ok || !data.paid)
            throw new Error('Payment not confirmed');

          setPaymentState('paid');
        })

        .catch(() => setPaymentState('error'));
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  function screenRoute(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    event.preventDefault();

    setFormError('');

    const data = new FormData(event.currentTarget);

    const origin = readFormValue(data, 'origin');

    const destination = readFormValue(data, 'destination');

    const departure = readFormValue(data, 'departure');

    const airline = readFormValue(data, 'airline');

    const movement = readFormValue(data, 'movement');

    const pet = readFormValue(data, 'pet');

    if (!origin || !destination || !departure || !airline) {
      setStatus('idle');

      setFormError(
        'Choose your origin, destination, departure date and operating airline.',
      );

      return;
    }

    const parsedDate = new Date(departure + 'T00:00:00Z');

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== departure ||
      departure < new Date().toISOString().slice(0, 10)
    ) {
      setStatus('idle');
      setFormError('Choose today or a future departure date.');
      return;
    }

    if (origin === destination) {
      setStatus('idle');

      setFormError('Origin and destination must be different.');

      return;
    }

    if (movement === 'commercial' || movement === 'cargo') {
      setStatus('declined');

      return;
    }

    setRoute({ origin, destination, departure, airline, movement, pet });

    setStatus(
      needsManualScopeCheck(origin, destination, airline)
        ? 'research'
        : 'accepted',
    );

    setConsent(false);

    setAttemptId(crypto.randomUUID());
  }

  async function startCheckout() {
    if (!route || !consent) return;

    setCheckoutLoading(true);

    setFormError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({
          ...route,

          checkoutAttemptId: attemptId,

          consent: true,
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url)
        throw new Error(data.error ?? 'Checkout is unavailable.');

      window.location.assign(data.url);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Checkout is unavailable.',
      );

      setCheckoutLoading(false);
    }
  }

  return (
    <>
      <MarketingHeader />
      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <h1>Flying internationally with your dog or cat?</h1>
            <p className="hero-lede">
              Let our team take a second look at your route, records and
              deadlines before your veterinary appointment.
            </p>
            <div className="hero-actions">
              <button
                className="primary-button"

                type="button"

                onClick={scrollToScreen}
              >
                Check my route <ArrowRight size={18} />
              </button>
              <a className="text-link" href="#included">
                See exactly what is included
              </a>
            </div>
            <div className="promise-row" aria-label="Service highlights">
              <span>
                <Clock3 size={17} /> 24–48 hours after complete intake
              </span>
              <span>
                <ShieldCheck size={17} /> Secure Stripe checkout
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <Image
              src="/images/pet-travel-readiness-hero.png"

              alt="A traveler reviewing documents beside her dog and pet carrier in a quiet airport lounge"

              width={1536}

              height={1024}

              priority

              sizes="(max-width: 900px) 100vw, 45vw"
            />
            <div className="journey-chip">
              <span className="journey-icon">
                <Route size={18} />
              </span>
              <span>
                <small>One journey at a time</small>Route-specific, never
                generic
              </span>
            </div>
          </div>

          <form
            className="route-screen"

            id="route-screen"

            onSubmit={screenRoute}

            onChange={(event) => {
              if (
                (event.target as unknown as HTMLInputElement).name !== 'consent'
              ) {
                setStatus('idle');
                setRoute(null);
                setConsent(false);
                setFormError('');
              }
            }}

            noValidate
          >
            <div className="screen-intro">
              <span className="screen-icon">
                <Globe2 size={21} />
              </span>
              <span>
                <strong>Start with your route</strong>
                <small>
                  A first scope check. A person confirms after payment.
                </small>
              </span>
            </div>
            <label>
              <span>From</span>
              <select disabled={checkoutLoading} name="origin" defaultValue="">
                <option value="" disabled>
                  Choose origin
                </option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="route-connector" aria-hidden="true">
              <span />
              <Plane size={18} />
              <span />
            </div>
            <label>
              <span>To</span>
              <select
                disabled={checkoutLoading}
                name="destination"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose destination
                </option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Approx. departure</span>
              <span className="input-with-icon">
                <CalendarDays size={17} />
                <input
                  disabled={checkoutLoading}
                  name="departure"
                  type="date"
                />
              </span>
            </label>
            <label>
              <span>Journey type</span>
              <select
                disabled={checkoutLoading}
                name="movement"
                defaultValue="noncommercial"
              >
                <option value="noncommercial">I travel with my pet</option>
                <option value="cargo">Unaccompanied cargo</option>
                <option value="commercial">Sale, adoption or transfer</option>
              </select>
            </label>
            <label>
              <span>Pet</span>
              <select disabled={checkoutLoading} name="pet" defaultValue="dog">
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </label>
            <label>
              <span>Operating airline</span>
              <select disabled={checkoutLoading} name="airline" defaultValue="">
                <option value="" disabled>
                  Choose airline
                </option>
                {airlines.map((airline) => (
                  <option key={airline.code} value={airline.code}>
                    {airline.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="screen-button"
              type="submit"
              disabled={checkoutLoading}
            >
              Check route fit <ChevronRight size={18} />
            </button>
            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}
            {status !== 'idle' && (
              <output className={`screen-result ${status}`} aria-live="polite">
                {status === 'accepted' && route && (
                  <>
                    <CheckCircle2 size={20} />
                    <span>
                      <strong>We can take a closer look at this route.</strong>{' '}
                      {
                        countries.find(
                          (item) => item.code === route.destination,
                        )?.note
                      }{' '}
                      {
                        airlines.find((item) => item.code === route.airline)
                          ?.modes
                      }{' '}
                      A representative still verifies the operating flight,
                      breed, carrier, transit points and current government
                      rules.
                    </span>
                    <p className="checkout-disclosure">
                      Payment is not acceptance. Wait for our team and your
                      separate secure upload link. Never email pet or identity
                      records.
                    </p>
                    <label className="checkout-consent">
                      <input
                        type="checkbox"
                        name="consent"
                        disabled={checkoutLoading}
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                      <span>
                        I agree to the <a href="/terms">Terms</a> and{' '}
                        <a href="/payments-refunds">Refund Policy</a>,
                        have read the{' '}
                        <a href="/privacy">Privacy Notice</a>, and request
                        work to begin after acceptance and complete intake,
                        including during any applicable withdrawal period. I
                        acknowledge that my withdrawal right may end once the
                        service is fully performed with my agreement.
                      </span>
                    </label>
                    <button
                      className="checkout-button"

                      type="button"

                      onClick={startCheckout}

                      disabled={checkoutLoading || !consent}
                    >
                      <CreditCard size={18} />
                      {checkoutLoading
                        ? 'Opening Stripe…'
                        : 'Continue to Stripe · US$7'}
                    </button>
                  </>
                )}
                {status === 'research' && (
                  <>
                    <CircleAlert size={20} />
                    <span>
                      <strong>This route needs confirmation first.</strong>{' '}
                      Specialist transport, permit or quarantine rules may apply.{' '}
                      <a href="/contact">Contact our team</a> with your basic
                      itinerary before paying. Please don’t send documents.
                    </span>
                  </>
                )}
                {status === 'declined' && (
                  <>
                    <CircleAlert size={20} />
                    <span>
                      <strong>Outside this service’s scope.</strong>{' '}Commercial
                      transfers and unaccompanied cargo need a qualified
                      pet-transport specialist.
                    </span>
                  </>
                )}
              </output>
            )}
            {paymentState === 'verifying' && (
              <output className="payment-message verifying">
                <Clock3 size={20} />
                <span>
                  <strong>Confirming your Stripe payment…</strong> Please keep
                  this page open.
                </span>
              </output>
            )}
            {paymentState === 'pending' && (
              <output className="payment-message verifying">
                <Clock3 size={20} />
                <span>
                  <strong>Your payment is still processing.</strong> Please wait
                  for confirmation and don’t pay again. Contact help@zurtex.org
                  if you need help. Payment is not case acceptance.
                </span>
              </output>
            )}
            {paymentState === 'paid' && (
              <output className="payment-message paid">
                <CheckCircle2 size={20} />
                <span>
                  <strong>Payment confirmed. Please wait for our team.</strong>{' '}
                  A representative from our team will contact you soon
                  {' using the email entered at checkout '}
                  after a manual route review. Payment is not acceptance. Do not
                  send documents until we provide your separate secure upload
                  link. Never attach records to an ordinary email.
                </span>
              </output>
            )}
            {paymentState === 'cancelled' && (
              <output className="payment-message cancelled">
                <CircleAlert size={20} />
                <span>
                  <strong>You returned from checkout.</strong> Payment has not
                  been confirmed here. If you believe you paid, check your
                  receipt or contact us before trying again. You can screen the
                  route again whenever you are ready.
                </span>
              </output>
            )}
            {paymentState === 'error' && (
              <div className="payment-message cancelled" role="alert">
                <CircleAlert size={20} />
                <span>
                  <strong>We could not verify this payment.</strong> Check your
                  Stripe receipt or contact the Zurtex team before trying again.
                </span>
              </div>
            )}
            <p className="coverage-note">
              Launch coverage is a research scope, not an approval list. Airline
              and government acceptance remain itinerary-specific.
            </p>
          </form>
        </section>

        <section className="credibility-strip" aria-label="Service principles">
          <span>
            <CheckCircle2 size={18} /> Zurtex launch offer
          </span>
          <span>
            <FileCheck2 size={18} /> Source-check date included
          </span>
          <span>
            <PawPrint size={18} /> Personal travel with your own dog or cat
          </span>
          <span>
            <Check size={18} /> Full refund when a paid case cannot be reviewed
          </span>
        </section>

        <section className="offer-section" id="included">
          <div className="section-heading">
            <h2>A small check designed to prevent big confusion.</h2>
            <p>
              A human reviews the travel facts and records you provide against
              current official government and carrier sources for that specific
              journey.
            </p>
          </div>
          <div className="offer-layout">
            <div className="offer-price">
              <span className="launch-discount">
                <s>US$14</s> · US$7 launch discount
              </span>
              <span className="price">
                <sup>US$</sup>7
              </span>
              <p>
                International Pet Travel
                <br />
                Initial Readiness Check
              </p>
              <small>
                Launch price after a US$7 discount. Email delivery within
                24–48 hours after complete intake.
              </small>
              <button
                className="primary-button"

                type="button"

                onClick={scrollToScreen}
              >
                Check my route <ArrowRight size={18} />
              </button>
            </div>
            <div className="deliverables">
              {[
                [
                  'Route summary',

                  'A preliminary view of which requirements appear to apply.',
                ],

                [
                  'Reverse timeline',

                  'Apparent deadlines and waiting periods in date order.',
                ],

                [
                  'Record status',

                  'Received, missing, unclear or inconsistent items flagged.',
                ],

                [
                  'Official links',

                  'Destination, origin, transit and airline pages used.',
                ],

                [
                  'Questions to resolve',

                  'A focused list for your veterinarian, airline or authority.',
                ],
              ].map(([title, text]) => (
                <div className="deliverable-row" key={title}>
                  <span className="check-ring">
                    <Check size={17} />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="process-section" id="how-it-works">
          <div className="process-title">
            <h2>From scattered rules to a clear conversation.</h2>
            <p>
              The result is not a certificate. It is a concise, sourced brief
              that helps you arrive at the right professionals with better
              questions.
            </p>
          </div>
          <div className="process-line">
            <article>
              <span className="process-node">
                <Route size={22} />
              </span>
              <h3>Check your route</h3>
              <p>
                Share origin, destination, dates, transit points, airline and
                journey type.
              </p>
            </article>
            <span className="line-segment" aria-hidden="true" />
            <article>
              <span className="process-node">
                <FileCheck2 size={22} />
              </span>
              <h3>Pay, then wait for our team</h3>
              <p>
                A person reviews your route. If accepted, we send a separate
                secure upload link for the records needed. Never email
                documents.
              </p>
            </article>
            <span className="line-segment" aria-hidden="true" />
            <article>
              <span className="process-node">
                <ShieldCheck size={22} />
              </span>
              <h3>Receive your check</h3>
              <p>
                A one-page email or PDF with flags, timing, official links and
                next questions.
              </p>
            </article>
          </div>
        </section>

        <section className="scope-section" id="scope">
          <div className="scope-statement">
            <span className="scope-mark" aria-hidden="true">
              “
            </span>
            <blockquote>
              We organise the travel information you provide. Your veterinarian,
              airline and government authorities make the final decisions.
            </blockquote>
          </div>
          <div className="scope-columns">
            <div>
              <h3>This service can help with</h3>
              <ul>
                <li>
                  <Check size={17} /> Personal travel with your own dog or cat
                </li>
                <li>
                  <Check size={17} /> Clear routes with sufficient lead time
                </li>
                <li>
                  <Check size={17} /> Legible records and known airlines
                </li>
                <li>
                  <Check size={17} /> Requirements available from official
                  sources
                </li>
              </ul>
            </div>
            <div>
              <h3>It does not provide</h3>
              <ul className="not-included">
                <li>
                  <span>—</span> Certificates, endorsements or document
                  alteration
                </li>
                <li>
                  <span>—</span> Veterinary, legal or customs advice
                </li>
                <li>
                  <span>—</span> Bookings, cargo handling or government
                  representation
                </li>
                <li>
                  <span>—</span> A guarantee of boarding, entry or return
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="source-section">
          <div>
            <h2>Current sources, reopened for every journey.</h2>
            <p>
              Requirements change. Each accepted review records the official
              pages used and the date they were checked; a change in route,
              airline, pet or travel date may require a new review.
            </p>
          </div>
          <div
            className="source-list"

            aria-label="Examples of official source types"
          >
            <span>Destination authority</span>
            <span>Origin authority</span>
            <span>Transit authority</span>
            <span>Operating carrier</span>
          </div>
        </section>

        <section className="closing-section">
          <div>
            <h2>Know what to ask before the final appointment.</h2>
            <p>
              Start with your itinerary. If our team cannot responsibly review a
              paid case, we initiate a full refund within 24 hours of that
              decision.
            </p>
          </div>
          <button
            className="light-button"
            type="button"
            onClick={scrollToScreen}
          >
            Start the US$7 launch check <ArrowRight size={18} />
          </button>
        </section>

        <TeamNote />
      </main>
      <MarketingFooter />
    </>
  );
}
