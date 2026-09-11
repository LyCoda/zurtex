import assert from "node:assert/strict";
import test from "node:test";
import { countryResearch, airlineResearch } from "../lib/route-research.ts";
import { countryByCode, airlineByCode } from "../lib/route-coverage.ts";
import {
  evaluateRouteGuide,
  parseRouteGuideRequest,
  type RouteGuideRequest,
} from "../lib/route-intelligence.ts";

const base: RouteGuideRequest = {
  origin: "US",
  destination: "FR",
  intendedArrival: "2027-04-10",
  species: "dog",
  travellerRelationship: "owner",
  movementPurpose: "relocation",
  travelMode: "cabin",
  airline: "AF",
  hasTransit: false,
  transitCountry: undefined,
};

test("accepts the canonical minimum route fields", () => {
  const parsed = parseRouteGuideRequest(base, "2026-09-11");
  assert.equal(parsed.ok, true);
  if (parsed.ok) assert.deepEqual(parsed.value, base);
});

test("rejects a same-jurisdiction route", () => {
  const parsed = parseRouteGuideRequest({ ...base, destination: base.origin }, "2026-09-11");
  assert.equal(parsed.ok, false);
  if (!parsed.ok) assert.match(parsed.error, /different jurisdictions/i);
});

test("rejects past or malformed intended arrival dates", () => {
  const past = parseRouteGuideRequest({ ...base, intendedArrival: "2025-01-01" }, "2026-09-11");
  const malformed = parseRouteGuideRequest(
    { ...base, intendedArrival: "2027-02-31" },
    "2026-09-11",
  );
  assert.equal(past.ok, false);
  assert.equal(malformed.ok, false);
});

test("withholds false precision when material facts are not collected", () => {
  const assessment = evaluateRouteGuide(base, new Date("2026-09-11T09:00:00Z"));
  assert.equal(assessment.status, "more_information_needed");
  assert.equal(assessment.approximatePreparation, null);
  assert.equal(assessment.earliestFeasibleArrival, null);
  assert.ok(assessment.missingFacts.some((fact) => /Microchip/.test(fact)));
});

test("preserves editorial holds instead of confirming them", () => {
  const assessment = evaluateRouteGuide(
    { ...base, destination: "NZ" },
    new Date("2026-09-11T09:00:00Z"),
  );
  assert.equal(assessment.status, "more_information_needed");
  assert.equal(assessment.complexity, "specialist");
  assert.ok(assessment.findings.some((finding) => finding.state === "held"));
  assert.ok(assessment.evidence.some((source) => source.state === "editorial_hold"));
});

test("treats cargo and movement purpose independently", () => {
  const cargo = evaluateRouteGuide(
    { ...base, travelMode: "cargo", movementPurpose: "personal" },
    new Date("2026-09-11T09:00:00Z"),
  );
  const adoption = evaluateRouteGuide(
    { ...base, travelMode: "cabin", movementPurpose: "adoption" },
    new Date("2026-09-11T09:00:00Z"),
  );
  assert.equal(cargo.complexity, "specialist");
  assert.equal(adoption.complexity, "specialist");
  assert.equal(cargo.route.movementPurpose, "personal");
  assert.equal(adoption.route.travelMode, "cabin");
});

test("shows airline compatibility as not assessed when no airline is known", () => {
  const assessment = evaluateRouteGuide(
    { ...base, airline: undefined },
    new Date("2026-09-11T09:00:00Z"),
  );
  assert.ok(
    assessment.findings.some(
      (finding) =>
        finding.group === "airline" && finding.title === "Airline compatibility not yet assessed",
    ),
  );
});

test("all supported country/species combinations produce bounded question guides", () => {
  for (const destination of Object.keys(countryResearch)) {
    for (const selectedSpecies of ["dog", "cat"] as const) {
      const guide = evaluateRouteGuide({
        ...base,
        origin: destination === "US" ? "GB" : "US",
        destination,
        species: selectedSpecies,
      });
      assert.ok(guide.findings.some((f) => f.group === "government"));
      assert.ok(guide.evidence.length > 0);
      assert.ok(guide.evidence.every((s) => s.approvedBy === null && s.effectiveOn === null));
      assert.equal(guide.earliestFeasibleArrival, null);
      assert.equal(guide.status, "more_information_needed");
      for (const finding of guide.findings) {
        assert.ok(finding.sourceIds.every((id) => guide.evidence.some((s) => s.id === id)));
      }
    }
  }
});

test("held destination and carrier notes are never published as findings", () => {
  for (const destination of ["AE", "NZ", "MY"]) {
    const guide = evaluateRouteGuide({ ...base, destination, airline: "CX" });
    assert.ok(guide.findings.some((f) => f.state === "held"));
    assert.ok(guide.findings.every((f) => f.summary !== countryByCode(destination)?.note));
    assert.ok(guide.findings.every((f) => f.summary !== airlineByCode("CX")?.modes));
  }
});

test("US cat guidance has no CDC dog source or dog history question", () => {
  const guide = evaluateRouteGuide({ ...base, origin: "FR", destination: "US", species: "cat" });
  assert.ok(guide.evidence.every((s) => !s.url.includes("cdc.gov")));
  assert.ok(guide.findings.every((f) => !f.title.includes("dog")));
});

test("a marketing carrier does not resolve missing operating-carrier facts", () => {
  const guide = evaluateRouteGuide(base);
  assert.ok(guide.missingFacts.some((f) => f.includes("operating each flight")));
  const known = evaluateRouteGuide({ ...base, operatingAirline: "AF" });
  assert.ok(!known.missingFacts.some((f) => f.includes("operating each flight")));
  assert.equal(known.route.operatingAirline, "Air France");
});

test("normalizes stale transit, accepts another airline and rejects invalid controls", () => {
  const parsed = parseRouteGuideRequest(
    { ...base, airline: "OTHER", transitCountry: "HK", hasTransit: false },
    "2026-09-11",
  );
  assert.equal(parsed.ok, true);
  if (parsed.ok) assert.equal(parsed.value.transitCountry, undefined);
  assert.equal(parseRouteGuideRequest({ ...base, hasTransit: "false" }, "2026-09-11").ok, false);
  assert.equal(
    parseRouteGuideRequest(
      { ...base, destination: "US", origin: "FR", arrivalRegion: "invalid" },
      "2026-09-11",
    ).ok,
    false,
  );
});

test("US regional selection changes the next question without claiming local assessment", () => {
  const guide = evaluateRouteGuide({
    ...base,
    origin: "FR",
    destination: "US",
    arrivalRegion: "hawaii",
  });
  assert.match(guide.findings[0].title, /Hawaii/);
  assert.match(guide.findings[0].summary, /has not assessed local eligibility/);
});

test("source registry covers the whole supplied beta seed", () => {
  assert.equal(Object.keys(countryResearch).length, 23);
  assert.equal(Object.keys(airlineResearch).length, 25);
});
