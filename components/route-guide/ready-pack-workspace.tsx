"use client";

import { ArrowLeft, ExternalLink, FileText, Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { RouteGuideAssessment } from "@/lib/route-intelligence";
import type { DraftRequirement } from "@/lib/route-answer-drafts";
import { RequirementCalendar, RequirementList } from "./researched-answer";
import { purposeLabels } from "@/lib/journey-purpose";

const documents = [
  [
    "identification",
    "Microchip record",
    "Bring the record to your vet; matching details have not been checked.",
  ],
  [
    "vaccination",
    "Vaccination history",
    "Ask the vet to confirm valid-from, expiry and any waiting period.",
  ],
  [
    "certificate",
    "Travel certificate or permit",
    "The correct document depends on the confirmed pathway.",
  ],
  [
    "carrier",
    "Written airline confirmation",
    "Cover the actual operator, flight, pet and carrier or crate.",
  ],
];
const tabs = [
  ["preparation", "Preparation"],
  ["vet", "Vet brief"],
  ["documents", "Documents"],
  ["sources", "Sources"],
];

export function ReadyPackWorkspace({
  assessment,
  active,
  onBack,
}: {
  assessment: RouteGuideAssessment;
  active: boolean;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState("preparation");
  const [documentStates, setDocumentStates] = useState<Record<string, string>>({});
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (active) {
      heading.current?.focus();
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [active]);
  const { route, draftAnswer } = assessment;
  const sources = draftAnswer
    ? draftAnswer.sources.map((s) => ({ ...s, checkedOn: draftAnswer.checkedOn }))
    : assessment.evidence;
  const missing = draftAnswer?.unresolved ?? assessment.missingFacts;
  const steps: DraftRequirement[] =
    draftAnswer?.requirements ??
    assessment.findings
      .filter((f) => f.group === "government")
      .map((f) => ({
        id: f.id,
        title: f.title,
        kind: "conditional" as const,
        timing: "Timing not assessed",
        bullets: [f.summary],
        sourceIds: f.sourceIds,
      }));

  function stepList(items: DraftRequirement[]) {
    return (
      <ol className="pack-preparation">
        {items.map((step, i) => (
          <li key={step.id}>
            <span aria-hidden="true">{i + 1}</span>
            <div>
              <span className={`requirement-badge requirement-badge--${step.kind}`}>
                {step.kind === "planning"
                  ? "Planning advice"
                  : step.kind === "conditional"
                    ? "If this applies"
                    : "Required"}
              </span>
              <h3>{step.title}</h3>
              <strong>{step.timing}</strong>
              <RequirementCalendar item={step} />
              <ul className="pack-step-bullets">
                {step.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="finding-sources">
                {sources
                  .filter((source) => step.sourceIds.includes(source.id))
                  .map((source) => (
                    <a
                      key={source.id}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      title={source.title}
                    >
                      {source.authority} <ExternalLink size={13} aria-hidden="true" />
                      <span className="print-source-url">{source.url}</span>
                    </a>
                  ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  function preparation(print = false) {
    return (
      <>
        <h2>A plan to bring to the conversation</h2>
        <p>
          Arriving {route.intendedArrival} is your target. These are preparation steps, not
          personalised deadlines. A full reverse timeline needs approved rules and your pet’s
          records.
        </p>
        <h3>For entering {route.destination}</h3>
        {print ? stepList(steps) : <RequirementList items={steps} sources={sources} />}
        {draftAnswer && draftAnswer.departureRequirements.length > 0 && (
          <>
            <h3>Before leaving {route.origin}</h3>
            <p>Arrange these alongside the entry steps, not after completing them.</p>
            {print ? (
              stepList(draftAnswer.departureRequirements)
            ) : (
              <RequirementList items={draftAnswer.departureRequirements} sources={sources} />
            )}
          </>
        )}
        <h3>Before you book</h3>
        <p>
          Confirm your{" "}
          {route.travelMode === "cabin" ? "cabin" : route.travelMode === "hold" ? "hold" : "cargo"}{" "}
          arrangements with {route.operatingAirline ?? "the operating airline"}. Pet acceptance,
          carrier dimensions and space have not been confirmed.
        </p>
        {route.transitCountry && (
          <p>
            Your connection in {route.transitCountry} needs a separate entry and handling review.
          </p>
        )}
      </>
    );
  }
  function vet() {
    return (
      <>
        <h2>Take this to your vet</h2>
        <p>
          This is a discussion brief, not a certificate or medical recommendation. No records have
          been uploaded or examined.
        </p>
        <dl className="vet-brief">
          <div>
            <dt>Journey</dt>
            <dd>
              {route.origin} to {route.destination}
            </dd>
          </div>
          <div>
            <dt>Pet</dt>
            <dd>
              {route.petCount ?? 1} {route.species}
              {(route.petCount ?? 1) > 1 ? "s" : ""}, {purposeLabels[route.movementPurpose]}
            </dd>
          </div>
          <div>
            <dt>Target arrival</dt>
            <dd>{route.intendedArrival} · Feasibility not assessed</dd>
          </div>
          <div>
            <dt>Who travels</dt>
            <dd>
              {route.travellerRelationship === "owner"
                ? "With the owner"
                : route.travellerRelationship === "family"
                  ? "With a family member"
                  : "With an authorised person"}
            </dd>
          </div>
          {route.travellerRelationship !== "owner" && (
            <div>
              <dt>When the owner travels</dt>
              <dd>
                {
                  {
                    together: "On the same journey as the pet",
                    "within-five-days": "Within 5 days before or after the pet",
                    "outside-five-days": "More than 5 days apart, or the owner is not travelling",
                    unknown: "Not yet known. Confirm before choosing the travel process.",
                  }[route.ownerTravelTiming ?? "unknown"]
                }
              </dd>
            </div>
          )}
        </dl>
        <h3>Bring along</h3>
        <p>
          The microchip record, full vaccination history, any existing pet travel document and the
          proposed flight itinerary.
        </p>
        <h3>Work through together</h3>
        <ul className="pack-question-list">
          <li>Does identification match the records, and is the vaccination sequence valid?</li>
          <li>What are the confirmed vaccine validity dates and any required waiting period?</li>
          <li>Which certificate, permit, test or treatment applies to this specific journey?</li>
          <li>Who issues or endorses the documents, and when should appointments be booked?</li>
          <li>Are there any individual health or fitness-to-travel concerns?</li>
        </ul>
        <p>
          Any vaccination or treatment decision belongs with the veterinarian. This preview does not
          prescribe care.
        </p>
      </>
    );
  }
  function tracker(print = false) {
    return (
      <>
        <h2>Keep the paperwork together</h2>
        <p>
          These are your own preparation notes. “Have a copy” does not mean the document is valid or
          has been reviewed.
        </p>
        <div className="document-tracker">
          {documents.map(([id, title, detail]) => (
            <div className="document-row" key={id}>
              <div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
              {print ? (
                <strong>{documentStates[id] ?? "Not started"}</strong>
              ) : (
                <NativeSelect
                  aria-label={`${title} preparation status`}
                  value={documentStates[id] ?? "Not started"}
                  onChange={(e) =>
                    setDocumentStates((previous) => ({ ...previous, [id]: e.target.value }))
                  }
                >
                  <option>Not started</option>
                  <option>Requested</option>
                  <option>Have a copy</option>
                  <option>Question for my vet</option>
                </NativeSelect>
              )}
            </div>
          ))}
        </div>
        <p className="section-footnote">
          Kept only while this page is open. Refreshing, leaving or editing the journey clears these
          notes. No uploads or medical identifiers are collected.
        </p>
      </>
    );
  }
  function evidence() {
    return (
      <>
        <h2>What this draft is based on</h2>
        <p>
          Research is not publication approval. Check the current authority instructions before
          relying on a requirement.
        </p>
        <div className="source-list">
          {sources.map((s) => (
            <article key={s.id}>
              <div>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title} <ExternalLink size={14} />
                </a>
                <p>{s.authority}</p>
                <span className="print-source-url">{s.url}</span>
              </div>
              <small>
                Research recorded {s.checkedOn}
                <br />
                Not publication-approved
              </small>
            </article>
          ))}
        </div>
        <p>
          Research version: {draftAnswer?.version ?? "Source ledger · 2026-09-11"}. Reviewer: not
          assigned. Approval: none.
        </p>
      </>
    );
  }
  return (
    <div className="ready-workspace" hidden={!active}>
      <div className="pack-toolbar no-print">
        <Button variant="ghost" className="text-link" onClick={onBack}>
          <ArrowLeft size={17} /> Back to your free guide
        </Button>
        <Button variant="outline" className="secondary-button" onClick={() => window.print()}>
          <Printer size={17} /> Print working draft
        </Button>
      </div>
      <header className="pack-heading">
        <FileText size={28} aria-hidden="true" />
        <div>
          <h1 ref={heading} tabIndex={-1}>
            Your free travel tools
          </h1>
          <p>
            {route.origin} to {route.destination} · {route.petCount ?? 1} {route.species}
            {(route.petCount ?? 1) > 1 ? "s" : ""} · Arriving {route.intendedArrival}
          </p>
        </div>
      </header>
      <div className="draft-notice">
        <strong>Working draft · Not human reviewed</strong>
        <p>
          This is your own preparation workspace, not confirmation that your pet can travel. It
          covers the outbound journey only.
        </p>
      </div>
      {draftAnswer?.blockingNotes.map((note) => (
        <p className="route-blocking-note" key={note}>
          {note}
        </p>
      ))}
      {draftAnswer && (
        <>
          <details className="preview-assumptions no-print">
            <summary>Scope of this research preview</summary>
            <ul>
              {draftAnswer.assumptions.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </details>
          <div className="print-only">
            <h2>Scope of this research preview</h2>
            <ul>
              {draftAnswer.assumptions.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </>
      )}
      <div className="pack-workspace-layout">
        <div className="pack-main">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(String(value))}
            className="pack-tabs no-print"
          >
            <TabsList variant="line" aria-label="Travel tools sections">
              {tabs.map(([id, title]) => (
                <TabsTrigger key={id} value={id}>
                  {title}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="preparation">{preparation()}</TabsContent>
            <TabsContent value="vet">{vet()}</TabsContent>
            <TabsContent value="documents">{tracker()}</TabsContent>
            <TabsContent value="sources">{evidence()}</TabsContent>
          </Tabs>
          <div className="print-only">
            <section>{preparation(true)}</section>
            <section>{vet()}</section>
            <section>{tracker(true)}</section>
            <section>{evidence()}</section>
            <section>
              <h2>Still to be checked</h2>
              <ul>
                {missing.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </section>
          </div>
          <details className="pack-open-items no-print">
            <summary>Still to be checked</summary>
            <ul>
              {missing.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </details>
        </div>
        <aside className="pack-purchase no-print">
          <h2>A person to talk it through with.</h2>
          <p>Pet Travel Consultation · US$5 for one planned journey.</p>
          <p>
            A personal review, a call without a fixed time limit, and a written recap with no fixed
            delivery deadline.
          </p>
          <a className="primary-button" href="/consultation">
            See the consultation
          </a>
          <p className="section-footnote">
            These tools stay free. Booking starts with a temporary payment hold, followed by human
            approval. It does not confirm an appointment time.
          </p>
        </aside>
      </div>
      <p className="print-disclaimer">
        Zurtex · Unreviewed working draft · No payment or review has taken place. Government entry
        and airline acceptance require separate confirmation.
      </p>
    </div>
  );
}
