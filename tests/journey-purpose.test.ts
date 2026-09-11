import assert from "node:assert/strict";
import test from "node:test";
import { needsPurposeReview, purposeEvidence } from "../lib/journey-purpose.ts";
import { getDraftRouteAnswer } from "../lib/route-answer-drafts.ts";
import { parseRouteGuideRequest, type RouteGuideRequest } from "../lib/route-intelligence.ts";

const trip: RouteGuideRequest = {
  origin: "GB",
  destination: "NL",
  intendedArrival: "2026-09-25",
  species: "dog",
  travellerRelationship: "owner",
  movementPurpose: "personal",
  travelMode: "cabin",
  hasTransit: false,
};
test("personal travel and relocation remain personal in cabin, hold and cargo", () => {
  for (const movementPurpose of ["personal", "relocation"] as const)
    for (const travelMode of ["cabin", "hold", "cargo"] as const) {
      const input = { ...trip, movementPurpose, travelMode };
      assert.equal(needsPurposeReview(input), false);
      assert.equal(getDraftRouteAnswer(input)?.guideKind, "personal");
    }
});
test("purpose, group size and separated owner trigger a review, never a legal verdict", () => {
  for (const movementPurpose of ["sale", "adoption", "transfer", "breeding", "event"] as const) {
    const answer = getDraftRouteAnswer({ ...trip, movementPurpose })!;
    assert.equal(answer.guideKind, "purpose-review");
    assert.equal(answer.requirements.length, 3);
    assert.ok(answer.requirements.every((r) => r.kind === "planning" && !r.calendar));
  }
  assert.equal(needsPurposeReview({ ...trip, petCount: 6 }), true);
  assert.equal(
    needsPurposeReview({
      ...trip,
      ownerTravelTiming: "outside-five-days",
      travellerRelationship: "authorised",
    }),
    true,
  );
});
test("US and Canada dog definitions differ and are never applied to cats", () => {
  assert.match(purposeEvidence({ ...trip, destination: "US" })!.note, /not resold/);
  assert.match(
    purposeEvidence({ ...trip, destination: "CA" })!.note,
    /commercial dog purposes include breeding/,
  );
  assert.equal(purposeEvidence({ ...trip, destination: "US", species: "cat" }), null);
  assert.equal(purposeEvidence({ ...trip, destination: "CA", species: "cat" }), null);
});
test("a US cat purpose-review does not cite dog-only evidence", () => {
  const answer = getDraftRouteAnswer({
    ...trip,
    destination: "US",
    species: "cat",
    movementPurpose: "adoption",
    arrivalRegion: "mainland",
  })!;
  assert.ok(answer.sources.length > 0);
  assert.ok(answer.sources.every((s) => !/Dog|Rabies-Free|High-Risk/.test(s.title)));
  assert.ok(!answer.sources.some((s) => s.id === "movement-US"));
});
test("relocation does not duplicate the AHC or imply a required return journey", () => {
  const answer = getDraftRouteAnswer({ ...trip, movementPurpose: "relocation" })!;
  assert.equal(answer.requirements.length, 5);
  assert.equal(answer.departureRequirements.length, 0);
  assert.ok(
    answer.requirements.find((r) => r.id === "NL-certificate")?.sourceIds.includes("gb-export-ahc"),
  );
});
test("review summaries explain supplied timing and group-size triggers", () => {
  const answer = getDraftRouteAnswer({
    ...trip,
    travellerRelationship: "family",
    ownerTravelTiming: "outside-five-days",
    petCount: 6,
  })!;
  assert.match(answer.summary, /more than five days apart/);
  assert.match(answer.summary, /6 pets/);
  assert.match(answer.summary, /does not automatically mean a commercial journey/);
});
test("strict parsing protects count, owner timing and new purpose choices", () => {
  for (const petCount of [0, 21, -1, 1.5, "2", null])
    assert.equal(parseRouteGuideRequest({ ...trip, petCount }, "2026-09-12").ok, false);
  for (const movementPurpose of ["breeding", "event"])
    assert.equal(parseRouteGuideRequest({ ...trip, movementPurpose }, "2026-09-12").ok, true);
  assert.equal(
    parseRouteGuideRequest({ ...trip, ownerTravelTiming: "later" }, "2026-09-12").ok,
    false,
  );
  assert.equal(
    parseRouteGuideRequest({ ...trip, ownerTravelTiming: "outside-five-days" }, "2026-09-12").ok,
    false,
  );
});
