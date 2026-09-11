/* oxlint-disable next/no-html-link-for-pages -- Native navigation avoids the deployed Vinext RSC Link runtime failure. */
"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Cat,
  ChevronDown,
  Dog,
  ExternalLink,
  Heart,
  Pencil,
  ShieldCheck,
} from "lucide-react";
import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { purposeLabels } from "@/lib/journey-purpose";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { RouteGuideAssessment, RouteGuideRequest } from "@/lib/route-intelligence";
import { ResearchedAnswer } from "./researched-answer";
import { ReadyPackWorkspace } from "./ready-pack-workspace";

type Option = { code: string; name: string };
const modeLabels = { cabin: "In the cabin", hold: "In the hold", cargo: "As cargo" };
const relationshipLabels = {
  owner: "With their owner",
  family: "With family",
  authorised: "With an authorised person",
};
const initialForm: RouteGuideRequest = {
  origin: "",
  destination: "",
  intendedArrival: "",
  species: "dog",
  travellerRelationship: "owner",
  movementPurpose: "personal",
  travelMode: "cabin",
  airline: "",
  hasTransit: false,
  petCount: 1,
  ownerTravelTiming: "together",
};
function displayDate(value: string) {
  return new Date(value + "T12:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function Field({
  label,
  id,
  children,
  hint,
}: {
  label: string;
  id: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="journey-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <small>{hint}</small>}
    </div>
  );
}
function CountrySelect({
  id,
  value,
  onChange,
  countries,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  countries: Option[];
}) {
  return (
    <NativeSelect
      className="journey-select"
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required
    >
      <option value="">Choose a country</option>
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </NativeSelect>
  );
}
export function RouteWorkbench({
  countries,
  airlines,
}: {
  countries: Option[];
  airlines: Option[];
}) {
  const [form, setForm] = useState<RouteGuideRequest>(initialForm);
  const [step, setStep] = useState(1);
  const [assessment, setAssessment] = useState<RouteGuideAssessment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formHeadingRef = useRef<HTMLHeadingElement>(null);
  const requestSerial = useRef(0);
  const today = new Date().toLocaleDateString("en-CA");
  useEffect(() => {
    if (assessment) headingRef.current?.focus();
  }, [assessment]);
  function update<K extends keyof RouteGuideRequest>(key: K, value: RouteGuideRequest[K]) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
      ...(key === "hasTransit" && !value ? { transitCountry: undefined } : {}),
      ...(key === "travellerRelationship"
        ? { ownerTravelTiming: value === "owner" ? "together" : "unknown" }
        : {}),
    }));
    setError("");
  }
  function focusForm() {
    requestAnimationFrame(() => formHeadingRef.current?.focus());
  }
  function editJourney(nextStep = 1) {
    requestSerial.current++;
    setLoading(false);
    setAssessment(null);
    setStep(nextStep);
    setAnnouncement("Your journey is ready to edit. Submit again to update the guide.");
    focusForm();
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (form.origin === form.destination) {
      setError("Choose two different countries for an international journey.");
      return;
    }
    if (step === 1) {
      const dateControl = event.currentTarget.elements.namedItem(
        "intended-arrival",
      ) as HTMLInputElement | null;
      const intendedArrival = dateControl?.value ?? form.intendedArrival;
      if (!intendedArrival || !/^\d{4}-\d{2}-\d{2}$/.test(intendedArrival)) {
        setError("Choose the date you hope to arrive before continuing.");
        return;
      }
      setForm((previous) => ({ ...previous, intendedArrival }));
      setStep(2);
      focusForm();
      return;
    }
    setLoading(true);
    const serial = ++requestSerial.current;
    try {
      const response = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = (await response.json()) as RouteGuideAssessment & { error?: string };
      if (serial !== requestSerial.current) return;
      if (!response.ok)
        throw new Error(body.error || "We could not prepare your guide. Please try again.");
      setAssessment(body as RouteGuideAssessment);
      setAnnouncement(
        "Your route guide is ready. Start with the journey summary and preparation steps.",
      );
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (failure) {
      if (serial === requestSerial.current)
        setError(
          failure instanceof Error ? failure.message : "We could not connect. Please try again.",
        );
    } finally {
      if (serial === requestSerial.current) setLoading(false);
    }
  }
  return (
    <>
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
      {assessment ? (
        <JourneyDashboard
          key={assessment.assessmentId}
          assessment={assessment}
          headingRef={headingRef}
          editJourney={editJourney}
        />
      ) : (
        <>
          <section className="welcome-hero">
            <div className="welcome-copy">
              <h1>
                Flying internationally
                <br />
                with your dog or cat?
              </h1>
              <p>
                Let’s work out what to check, who to ask, and what to do next. A little preparation
                makes the journey feel closer.
              </p>
              <span className="welcome-note">
                <Heart size={17} aria-hidden="true" /> For the ones who come with us.
              </span>
            </div>
            <img
              className="welcome-photo"
              src="/images/pet-travel-readiness-hero.png"
              width="1536"
              height="1024"
              alt="A traveller and her dog together at the airport"
              fetchPriority="high"
            />
          </section>
          <section className="journey-start" id="route-screen" aria-labelledby="journey-form-title">
            <div className="journey-form-top">
              <h2 ref={formHeadingRef} id="journey-form-title" tabIndex={-1}>
                {step === 1 ? "Where are you heading together?" : "A little more about the journey"}
              </h2>
              <ol className="form-steps" aria-label="Your progress">
                <li aria-current={step === 1 ? "step" : undefined}>
                  <span>1</span> Your journey
                </li>
                <li aria-current={step === 2 ? "step" : undefined}>
                  <span>2</span> Travel details
                </li>
              </ol>
            </div>
            {step === 2 && (
              <p className="journey-recap">
                {countries.find((c) => c.code === form.origin)?.name}{" "}
                <ArrowRight size={15} aria-hidden="true" />{" "}
                {countries.find((c) => c.code === form.destination)?.name} ·{" "}
                {displayDate(form.intendedArrival)} · {purposeLabels[form.movementPurpose]}
              </p>
            )}
            <form onSubmit={submit} aria-busy={loading}>
              <fieldset disabled={loading} className="form-fields">
                {step === 1 ? (
                  <>
                    <fieldset className="journey-purpose">
                      <legend>What kind of journey is this?</legend>
                      <div className="purpose-options">
                        {(
                          [
                            [
                              "personal",
                              "Travelling with my pet",
                              "A holiday or visit. They stay mine.",
                            ],
                            [
                              "relocation",
                              "Moving home with my pet",
                              "A new home, with the same owner.",
                            ],
                            [
                              "sale",
                              "Breeding or a new owner",
                              "Sale, adoption, breeding or an event.",
                            ],
                          ] as const
                        ).map(([value, label, hint]) => (
                          <label key={value}>
                            <input
                              type="radio"
                              name="journey-purpose"
                              value={value}
                              checked={
                                value === "sale"
                                  ? !["personal", "relocation"].includes(form.movementPurpose)
                                  : form.movementPurpose === value
                              }
                              onChange={() => update("movementPurpose", value)}
                            />
                            <span>
                              <strong>{label}</strong>
                              <small>{hint}</small>
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <div className="journey-fields first-step">
                      <Field label="Travelling from" id="origin">
                        <CountrySelect
                          id="origin"
                          value={form.origin}
                          onChange={(value) => update("origin", value)}
                          countries={countries}
                        />
                      </Field>
                      <Field label="Travelling to" id="destination">
                        <CountrySelect
                          id="destination"
                          value={form.destination}
                          onChange={(value) => update("destination", value)}
                          countries={countries}
                        />
                      </Field>
                      <Field label="Arriving on" id="intended-arrival">
                        <Input
                          className="journey-input"
                          id="intended-arrival"
                          type="date"
                          min={today}
                          required
                          value={form.intendedArrival}
                          onChange={(event) => update("intendedArrival", event.target.value)}
                        />
                      </Field>
                      <fieldset className="pet-choice">
                        <legend>Who’s coming along?</legend>
                        <label>
                          <input
                            type="radio"
                            name="species"
                            checked={form.species === "dog"}
                            onChange={() => update("species", "dog")}
                          />
                          <Dog size={19} aria-hidden="true" /> Dog
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="species"
                            checked={form.species === "cat"}
                            onChange={() => update("species", "cat")}
                          />
                          <Cat size={19} aria-hidden="true" /> Cat
                        </label>
                      </fieldset>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="journey-fields second-step">
                      {!["personal", "relocation"].includes(form.movementPurpose) && (
                        <Field
                          label="What is the purpose?"
                          id="purpose"
                          hint="The country’s rules decide the process, not your job title."
                        >
                          <NativeSelect
                            className="journey-select"
                            id="purpose"
                            value={form.movementPurpose}
                            onChange={(e) =>
                              update(
                                "movementPurpose",
                                e.target.value as RouteGuideRequest["movementPurpose"],
                              )
                            }
                          >
                            {Object.entries(purposeLabels)
                              .filter(([value]) => !["personal", "relocation"].includes(value))
                              .map(([value, label]) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ))}
                          </NativeSelect>
                        </Field>
                      )}
                      <Field label="Your pet is travelling…" id="relationship">
                        <NativeSelect
                          className="journey-select"
                          id="relationship"
                          value={form.travellerRelationship}
                          onChange={(e) =>
                            update(
                              "travellerRelationship",
                              e.target.value as RouteGuideRequest["travellerRelationship"],
                            )
                          }
                        >
                          <option value="owner">With me, their owner</option>
                          <option value="family">With a family member</option>
                          <option value="authorised">With someone I authorise</option>
                        </NativeSelect>
                      </Field>
                      <Field
                        label="How many pets?"
                        id="pet-count"
                        hint="This guide covers one species per journey."
                      >
                        <Input
                          className="journey-input"
                          id="pet-count"
                          type="number"
                          min={1}
                          max={20}
                          step={1}
                          required
                          value={Number.isNaN(form.petCount) ? "" : (form.petCount ?? 1)}
                          onChange={(e) =>
                            update(
                              "petCount",
                              e.target.value === "" ? Number.NaN : Number(e.target.value),
                            )
                          }
                        />
                      </Field>
                      <Field label="How will your pet fly?" id="travel-mode">
                        <NativeSelect
                          className="journey-select"
                          id="travel-mode"
                          value={form.travelMode}
                          onChange={(e) =>
                            update("travelMode", e.target.value as RouteGuideRequest["travelMode"])
                          }
                        >
                          {Object.entries(modeLabels).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </NativeSelect>
                      </Field>
                    </div>
                    {form.travellerRelationship !== "owner" && (
                      <div className="region-question">
                        <Field
                          label="When will the owner travel?"
                          id="owner-travel"
                          hint="Some countries link personal-pet rules to the owner’s travel dates."
                        >
                          <NativeSelect
                            className="journey-select"
                            id="owner-travel"
                            value={form.ownerTravelTiming ?? "unknown"}
                            onChange={(e) =>
                              update(
                                "ownerTravelTiming",
                                e.target.value as RouteGuideRequest["ownerTravelTiming"],
                              )
                            }
                          >
                            <option value="unknown">Not sure yet</option>
                            <option value="together">On the same journey</option>
                            <option value="within-five-days">Within 5 days before or after</option>
                            <option value="outside-five-days">
                              More than 5 days apart, or not travelling
                            </option>
                          </NativeSelect>
                        </Field>
                      </div>
                    )}
                    {form.destination === "US" && (
                      <div className="region-question">
                        <Field
                          label="Where in the United States? (optional)"
                          id="arrival-region"
                          hint="Hawaii, Guam and other territories need their own checks."
                        >
                          <NativeSelect
                            className="journey-select"
                            id="arrival-region"
                            value={form.arrivalRegion ?? ""}
                            onChange={(e) =>
                              update(
                                "arrivalRegion",
                                e.target.value as RouteGuideRequest["arrivalRegion"],
                              )
                            }
                          >
                            <option value="">Not sure yet</option>
                            <option value="mainland">US mainland</option>
                            <option value="hawaii">Hawaii</option>
                            <option value="guam">Guam</option>
                            <option value="other">Another US territory</option>
                          </NativeSelect>
                        </Field>
                      </div>
                    )}
                    <details className="flight-details">
                      <summary>
                        Know your airline or connection? <span>Optional</span>
                        <ChevronDown size={17} aria-hidden="true" />
                      </summary>
                      <div className="journey-fields second-step">
                        <Field
                          label="Airline on your booking"
                          id="airline"
                          hint="We’ll still need to check who operates each flight."
                        >
                          <NativeSelect
                            className="journey-select"
                            id="airline"
                            value={form.airline ?? ""}
                            onChange={(e) => update("airline", e.target.value)}
                          >
                            <option value="">Not decided yet</option>
                            {airlines.map((a) => (
                              <option key={a.code} value={a.code}>
                                {a.name}
                              </option>
                            ))}
                            <option value="OTHER">Another airline</option>
                          </NativeSelect>
                        </Field>
                        <Field
                          label="Airline operating your first flight"
                          id="operating-airline"
                          hint="Look for “operated by” on the flight details."
                        >
                          <NativeSelect
                            className="journey-select"
                            id="operating-airline"
                            value={form.operatingAirline ?? ""}
                            onChange={(e) => update("operatingAirline", e.target.value)}
                          >
                            <option value="">Not sure yet</option>
                            {airlines.map((a) => (
                              <option key={a.code} value={a.code}>
                                {a.name}
                              </option>
                            ))}
                            <option value="OTHER">Another airline</option>
                          </NativeSelect>
                        </Field>
                        <Field label="Will you change planes?" id="has-transit">
                          <NativeSelect
                            className="journey-select"
                            id="has-transit"
                            value={form.hasTransit ? "yes" : "no"}
                            onChange={(e) => update("hasTransit", e.target.value === "yes")}
                          >
                            <option value="no">No connection planned</option>
                            <option value="yes">Yes, a connecting flight</option>
                          </NativeSelect>
                        </Field>
                        {form.hasTransit && (
                          <Field label="Connecting in" id="transit">
                            <NativeSelect
                              className="journey-select"
                              id="transit"
                              value={form.transitCountry ?? ""}
                              onChange={(e) => update("transitCountry", e.target.value)}
                            >
                              <option value="">Not sure yet</option>
                              {countries.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.name}
                                </option>
                              ))}
                            </NativeSelect>
                          </Field>
                        )}
                      </div>
                    </details>
                  </>
                )}
                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <div className="form-bottom">
                  {step === 1 ? (
                    <p>No email to see your result. Your guide and travel tools are free.</p>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      className="back-button"
                      onClick={() => {
                        setStep(1);
                        focusForm();
                      }}
                    >
                      <ArrowLeft size={17} /> Back to your journey
                    </Button>
                  )}
                  <Button className="primary-button" type="submit" disabled={loading}>
                    {loading
                      ? "Preparing your guide…"
                      : step === 1
                        ? "Continue"
                        : "See my route guide"}
                    {!loading && <ArrowRight size={18} />}
                  </Button>
                </div>
              </fieldset>
            </form>
            <p className="form-footnote">
              <ShieldCheck size={15} aria-hidden="true" /> Official-source links included. This
              early guide helps you prepare; it does not approve travel.
            </p>
          </section>
          <section className="home-explainer">
            <div>
              <h2>
                A clearer starting point.
                <br />A calmer journey.
              </h2>
              <p>
                Pet travel can mean a lot of open tabs. We bring the next questions into one place,
                with links back to the people who set the rules.
              </p>
              <a className="text-link" href="/methodology">
                How we put your guide together <ArrowRight size={17} />
              </a>
            </div>
            <ol>
              <li>
                <strong>Tell us about your trip</strong>
                <p>Start with your route and your pet. No account or documents needed.</p>
              </li>
              <li>
                <strong>Work through your guide</strong>
                <p>See what to ask the destination authority, your vet and your airline.</p>
              </li>
              <li>
                <strong>Make the next call with confidence</strong>
                <p>
                  Keep the questions that matter in front of you. We’ll say where more information
                  is needed.
                </p>
              </li>
            </ol>
          </section>
          <section className="family-note">
            <img
              src="/images/companions.jpg"
              width="1800"
              height="2700"
              alt="A white dog resting beside a ginger cat"
              loading="lazy"
            />
            <div>
              <h2>
                They’re family.
                <br />
                Of course they’re coming.
              </h2>
              <p>
                Whether it’s a new home or a long-awaited visit, getting there together is the part
                that matters.
              </p>
              <a href="/about" className="text-link">
                Meet Zurtex <ArrowRight size={17} />
              </a>
            </div>
          </section>
        </>
      )}
    </>
  );
}

function JourneyDashboard({
  assessment,
  headingRef,
  editJourney,
}: {
  assessment: RouteGuideAssessment;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  editJourney: (step?: number) => void;
}) {
  const [section, setSection] = useState("plan");
  const [packOpen, setPackOpen] = useState(false);
  const [packVisited, setPackVisited] = useState(false);
  const packButton = useRef<HTMLButtonElement>(null);
  const draft = assessment.draftAnswer;
  const route = assessment.route;
  const government = assessment.findings.filter((f) => f.group === "government");
  const flightFindings = assessment.findings.filter((f) =>
    ["airline", "itinerary"].includes(f.group),
  );
  const sources = draft ? draft.sources : assessment.evidence;
  return (
    <>
      <div className="journey-dashboard compact-dashboard" hidden={packOpen}>
        <header className="guide-header">
          <div className="guide-toolbar">
            <a href="/" className="text-link">
              <ArrowLeft size={16} /> Start a new guide
            </a>
            <span>Free guide · Private beta</span>
          </div>
          <div className="guide-title-row">
            <h1 ref={headingRef} tabIndex={-1}>
              {route.origin} <ArrowRight aria-label="to" /> {route.destination}
            </h1>
            <Button variant="outline" className="secondary-button" onClick={() => editJourney(1)}>
              <Pencil size={16} /> Edit journey
            </Button>
          </div>
          <p className="trip-facts">
            <span>
              {route.species === "dog" ? <Dog size={17} /> : <Cat size={17} />}{" "}
              {route.petCount ?? 1} {route.species}
              {(route.petCount ?? 1) > 1 ? "s" : ""}
            </span>
            <span>
              <CalendarDays size={17} /> {displayDate(route.intendedArrival)}
            </span>
            <span>{purposeLabels[route.movementPurpose]}</span>
          </p>
        </header>
        <Tabs
          value={section}
          onValueChange={(value) => setSection(String(value))}
          className="route-result-tabs"
        >
          <TabsList variant="line" aria-label="Route guide sections">
            <TabsTrigger value="plan">Your plan</TabsTrigger>
            <TabsTrigger value="flights">Flights</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
          </TabsList>
          <TabsContent value="plan">
            <section className="plan-introduction">
              <h2>{draft?.headline ?? "Let’s work out what this journey needs."}</h2>
              <p>{draft?.summary ?? assessment.explanation}</p>
              <p className="plan-preview-note">
                Research preview, not human reviewed or travel approval. Your pet’s records still
                need checking.
              </p>
            </section>
            {draft ? (
              <ResearchedAnswer answer={draft} />
            ) : (
              <section className="guide-section">
                <h2>Start with these questions</h2>
                <ol className="travel-checklist">
                  {government.map((finding, index) => (
                    <li key={finding.id}>
                      <details>
                        <summary>
                          <span className="checklist-number">{index + 1}</span>
                          <strong>{finding.title}</strong>
                          <ChevronDown size={19} aria-hidden="true" />
                        </summary>
                        <div className="checklist-detail">
                          <p>{finding.summary}</p>
                          <FindingSources assessment={assessment} ids={finding.sourceIds} />
                        </div>
                      </details>
                    </li>
                  ))}
                </ol>
              </section>
            )}
            <details className="plan-assumptions">
              <summary>
                Can we travel on {displayDate(route.intendedArrival)}?{" "}
                <ChevronDown size={17} aria-hidden="true" />
              </summary>
              <p>
                We can’t confirm that date yet. Any dates shown are conditional planning windows,
                not a check of your pet’s records or permission to travel.
              </p>
              <p>
                Ask your vet to check identification, vaccination and any tests before setting
                certificate appointments. Confirm the entry point and actual airline before paying
                for transport.
              </p>
            </details>
            <aside className="compact-pack-offer">
              <div>
                <h2>Your plan, ready for the vet.</h2>
                <p>Your vet brief, document checklist and print view. All free.</p>
              </div>
              <Button
                ref={packButton}
                className="primary-button"
                onClick={() => {
                  setPackVisited(true);
                  setPackOpen(true);
                }}
              >
                Open my travel tools <ArrowRight size={17} />
              </Button>
            </aside>
            <aside className="consultation-inline">
              <h2>Want to talk it through?</h2>
              <p>
                A US$5 Pet Travel Consultation gives you time with a person to look at your journey.
                No fixed call-length limit, with a written recap and no fixed recap deadline.
              </p>
              <a className="text-link" href="/consultation">
                See the consultation <ArrowRight size={17} />
              </a>
            </aside>
            <p className="local-note">
              This preview is free. Your guide and notes stay in this page; refreshing or leaving
              clears them.
            </p>
          </TabsContent>
          <TabsContent value="flights">
            <section className="guide-section">
              <h2>Check the flight as well as the destination.</h2>
              <p>
                {modeLabels[route.travelMode]} · {relationshipLabels[route.travellerRelationship]}.
                Country entry and airline acceptance are separate checks. Cargo alone does not make
                a journey commercial.
              </p>
              {flightFindings.map((finding) => (
                <details className="plan-assumptions" key={finding.id}>
                  <summary>
                    {finding.title}
                    <ChevronDown size={17} aria-hidden="true" />
                  </summary>
                  <p>{finding.summary}</p>
                  <FindingSources assessment={assessment} ids={finding.sourceIds} />
                </details>
              ))}
              <Button variant="outline" className="secondary-button" onClick={() => editJourney(2)}>
                <Pencil size={16} /> Change flight details
              </Button>
            </section>
          </TabsContent>
          <TabsContent value="sources">
            <section className="guide-section">
              <h2>The guidance behind your plan.</h2>
              <p>
                Official sources for the route. Research is unapproved; the authority’s current
                instructions and your pet’s circumstances take priority.
              </p>
              <div className="source-list">
                {sources.map((source) => (
                  <article key={source.id}>
                    <div>
                      <a href={source.url} target="_blank" rel="noreferrer">
                        {source.title} <ExternalLink size={14} />
                      </a>
                      <p>{source.authority}</p>
                    </div>
                  </article>
                ))}
              </div>
              <details className="plan-assumptions">
                <summary>
                  Research scope and outstanding checks <ChevronDown size={17} aria-hidden="true" />
                </summary>
                <p>
                  Research recorded {draft?.checkedOn ?? "2026-09-11"}. Publication approval has not
                  been given.
                </p>
                <ul>
                  {(draft?.unresolved ?? assessment.missingFacts).map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </details>
              <p className="section-footnote">
                Found a problem?{" "}
                <a href="mailto:help@zurtex.org?subject=Route%20guide%20correction">
                  Tell us what to check.
                </a>
              </p>
            </section>
          </TabsContent>
        </Tabs>
      </div>
      {packVisited && (
        <ReadyPackWorkspace
          assessment={assessment}
          active={packOpen}
          onBack={() => {
            setPackOpen(false);
            requestAnimationFrame(() => packButton.current?.focus());
          }}
        />
      )}
    </>
  );
}
function FindingSources({ assessment, ids }: { assessment: RouteGuideAssessment; ids: string[] }) {
  return (
    <div className="finding-sources">
      {assessment.evidence
        .filter((source) => ids.includes(source.id))
        .map((source) => (
          <a key={source.id} href={source.url} target="_blank" rel="noreferrer">
            {source.authority} <ExternalLink size={13} />
          </a>
        ))}
    </div>
  );
}
