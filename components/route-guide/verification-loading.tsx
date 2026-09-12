"use client";

import { ArrowLeft, ArrowRight, Check, CircleAlert, FileSearch, PawPrint } from "lucide-react";
import { useEffect, useRef } from "react";
import type { RouteGuideRequest } from "@/lib/route-intelligence";
import type { VerificationProgress, VerificationStage } from "@/lib/source-verification-types";

const stages: { id: VerificationStage; title: string; description: string }[] = [
  { id: "prepare", title: "Find the right guidance", description: "Match the route, species and travel purpose." },
  { id: "departure", title: "Check departure requirements", description: "Read the export authority's guidance." },
  { id: "arrival", title: "Read the destination rules", description: "Find entry conditions and related official guidance." },
  { id: "compare", title: "Cross-check the evidence", description: "Compare the checklist with the sources we could read." },
  { id: "compose", title: "Bring your guide together", description: "Keep supported findings and open questions visible." },
];

export function VerificationLoading({ form, origin, destination, progress, onCancel }: {
  form: RouteGuideRequest;
  origin: string;
  destination: string;
  progress: Partial<Record<VerificationStage, VerificationProgress>>;
  onCancel: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, []);
  const completed = stages.filter((stage) => progress[stage.id] && progress[stage.id]?.state !== "running").length;
  const active = [...stages].reverse().find((stage) => progress[stage.id]?.state === "running");
  const activity = active ? progress[active.id]?.message : "Connecting to your source check…";
  return (
    <section className="verification-screen" aria-labelledby="verification-heading">
      <div className="verification-toolbar">
        <button type="button" onClick={onCancel}><ArrowLeft size={17} /> Cancel and edit journey</button>
        <span>{form.petCount ?? 1} {form.species}{(form.petCount ?? 1) > 1 ? "s" : ""} · Outbound journey</span>
      </div>
      <div className="verification-route"><span>{origin}</span><ArrowRight aria-label="to" /><span>{destination}</span></div>
      <div className="verification-layout">
        <div className="verification-story">
          <div className="verification-journey" aria-hidden="true">
            <div className="verification-station"><PawPrint size={26} /></div>
            <div className="verification-track"><span style={{ width: `${completed / stages.length * 100}%` }} /><i /></div>
            <div className="verification-station verification-station--arrival"><FileSearch size={26} /></div>
          </div>
          <h1 ref={heading} tabIndex={-1} id="verification-heading">A little checking.<br />A clearer journey.</h1>
          <p>We’re opening the official guidance for your route and checking it against your travel checklist.</p>
          <p className="verification-activity" role="status" aria-live="polite" aria-atomic="true">{activity}</p>
          <div className="verification-meter-label"><span>Source-check progress</span><strong>{completed} of {stages.length} stages finished</strong></div>
          <progress className="verification-meter" max={stages.length} value={completed} aria-label="Source-check stages finished" />
          <p className="verification-honesty">Some authorities take longer to respond. If a source cannot be read or a rule cannot be confirmed, your guide will say so.</p>
        </div>
        <ol className="verification-stages" aria-label="Source-check stages">
          {stages.map((stage, index) => {
            const state = progress[stage.id]?.state ?? "waiting";
            return <li key={stage.id} data-state={state} aria-current={state === "running" ? "step" : undefined}>
              <span className="verification-stage-mark" aria-hidden="true">{state === "complete" ? <Check size={18} /> : state === "limited" ? <CircleAlert size={18} /> : index + 1}</span>
              <div><strong>{stage.title}</strong><p>{state === "limited" ? progress[stage.id]?.message : stage.description}</p><span className="verification-stage-state">{state === "running" ? "Checking now" : state === "complete" ? "Finished" : state === "limited" ? "Finished with gaps" : "Up next"}</span></div>
            </li>;
          })}
        </ol>
      </div>
    </section>
  );
}
