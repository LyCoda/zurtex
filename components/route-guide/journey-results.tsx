"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Cat,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Dog,
  ExternalLink,
  FileText,
  ListChecks,
  Pencil,
  Plane,
  Printer,
  Search,
  ShieldCheck,
  ShieldQuestion,
  TriangleAlert,
} from "lucide-react";
import type { RouteGuideAssessment } from "@/lib/route-intelligence";
import type { DraftRequirement } from "@/lib/route-answer-drafts";
import type { VerificationClaim, VerificationReport } from "@/lib/source-verification-types";
import { purposeLabels } from "@/lib/journey-purpose";
import { RequirementCalendar } from "./researched-answer";
import { ReadyPackWorkspace } from "./ready-pack-workspace";

type GuideSource = { id: string; title: string; authority: string; url: string };
function sourceKey(source: GuideSource) {
  return source.url.split("#")[0].replace(/\/$/, "");
}
type Section = "arrival" | "departure";
const modeLabels = { cabin: "In the cabin", hold: "In the hold", cargo: "As cargo" };
const primaryStatuses = {
  more_information_needed: "More information needed",
  actions_required: "Actions required",
  plan_looks_feasible: "Plan looks feasible",
};
const claimLabels: Record<VerificationClaim["status"], string> = {
  supported: "Source supports this",
  changed: "Possible change — confirm this",
  unclear: "Needs source confirmation",
  unavailable: "Not checked against current text",
};

function formatDate(value: string, withTime = false) {
  const date = new Date(value.length === 10 ? `${value}T00:00:00Z` : value);
  if (!Number.isFinite(date.getTime())) return "Date not available";
  return (
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
      ...(withTime ? ({ hour: "2-digit", minute: "2-digit" } as const) : {}),
    }).format(date) + (withTime ? " UTC" : "")
  );
}

function stepId(section: Section, id: string) {
  return `journey-${section}-${id}`;
}

function SourceLinks({ ids, sources }: { ids: string[]; sources: GuideSource[] }) {
  return (
    <div className="journey-step-sources">
      {sources
        .filter((source) => ids.includes(source.id))
        .map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            title={source.title}
          >
            {source.authority}
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        ))}
    </div>
  );
}

function Checklist({
  items,
  section,
  sources,
  report,
  completed,
  onToggle,
}: {
  items: DraftRequirement[];
  section: Section;
  sources: GuideSource[];
  report?: VerificationReport;
  completed: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <ol className="journey-checklist">
      {items.map((item, index) => {
        const id = stepId(section, item.id);
        const claims =
          report?.claims.filter(
            (claim) => claim.section === section && claim.requirementId === item.id,
          ) ?? [];
        const timingClaim = claims.find((claim) => claim.id === `${section}:${item.id}:timing`);
        const timingFlagged =
          timingClaim && (timingClaim.status === "changed" || timingClaim.status === "unclear");
        const allSupported =
          timingClaim?.status === "supported" &&
          claims.every((claim) => claim.status === "supported") &&
          item.bullets.length > 0 &&
          item.bullets.every((bullet) =>
            claims.some((claim) => claim.text === bullet && claim.status === "supported"),
          );
        const needsAttention = claims.some(
          (claim) => claim.status === "changed" || claim.status === "unclear",
        );
        return (
          <li key={id} id={id} className={completed.has(id) ? "is-prepared" : undefined}>
            <div className="journey-step-mark">
              <span className="journey-step-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <label className="journey-step-check">
                <input type="checkbox" checked={completed.has(id)} onChange={() => onToggle(id)} />
                <span className="sr-only">Mark preparation complete: {item.title}</span>
              </label>
            </div>
            <details className="journey-step" open>
              <summary>
                <span className="journey-step-overview">
                  <span className="journey-step-labels">
                    <span>
                      {item.kind === "conditional"
                        ? "If applicable"
                        : item.kind === "planning"
                          ? "Planning step"
                          : "Requirement to arrange"}
                    </span>
                    {completed.has(id) && (
                      <span className="journey-prepared-label">
                        <Check size={13} aria-hidden="true" /> Preparation marked complete
                      </span>
                    )}
                  </span>
                  <strong>{item.title}</strong>
                  <span className="journey-step-timing">
                    <Clock3 size={15} aria-hidden="true" />
                    {item.timing}
                  </span>
                </span>
                <ChevronDown className="journey-chevron" size={19} aria-hidden="true" />
              </summary>
              <div className="journey-step-body">
                {timingFlagged && (
                  <div className="journey-claim-note">
                    <strong>Timing needs confirmation</strong>
                    <span>{timingClaim.note}</span>
                  </div>
                )}
                {item.calendar && (
                  <div className="journey-calendar-note">
                    <span>Conditional planning window</span>
                    <RequirementCalendar item={item} />
                  </div>
                )}
                <ul className="journey-step-bullets">
                  {item.bullets.map((bullet, bulletIndex) => {
                    const claim = claims.find((candidate) => candidate.text === bullet);
                    const flagged =
                      claim && (claim.status === "changed" || claim.status === "unclear");
                    return (
                      <li
                        key={`${id}-${bulletIndex}`}
                        className={flagged ? "journey-claim-attention" : undefined}
                      >
                        {bullet}
                        {flagged && (
                          <div className="journey-claim-note">
                            <strong>{claimLabels[claim.status]}</strong>
                            <span>{claim.note}</span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <SourceLinks ids={item.sourceIds} sources={sources} />
                <p className={`journey-evidence-note${needsAttention ? " needs-attention" : ""}`}>
                  {!report ? (
                    <>
                      <CircleHelp size={14} aria-hidden="true" /> Recorded official sources are
                      linked. No new live comparison was run for this search.
                    </>
                  ) : allSupported ? (
                    <>
                      <Check size={14} aria-hidden="true" /> Step details and timing supported by
                      retrieved text.
                    </>
                  ) : needsAttention ? (
                    <>
                      <CircleHelp size={14} aria-hidden="true" /> Resolve the source questions above
                      before relying on this step.
                    </>
                  ) : (
                    <>
                      Current-source support{" "}
                      {claims.some((claim) => claim.status === "supported")
                        ? "is partial"
                        : "has not been established"}{" "}
                      for this step.
                    </>
                  )}
                </p>
              </div>
            </details>
          </li>
        );
      })}
    </ol>
  );
}

function EvidenceLedger({
  sources,
  report,
  checkedOn,
}: {
  sources: GuideSource[];
  report?: VerificationReport;
  checkedOn?: string;
}) {
  const [query, setQuery] = useState("");
  const allSources = [...sources, ...(report?.sources ?? [])];
  const uniqueSources = [
    ...new Map(allSources.map((source) => [sourceKey(source), source])).values(),
  ];
  const claimsFor = (source: GuideSource) => {
    const aliases = new Set(
      allSources
        .filter((candidate) => sourceKey(candidate) === sourceKey(source))
        .map((candidate) => candidate.id),
    );
    return report?.claims.filter((claim) => claim.sourceIds.some((id) => aliases.has(id))) ?? [];
  };
  const search = query.trim().toLocaleLowerCase();
  const filtered = uniqueSources.filter((source) => {
    const claims = claimsFor(source);
    return [
      source.title,
      source.authority,
      source.url,
      ...claims.map((claim) => `${claim.text} ${claim.note}`),
    ]
      .join(" ")
      .toLocaleLowerCase()
      .includes(search);
  });
  const fetchedCount = new Set(
    report?.sources.filter((source) => source.status === "fetched").map(sourceKey),
  ).size;
  const supportedCount = report?.claims.filter((claim) => claim.status === "supported").length ?? 0;
  return (
    <section
      className="journey-section journey-evidence"
      id="journey-sources"
      aria-labelledby="journey-sources-title"
    >
      <div className="journey-section-heading">
        <h2 id="journey-sources-title">Follow the evidence.</h2>
        <span>{uniqueSources.length} sources</span>
      </div>
      <p>
        {report
          ? "Open a source to see what was retrieved and which statements the comparison supports. A page being available does not confirm every rule in this guide."
          : "Open the official sources used to prepare this research. They were not retrieved again for this search, so confirm time-sensitive requirements before relying on them."}
      </p>
      <div className="journey-evidence-summary">
        {report ? (
          <>
            <span>
              <strong>{fetchedCount}</strong> pages retrieved
            </span>
            <span>
              <strong>
                {supportedCount} / {report.claims.length}
              </strong>{" "}
              statements supported
            </span>
          </>
        ) : (
          <>
            <span>
              <strong>{uniqueSources.length}</strong> recorded sources
            </span>
            <span>Static research guide</span>
          </>
        )}
        <span>
          {report
            ? `Checked ${formatDate(report.checkedAt, true)}`
            : checkedOn
              ? `Research recorded ${formatDate(checkedOn)}`
              : "No current source check recorded"}
        </span>
      </div>
      {report && (
        <details className="journey-research-method">
          <summary>
            How this source check worked
            <ChevronDown size={16} aria-hidden="true" />
          </summary>
          <p>{report.summary}</p>
          <dl>
            <div>
              <dt>Discovery</dt>
              <dd>
                {report.discovery.method === "brave"
                  ? "Web search"
                  : report.discovery.method === "official-links"
                    ? "Official source links"
                    : "Unavailable"}{" "}
                · {report.discovery.found} pages found
              </dd>
            </div>
            <div>
              <dt>Evidence comparison</dt>
              <dd>
                {report.model.status === "available"
                  ? report.model.name
                  : report.model.status === "failed"
                    ? "Some model comparisons failed; unresolved statements stay marked"
                    : "Model not connected — source support remains limited"}
              </dd>
            </div>
            <div>
              <dt>Review scope</dt>
              <dd>
                Automated comparison with retrieved text. Your pet’s records, travel eligibility and
                human approval are not assessed.
              </dd>
            </div>
          </dl>
        </details>
      )}
      <label className="journey-source-search">
        <span className="sr-only">Search sources and evidence</span>
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search an authority, document or requirement"
        />
      </label>
      <p className="journey-search-count" role="status">
        {filtered.length} of {uniqueSources.length} sources
      </p>
      <div className="journey-source-list">
        {filtered.map((source) => {
          const matchingChecks = report?.sources.filter(
            (candidate) => sourceKey(candidate) === sourceKey(source),
          );
          const check =
            matchingChecks?.find((candidate) => candidate.status === "fetched") ??
            matchingChecks?.[0];
          const claims = claimsFor(source);
          const supported = claims.filter((claim) => claim.status === "supported").length;
          return (
            <details key={source.id} className="journey-source-row">
              <summary>
                <span>
                  <strong>{source.authority}</strong>
                  <span>{source.title}</span>
                </span>
                <span className="journey-source-state">
                  {!report
                    ? "Recorded source"
                    : check?.status === "fetched"
                      ? "Page retrieved"
                      : check?.status === "unsupported"
                        ? "Format not read"
                        : check?.status === "blocked"
                          ? "Retrieval blocked"
                          : "Not retrieved"}
                  <ChevronDown size={17} aria-hidden="true" />
                </span>
              </summary>
              <div className="journey-source-detail">
                <a href={source.url} target="_blank" rel="noreferrer">
                  Read the original source
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
                <p className="journey-source-url">{source.url}</p>
                {check && (
                  <p>
                    {check.note} {check.cachedComparison && "A cached comparison was reused."}{" "}
                    Checked {formatDate(check.checkedAt, true)}.
                  </p>
                )}
                <p>
                  {!report
                    ? "Used in the maintained research library. No live retrieval or statement comparison was run for this search."
                    : claims.length
                      ? `${supported} of ${claims.length} linked statements supported by retrieved text.`
                      : "No statement-level comparison is available for this source."}
                </p>
                {claims.map((claim) => (
                  <div className="journey-ledger-claim" key={claim.id}>
                    <strong
                      className={
                        claim.status === "changed" || claim.status === "unclear"
                          ? "needs-attention"
                          : undefined
                      }
                    >
                      {claimLabels[claim.status]}
                    </strong>
                    <p>{claim.text}</p>
                    <p>{claim.note}</p>
                    {claim.quote && <blockquote>{claim.quote}</blockquote>}
                  </div>
                ))}
              </div>
            </details>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <p className="journey-no-sources">
          No sources match “{query}”. Try an authority name or a shorter phrase.
        </p>
      )}
    </section>
  );
}

export function JourneyResults({
  assessment,
  onEdit,
}: {
  assessment: RouteGuideAssessment;
  onEdit: () => void;
}) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsVisited, setToolsVisited] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const toolsButton = useRef<HTMLButtonElement>(null);
  const { route, draftAnswer: draft, verification: report } = assessment;
  const sources: GuideSource[] = [...(draft?.sources ?? [])];
  for (const source of assessment.evidence) {
    if (!sources.some((known) => known.id === source.id)) sources.push(source);
  }
  const arrival: DraftRequirement[] =
    draft?.requirements ??
    assessment.findings
      .filter((finding) => finding.group === "government")
      .map((finding) => ({
        id: finding.id,
        title: finding.title,
        kind: "planning",
        timing: "Confirm before booking",
        bullets: [finding.summary],
        sourceIds: finding.sourceIds,
      }));
  const departure = draft?.departureRequirements ?? [];
  const allSteps = [
    ...arrival.map((item) => ({ item, section: "arrival" as const })),
    ...departure.map((item) => ({ item, section: "departure" as const })),
  ];
  const documentSteps = allSteps.filter(({ item }) =>
    /certificat|permit|document|paperwork|record|passport|notif|endorse|declar|application|register|CVI|EHC/i.test(
      item.title,
    ),
  );
  const dates = allSteps.filter(({ item }) => item.calendar);
  const unknowns = [...new Set(draft?.unresolved ?? assessment.missingFacts)];
  const flights = assessment.findings.filter(
    (finding) => finding.group === "airline" || finding.group === "itinerary",
  );
  const total = allSteps.length;
  const progress = total ? Math.round((completed.size / total) * 100) : 0;
  const status =
    report?.status === "attention" ? "More information needed" : primaryStatuses[assessment.status];

  useEffect(() => {
    heading.current?.focus();
  }, []);
  function toggleStep(id: string) {
    setCompleted((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  return (
    <>
      <div className="journey-field-guide" hidden={toolsOpen}>
        <header className="journey-guide-header">
          <div className="journey-toolbar">
            <button type="button" onClick={onEdit}>
              <ArrowLeft size={16} aria-hidden="true" />
              Edit journey
            </button>
            <span>Free travel guide</span>
            <button type="button" onClick={() => window.print()}>
              <Printer size={16} aria-hidden="true" />
              Print guide
            </button>
          </div>
          <h1 tabIndex={-1} ref={heading}>
            <span>{route.origin}</span>
            <ArrowRight aria-label="to" />
            <span>{route.destination}</span>
          </h1>
          <div className="journey-route-facts">
            <span>
              {route.species === "dog" ? (
                <Dog size={19} aria-hidden="true" />
              ) : (
                <Cat size={19} aria-hidden="true" />
              )}
              {route.petCount} {route.species}
              {route.petCount > 1 ? "s" : ""}
            </span>
            <span>
              <CalendarDays size={18} aria-hidden="true" />
              Arrive {formatDate(route.intendedArrival)}
            </span>
            <span>{purposeLabels[route.movementPurpose]}</span>
          </div>
          <section className="journey-route-summary" aria-label="Journey assessment">
            <div className="journey-summary-copy">
              <span className="journey-primary-status">{status}</span>
              <h2>{draft?.headline ?? "Start with the right preparations."}</h2>
              <p>{draft?.summary ?? assessment.explanation}</p>
            </div>
            <div className="journey-summary-scope">
              <FileText size={24} aria-hidden="true" />
              <strong>Your outward journey</strong>
              <p>
                Entry to {route.destination}, with departure preparations for {route.origin}.
              </p>
              <span>A return journey needs its own guide.</span>
            </div>
          </section>
          {draft?.quarantine && (
            <section
              className={`journey-quarantine-status journey-quarantine-status--${draft.quarantine.status}`}
              aria-label="Quarantine assessment"
            >
              {draft.quarantine.status === "not-normally-required" ? (
                <ShieldCheck size={22} aria-hidden="true" />
              ) : draft.quarantine.status === "required" ? (
                <TriangleAlert size={22} aria-hidden="true" />
              ) : (
                <ShieldQuestion size={22} aria-hidden="true" />
              )}
              <div>
                <span>Quarantine</span>
                <strong>{draft.quarantine.label}</strong>
                <p>{draft.quarantine.summary}</p>
              </div>
            </section>
          )}
          <div className="journey-verification-line">
            <CircleHelp size={17} aria-hidden="true" />
            <p>
              {!report
                ? "This guide was assembled from our maintained research library. Source links, research dates and known gaps are shown below."
                : report.status === "supported"
                  ? "The automated comparison supports the checklist statements. Your pet’s records and eligibility still need checking."
                  : report?.status === "attention"
                    ? "The source comparison found statements to clarify. The affected steps are marked below."
                    : report.model.status === "failed"
                      ? "Some live comparisons could not finish. Successful checks and unresolved statements are shown separately below."
                      : report.model.status !== "available"
                        ? "Live claim verification is unavailable. This is a source-linked research draft; current requirements need confirmation."
                        : "The source check is incomplete. Unconfirmed statements remain marked in your guide."}{" "}
              <a href="#journey-sources">See the evidence</a>
            </p>
          </div>
        </header>

        <div className="journey-guide-layout">
          <aside
            className="journey-planning-rail"
            aria-label="Guide navigation and preparation progress"
          >
            <div className="journey-rail-progress">
              <div>
                <ListChecks size={19} aria-hidden="true" />
                <strong>Your preparation</strong>
              </div>
              <p>
                <span>
                  {completed.size} of {total}
                </span>{" "}
                steps marked complete
              </p>
              <progress
                value={completed.size}
                max={total || 1}
                aria-label="Preparation steps marked complete"
              />
              <small>Your marks stay in this page. They don’t confirm travel eligibility.</small>
            </div>
            <nav aria-label="In this guide">
              <a href="#journey-arrival">
                Entry checklist<span>{arrival.length}</span>
              </a>
              <a href="#journey-departure">
                Before departure<span>{departure.length}</span>
              </a>
              <a href="#journey-documents">Documents</a>
              <a href="#journey-flights">Flights & connections</a>
              <a href="#journey-questions">Still to confirm</a>
              <a href="#journey-sources">Sources & evidence</a>
            </nav>
            <div className="journey-rail-dates">
              <h2>
                <CalendarDays size={18} aria-hidden="true" />
                Keep an eye on timing
              </h2>
              {dates.length ? (
                dates.map(({ item, section }) => (
                  <a key={stepId(section, item.id)} href={`#${stepId(section, item.id)}`}>
                    <strong>{item.title}</strong>
                    <RequirementCalendar item={item} />
                  </a>
                ))
              ) : (
                <p>
                  Read each step’s timing before making appointments. A personal deadline cannot be
                  set until your pet’s records and route conditions are checked.
                </p>
              )}
              <p className="journey-date-limit">
                Target arrival: {formatDate(route.intendedArrival)}. Dates shown are conditional
                planning windows.
              </p>
            </div>
          </aside>

          <div className="journey-guide-body">
            {draft?.blockingNotes.length ? (
              <div className="journey-blocking-notes">
                {draft.blockingNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            ) : null}
            <section
              className="journey-section"
              id="journey-arrival"
              aria-labelledby="journey-arrival-title"
            >
              <div className="journey-section-heading">
                <h2 id="journey-arrival-title">
                  {draft?.guideKind === "purpose-review"
                    ? "First, confirm your travel process."
                    : `Getting into ${route.destination}.`}
                </h2>
                <span>{arrival.length} steps</span>
              </div>
              <p>
                {draft?.guideKind === "purpose-review"
                  ? "The full entry checklist depends on that decision. Start with these questions for the authorities."
                  : "Work through these in order, with your vet where needed. Check off each preparation as you arrange it."}
              </p>
              <Checklist
                items={arrival}
                section="arrival"
                sources={sources}
                report={report}
                completed={completed}
                onToggle={toggleStep}
              />
            </section>
            <section
              className="journey-section"
              id="journey-departure"
              aria-labelledby="journey-departure-title"
            >
              <div className="journey-section-heading">
                <h2 id="journey-departure-title">Before you leave {route.origin}.</h2>
                <span>{departure.length} steps</span>
              </div>
              <p>
                Arrange these alongside the entry checklist. “Export” on an official form can mean
                taking your own pet abroad.
              </p>
              {departure.length ? (
                <Checklist
                  items={departure}
                  section="departure"
                  sources={sources}
                  report={report}
                  completed={completed}
                  onToggle={toggleStep}
                />
              ) : (
                <p className="journey-open-question">
                  Departure requirements have not been fully established for this journey. Confirm
                  the documents and any endorsement with the departure authority.
                </p>
              )}
            </section>
            <section
              className="journey-section"
              id="journey-documents"
              aria-labelledby="journey-documents-title"
            >
              <div className="journey-section-heading">
                <h2 id="journey-documents-title">The paperwork to bring together.</h2>
                <FileText size={23} aria-hidden="true" />
              </div>
              <p>
                Bring these document questions to your vet or the authority. Each links to the full
                step, including its conditions and recorded official sources.
              </p>
              {documentSteps.length ? (
                <ul className="journey-document-list">
                  {documentSteps.map(({ item, section }) => {
                    const needsConfirmation = report?.claims.some(
                      (claim) =>
                        claim.requirementId === item.id &&
                        claim.section === section &&
                        (claim.status === "changed" || claim.status === "unclear"),
                    );
                    return (
                      <li key={stepId(section, item.id)}>
                        <FileText size={18} aria-hidden="true" />
                        <div>
                          <a href={`#${stepId(section, item.id)}`}>
                            {item.title}
                            <ArrowRight size={15} aria-hidden="true" />
                          </a>
                          <p>
                            {item.timing}
                            {item.kind === "conditional" ? " · If applicable" : ""}
                          </p>
                          <p className="journey-document-detail">
                            {item.bullets.find((bullet) =>
                              /certificat|permit|document|record|passport|CVI|EHC/i.test(bullet),
                            ) ?? item.bullets[0]}
                          </p>
                          {needsConfirmation && (
                            <div className="journey-claim-note">
                              <strong>Needs source confirmation</strong>
                              <span>
                                Resolve the source questions in the linked step before relying on
                                this document or its timing.
                              </span>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="journey-open-question">
                  The exact documents are not determined yet. Confirm the travel process before
                  arranging dated paperwork.
                </p>
              )}
            </section>
            <section
              className="journey-section"
              id="journey-flights"
              aria-labelledby="journey-flights-title"
            >
              <div className="journey-section-heading">
                <h2 id="journey-flights-title">Make the flight work, too.</h2>
                <Plane size={24} aria-hidden="true" />
              </div>
              <p>
                {modeLabels[route.travelMode]} ·{" "}
                {route.operatingAirline ?? route.airline ?? "Airline not selected"}
                {route.transitCountry ? ` · Connection in ${route.transitCountry}` : ""}. Country
                entry and airline acceptance need separate checks.
              </p>
              <div className="journey-flight-findings">
                {flights.map((finding) => (
                  <article key={finding.id}>
                    <h3>{finding.title}</h3>
                    <p>{finding.summary}</p>
                    <SourceLinks
                      ids={finding.sourceIds}
                      sources={[
                        ...sources,
                        ...assessment.evidence.filter(
                          (source) => !sources.some((known) => known.id === source.id),
                        ),
                      ]}
                    />
                  </article>
                ))}
              </div>
              <button className="journey-text-button" type="button" onClick={onEdit}>
                <Pencil size={15} aria-hidden="true" />
                Edit flight or connection details
              </button>
            </section>
            <section
              className="journey-section"
              id="journey-questions"
              aria-labelledby="journey-questions-title"
            >
              <div className="journey-section-heading">
                <h2 id="journey-questions-title">Still to confirm.</h2>
                <CircleHelp size={24} aria-hidden="true" />
              </div>
              <p>
                Bring these questions to your vet, the authorities or the operating airline before
                relying on the plan.
              </p>
              {unknowns.length > 0 && (
                <ul className="journey-unknowns">
                  {unknowns.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              )}
              <details className="journey-assumptions">
                <summary>
                  What this guide assumes
                  <ChevronDown size={17} aria-hidden="true" />
                </summary>
                <ul>
                  {(draft
                    ? [...draft.assumptions, ...draft.routeFacts]
                    : [assessment.explanation]
                  ).map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </details>
            </section>
            <EvidenceLedger sources={sources} report={report} checkedOn={draft?.checkedOn} />
            <aside className="journey-tools-offer">
              <div>
                <h2>Take the next step together.</h2>
                <p>Keep your vet brief and document notes in the free travel tools.</p>
              </div>
              <button
                className="journey-primary-button"
                type="button"
                ref={toolsButton}
                onClick={() => {
                  setToolsVisited(true);
                  setToolsOpen(true);
                }}
              >
                Open travel tools
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </aside>
            <div className="journey-guide-footer">
              <p>
                Need a hand? <a href="/consultation">Explore a Pet Travel Consultation</a>
              </p>
              <p>
                Found something to check?{" "}
                <a href="mailto:help@zurtex.org?subject=Route%20guide%20correction">
                  Tell us about it
                </a>
              </p>
              <p>
                Research preview. No human approval or travel clearance is implied. Preparation
                marks and notes clear when you refresh or leave.
              </p>
            </div>
          </div>
        </div>
        <div className="journey-print-status">
          Preparation marked complete: {completed.size} of {total} steps ({progress}%). These marks
          reflect your own preparation, not verification or approval.
        </div>
      </div>
      {toolsVisited && (
        <ReadyPackWorkspace
          assessment={assessment}
          active={toolsOpen}
          onBack={() => {
            setToolsOpen(false);
            requestAnimationFrame(() => toolsButton.current?.focus());
          }}
        />
      )}
    </>
  );
}
