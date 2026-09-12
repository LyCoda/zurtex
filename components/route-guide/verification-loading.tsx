"use client";

import { ArrowLeft, ArrowRight, Check, CircleAlert, PlaneLanding } from "lucide-react";
import { useEffect, useRef } from "react";
import type { RouteGuideRequest } from "@/lib/route-intelligence";
import type { VerificationProgress, VerificationStage } from "@/lib/source-verification-types";

const stages: { id: VerificationStage; title: string; description: string }[] = [
  {
    id: "prepare",
    title: "Match your journey",
    description: "Select the saved guidance for this route, species and travel purpose.",
  },
  {
    id: "departure",
    title: "Arrange departure steps",
    description: "Organise the researched export guidance for your starting country.",
  },
  {
    id: "arrival",
    title: "Arrange arrival steps",
    description: "Organise the researched entry guidance for your destination.",
  },
  {
    id: "compare",
    title: "Connect the sources",
    description: "Attach the recorded official sources and their checked dates.",
  },
  {
    id: "compose",
    title: "Bring your guide together",
    description: "Keep documented guidance and open questions visible.",
  },
];

export function VerificationLoading({
  form,
  origin,
  destination,
  progress,
  onCancel,
}: {
  form: RouteGuideRequest;
  origin: string;
  destination: string;
  progress: Partial<Record<VerificationStage, VerificationProgress>>;
  onCancel: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, []);
  const completed = stages.filter(
    (stage) => progress[stage.id] && progress[stage.id]?.state !== "running",
  ).length;
  const active = [...stages].reverse().find((stage) => progress[stage.id]?.state === "running");
  const activity = active ? progress[active.id]?.message : "Starting your route guide…";
  const journeyPosition = completed / stages.length;
  // The plane follows the same staged assembly sequence as the visible progress bar.
  const planeX =
    (1 - journeyPosition) ** 2 * 42 +
    2 * (1 - journeyPosition) * journeyPosition * 114 +
    journeyPosition ** 2 * 196;
  const planeY =
    (1 - journeyPosition) ** 2 * 76 +
    2 * (1 - journeyPosition) * journeyPosition * 6 +
    journeyPosition ** 2 * 68;
  return (
    <section className="verification-screen" aria-labelledby="verification-heading">
      <div className="verification-toolbar">
        <button type="button" onClick={onCancel}>
          <ArrowLeft size={17} /> Cancel and edit journey
        </button>
        <span>
          {form.petCount ?? 1} {form.species}
          {(form.petCount ?? 1) > 1 ? "s" : ""} · Outbound journey
        </span>
      </div>
      <div className="verification-route">
        <span>{origin}</span>
        <ArrowRight aria-label="to" />
        <span>{destination}</span>
      </div>
      <div className="verification-layout">
        <div className="verification-story">
          <div className="verification-journey" aria-hidden="true">
            <svg className="verification-map" viewBox="0 0 240 112" fill="none" focusable="false">
              <path
                className="verification-map-sheet"
                d="m20 42 62-13 64 13 74-13v60l-74 13-64-13-62 13Z"
              />
              <path className="verification-map-fold" d="M82 29v60m64-47v60" />
              <path className="verification-map-route" d="M42 76Q114 6 196 68" />
              <circle className="verification-map-origin" cx="42" cy="76" r="2.5" />
              <path className="verification-map-arrival" d="M184 84h24" />
              <g
                className="verification-plane"
                style={{ transform: `translate(${planeX}px, ${planeY}px)` }}
              >
                <circle r="17" />
                <PlaneLanding x={-12} y={-12} size={24} strokeWidth={1.65} />
              </g>
            </svg>
          </div>
          <h1 ref={heading} tabIndex={-1} id="verification-heading">
            Putting your journey
            <br />guide together.
          </h1>
          <p>
            We’re organising our researched guidance around the journey details you provided.
          </p>
          <p className="verification-activity" role="status" aria-live="polite" aria-atomic="true">
            {activity}
          </p>
          <div className="verification-meter-label">
            <span>Guide progress</span>
            <strong>
              {completed} of {stages.length} stages finished
            </strong>
          </div>
          <progress
            className="verification-meter"
            max={stages.length}
            value={completed}
            aria-label="Route guide stages finished"
          />
          <p className="verification-honesty">
            This guide uses our maintained research library. Its source dates, limitations and
            anything still needing confirmation will remain visible in your result.
          </p>
        </div>
        <ol className="verification-stages" aria-label="Route guide stages">
          {stages.map((stage, index) => {
            const state = progress[stage.id]?.state ?? "waiting";
            return (
              <li
                key={stage.id}
                data-state={state}
                aria-current={state === "running" ? "step" : undefined}
              >
                <span className="verification-stage-mark" aria-hidden="true">
                  {state === "complete" ? (
                    <Check size={18} />
                  ) : state === "limited" ? (
                    <CircleAlert size={18} />
                  ) : (
                    index + 1
                  )}
                </span>
                <div>
                  <strong>{stage.title}</strong>
                  <p>{state === "limited" ? progress[stage.id]?.message : stage.description}</p>
                  <span className="verification-stage-state">
                    {state === "running"
                      ? "Working now"
                      : state === "complete"
                        ? "Finished"
                        : state === "limited"
                          ? "Finished with gaps"
                          : "Up next"}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
