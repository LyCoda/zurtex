import assert from "node:assert/strict";
import test from "node:test";
import {
  draftAnswersAllowed,
  getDraftRouteAnswer,
  shiftCalendarDate,
} from "../lib/route-answer-drafts.ts";
import { evaluateRouteGuide, type RouteGuideRequest } from "../lib/route-intelligence.ts";
import { countryDossiers } from "../lib/country-research/index.ts";
import { countries } from "../lib/route-coverage.ts";

const trip: RouteGuideRequest = {
  origin: "GB",
  destination: "NL",
  species: "dog",
  intendedArrival: "2026-09-25",
  travellerRelationship: "owner",
  movementPurpose: "personal",
  travelMode: "cabin",
  hasTransit: false,
};
test("drafts fail closed outside explicit development", () => {
  for (const env of [undefined, "", "production", "test", "preview", "true"])
    assert.equal(draftAnswersAllowed(env), false);
  assert.equal(draftAnswersAllowed("development"), true);
});
test("research never grants publication approval or changes core assessment", () => {
  const answer = getDraftRouteAnswer(trip)!;
  assert.equal(answer.publicationStatus, "draft");
  assert.equal(answer.approvedBy, null);
  assert.equal(evaluateRouteGuide(trip).draftAnswer, undefined);
  assert.equal(evaluateRouteGuide(trip).status, "more_information_needed");
  assert.equal(evaluateRouteGuide(trip).earliestFeasibleArrival, null);
  assert.ok(answer.assumptions.some((a) => a.includes("Northern Ireland")));
});

test("only an exact server-side opt-in exposes research previews outside development", () => {
  assert.equal(draftAnswersAllowed("production", "true"), true);
  for (const flag of [undefined, "false", "TRUE", "1", ""])
    assert.equal(draftAnswersAllowed("production", flag), false);
  const answer = getDraftRouteAnswer(trip)!;
  assert.equal(answer.approvedBy, null);
  assert.equal(answer.publicationStatus, "draft");
});
test("every offered jurisdiction has an import and export dossier", () => {
  assert.equal(countryDossiers.length, 24);
  assert.deepEqual(countryDossiers.map((c) => c.code).sort(), countries.map((c) => c.code).sort());
  for (const c of countryDossiers) {
    assert.ok(c.importRequirements.length >= 5, c.code);
    assert.ok(c.exportRequirements.length >= 2, c.code);
    assert.ok(c.gaps.length, c.code);
    const sourceIds = new Set(c.sources.map((s) => s.id));
    assert.equal(sourceIds.size, c.sources.length, c.code + " duplicate sources");
    for (const step of [...c.importRequirements, ...c.exportRequirements]) {
      assert.ok(["required", "planning", "conditional"].includes(step.kind), step.id);
      assert.ok(step.bullets.length >= 2, step.id);
      assert.ok(step.sourceIds.length, step.id);
      assert.ok(
        step.sourceIds.every((id) => sourceIds.has(id)),
        step.id,
      );
    }
  }
});
test("all 552 ordered country pairs compose for both species without orphaned evidence", () => {
  for (const origin of countryDossiers)
    for (const destination of countryDossiers) {
      if (origin.code === destination.code) continue;
      for (const species of ["dog", "cat"] as const) {
        const answer = getDraftRouteAnswer({
          ...trip,
          origin: origin.code,
          destination: destination.code,
          species,
        })!;
        assert.ok(answer, origin.code + destination.code);
        const steps = [...answer.requirements, ...answer.departureRequirements];
        assert.equal(new Set(steps.map((s) => s.id)).size, steps.length);
        assert.ok(steps.every((r) => !r.species || r.species === species));
        assert.ok(
          steps.every((r) => r.sourceIds.every((id) => answer.sources.some((s) => s.id === id))),
        );
        assert.equal(answer.approvedBy, null);
      }
    }
});
test("GB to NL has the five practical destination actions, not a blood-test task", () => {
  const answer = getDraftRouteAnswer(trip)!;
  assert.equal(answer.quarantine.status, "not-normally-required");
  assert.deepEqual(
    answer.requirements.map((r) => r.id),
    ["NL-chip", "NL-rabies", "NL-book", "NL-certificate", "NL-entry"],
  );
  assert.ok(answer.routeFacts.some((f) => f.includes("not required")));
  assert.ok(!answer.departureRequirements.some((r) => r.id === "gb-export-eu"));
  assert.ok(
    answer.requirements.find((r) => r.id === "NL-certificate")!.sourceIds.includes("gb-export-ahc"),
  );
});
test("quarantine is presented as a route outcome rather than a universal requirement", () => {
  for (const [origin, destination] of [
    ["GB", "FR"],
    ["US", "CA"],
    ["AE", "GB"],
    ["NZ", "AU"],
    ["AU", "NZ"],
  ]) {
    assert.equal(
      getDraftRouteAnswer({ ...trip, origin, destination })!.quarantine.status,
      "not-normally-required",
      `${origin}-${destination}`,
    );
  }
  for (const [origin, destination] of [
    ["GB", "AU"],
    ["GB", "NZ"],
    ["CN", "HK"],
    ["AE", "SG"],
    ["CA", "MY"],
  ]) {
    assert.equal(
      getDraftRouteAnswer({ ...trip, origin, destination })!.quarantine.status,
      "required",
      `${origin}-${destination}`,
    );
  }
  for (const [origin, destination] of [
    ["US", "CN"],
    ["US", "TW"],
    ["US", "MY"],
    ["US", "TH"],
  ]) {
    assert.equal(
      getDraftRouteAnswer({ ...trip, origin, destination })!.quarantine.status,
      "conditional",
      `${origin}-${destination}`,
    );
  }
});
test("unlisted origins receive titre steps; species-only rules stay scoped", () => {
  const unlisted = getDraftRouteAnswer({ ...trip, origin: "CN" })!;
  assert.ok(unlisted.requirements.some((r) => r.id === "NL-titre"));
  const dog = getDraftRouteAnswer({ ...trip, destination: "FR" })!;
  const cat = getDraftRouteAnswer({ ...trip, destination: "FR", species: "cat" })!;
  assert.ok(dog.requirements.some((r) => r.id === "FR-breed"));
  assert.ok(!cat.requirements.some((r) => r.id === "FR-breed"));
  assert.ok(
    getDraftRouteAnswer({ ...trip, destination: "IE" })!.requirements.some(
      (r) => r.id === "IE-tapeworm",
    ),
  );
  assert.ok(
    !getDraftRouteAnswer({ ...trip, origin: "NO", destination: "IE" })!.requirements.some(
      (r) => r.id === "IE-tapeworm",
    ),
  );
});
test("date-only windows count issue day and never imply an overdue vaccination", () => {
  const answer = getDraftRouteAnswer(trip)!;
  const cert = answer.requirements.find((r) => r.id === "NL-certificate")!;
  assert.equal(cert.calendar!.from, "2026-09-16");
  assert.equal(cert.calendar!.to, "2026-09-25");
  assert.equal(answer.requirements.find((r) => r.id === "NL-rabies")!.calendar!.to, "2026-09-04");
  assert.equal(shiftCalendarDate("2028-03-01", -1), "2028-02-29");
  assert.equal(shiftCalendarDate("2027-03-01", -1), "2027-02-28");
  assert.equal(shiftCalendarDate("2027-01-01", -9), "2026-12-23");
  assert.equal(shiftCalendarDate("2026-02-30", 0), null);
  assert.equal(shiftCalendarDate("bad", 1), null);
  assert.ok(!JSON.stringify(answer).includes("overdue"));
});
test("connections cannot inherit direct-only tapeworm exemptions", () => {
  for (const [origin, destination, step] of [
    ["NO", "IE", "IE-tapeworm"],
    ["IE", "GB", "gb-import-tapeworm"],
    ["IE", "NO", "no-import-tapeworm"],
  ]) {
    assert.ok(
      !getDraftRouteAnswer({ ...trip, origin, destination })!.requirements.some(
        (r) => r.id === step,
      ),
    );
    assert.ok(
      getDraftRouteAnswer({
        ...trip,
        origin,
        destination,
        hasTransit: true,
        transitCountry: "FR",
      })!.requirements.some((r) => r.id === step),
    );
  }
});
test("unapproved direct origins stop before a misleading standard checklist", () => {
  for (const destination of ["AU", "NZ"]) {
    const answer = getDraftRouteAnswer({ ...trip, origin: "CN", destination })!;
    assert.equal(answer.requirements.length, 1);
    assert.ok(answer.blockingNotes.length);
    assert.match(answer.requirements[0].title, /approved exporting-country/);
  }
});
test("US cat results exclude CDC dog-specific instructions and source branches", () => {
  const answer = getDraftRouteAnswer({
    ...trip,
    destination: "US",
    species: "cat",
    arrivalRegion: "mainland",
  })!;
  assert.ok(!answer.requirements.some((r) => r.id.startsWith("us-import-dog")));
  assert.ok(!answer.requirements.some((r) => /hawaii|guam/.test(r.id)));
  assert.ok(!answer.sources.some((s) => /^us-cdc-(risk|low|foreign|us-vacc|overview)$/.test(s.id)));
});
test("unconfirmed lower-risk history retains conditional alternative preparation", () => {
  for (const [origin, destination, step] of [
    ["GB", "SG", "sg-import-rabies"],
    ["NZ", "AU", "au-import-rabies"],
    ["AU", "NZ", "nz-import-rabies"],
  ]) {
    const answer = getDraftRouteAnswer({ ...trip, origin, destination })!;
    const requirement = answer.requirements.find((r) => r.id === step)!;
    assert.equal(requirement.kind, "conditional");
    assert.match(requirement.bullets[0], /lower-risk residence/);
  }
  const answer = getDraftRouteAnswer({ ...trip, origin: "CN", destination: "IE" })!;
  assert.ok(!answer.sources.some((s) => s.id.startsWith("EU-gb-")));
  assert.equal(answer.requirements.find((r) => r.id === "IE-certificate")!.kind, "conditional");
});
test("transit withholds date arithmetic; ownership transfers do not inherit personal rules", () => {
  const transit = getDraftRouteAnswer({ ...trip, hasTransit: true, transitCountry: "FR" })!;
  assert.ok(transit.requirements.every((r) => !r.calendar));
  assert.ok(transit.unresolved.some((r) => r.includes("Connection")));
  for (const movementPurpose of ["sale", "adoption", "transfer"] as const) {
    const review = getDraftRouteAnswer({ ...trip, movementPurpose })!;
    assert.equal(review.guideKind, "purpose-review");
    assert.ok(review.requirements.every((r) => r.id.startsWith("purpose-") && !r.calendar));
    assert.equal(review.departureRequirements.length, 0);
  }
  assert.ok(getDraftRouteAnswer({ ...trip, travelMode: "cargo" }));
  assert.ok(getDraftRouteAnswer({ ...trip, movementPurpose: "relocation" }));
  assert.equal(getDraftRouteAnswer({ ...trip, origin: "NI" }), null);
});
