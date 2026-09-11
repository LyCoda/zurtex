import { ChevronDown, ExternalLink } from "lucide-react";
import type { DraftRequirement, DraftRouteAnswer } from "@/lib/route-answer-drafts";

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(value + "T00:00:00Z"));
}
export function RequirementCalendar({ item }: { item: DraftRequirement }) {
  if (!item.calendar) return null;
  const { from, to, note } = item.calendar;
  return (
    <p className="requirement-calendar">
      <strong>{from === to ? dateLabel(to) : `${dateLabel(from)} – ${dateLabel(to)}`}</strong>
      <span>{note}</span>
    </p>
  );
}

export function RequirementList({
  items,
  sources,
}: {
  items: DraftRequirement[];
  sources: DraftRouteAnswer["sources"];
}) {
  return (
    <ol className="compact-requirements">
      {items.map((item, i) => (
        <li key={item.id}>
          <details className="requirement-disclosure">
            <summary>
              <span className="requirement-number" aria-hidden="true">
                {i + 1}
              </span>
              <span className="requirement-overview">
                <strong>{item.title}</strong>
                <span className="compact-timing">
                  {item.kind === "conditional" && <em>If applicable · </em>}
                  {item.timing}
                </span>
                {item.calendar && (
                  <span className="compact-date">
                    {item.calendar.from === item.calendar.to
                      ? dateLabel(item.calendar.to)
                      : `${dateLabel(item.calendar.from)} – ${dateLabel(item.calendar.to)}`}{" "}
                    · conditional planning date
                  </span>
                )}
              </span>
              <ChevronDown className="requirement-chevron" size={19} aria-hidden="true" />
            </summary>
            <div className="requirement-detail">
              <RequirementCalendar item={item} />
              <ul className="requirement-bullets">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {item.sourceIds.length > 0 && (
                <div className="finding-sources">
                  {sources
                    .filter((s) => item.sourceIds.includes(s.id))
                    .map((s) => (
                      <a key={s.id} href={s.url} target="_blank" rel="noreferrer" title={s.title}>
                        {s.authority} <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    ))}
                </div>
              )}
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}

export function ResearchedAnswer({ answer }: { answer: DraftRouteAnswer }) {
  return (
    <section
      className="guide-section researched-answer"
      id="checklist"
      aria-labelledby="checklist-title"
    >
      {answer.blockingNotes.map((note) => (
        <p className="route-blocking-note" key={note}>
          {note}
        </p>
      ))}
      <div className="section-heading">
        <div>
          <h2 id="checklist-title">
            {answer.guideKind === "purpose-review" ? "Your next steps" : "Do these in order"}{" "}
            <span className="step-total">({answer.requirements.length})</span>
          </h2>
          <p>
            {answer.guideKind === "purpose-review"
              ? "Confirm the process first. The full entry requirements are not yet determined."
              : "The essentials first. Open a step for the details and official guidance."}
          </p>
        </div>
      </div>
      <RequirementList items={answer.requirements} sources={answer.sources} />
      {answer.departureRequirements.length > 0 && (
        <div className="departure-requirements" id="departure-checklist">
          <h2>Also arrange before you leave</h2>
          <p>
            Do this alongside the steps above. “Export” on an official form can simply mean taking
            your own pet out of {answer.originName}.
          </p>
          <RequirementList items={answer.departureRequirements} sources={answer.sources} />
        </div>
      )}
      <details className="plan-assumptions">
        <summary>
          What this plan assumes <ChevronDown size={17} aria-hidden="true" />
        </summary>
        <ul>
          {[...answer.assumptions, ...answer.routeFacts].map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </details>
    </section>
  );
}
