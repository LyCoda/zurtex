import assert from "node:assert/strict";
import test from "node:test";
import { countryDossiers, dossierByCode } from "../lib/country-research/index.ts";
import { getDraftRouteAnswer } from "../lib/route-answer-drafts.ts";
import type { RouteGuideRequest } from "../lib/route-intelligence.ts";

const trip: RouteGuideRequest = {
  origin: "BR",
  destination: "GB",
  species: "dog",
  intendedArrival: "2026-12-15",
  travellerRelationship: "owner",
  ownerTravelTiming: "together",
  movementPurpose: "personal",
  travelMode: "cargo",
  hasTransit: false,
};

test("Brazil departure retains the EU and GB unlisted-origin rabies pathway", () => {
  for (const destination of ["IE", "FR", "DE", "NL", "ES", "IT", "PT", "GB"])
    for (const species of ["dog", "cat"] as const) {
      const result = getDraftRouteAnswer({ ...trip, destination, species })!;
      const step = destination === "GB" ? "gb-import-titre" : `${destination}-titre`;
      assert.ok(result.requirements.some((item) => item.id === step), `${destination}/${species}`);
      assert.ok(result.routeFacts.some((fact) => /[Uu]nlisted/.test(fact)), destination);
      assert.ok(!result.routeFacts.some((fact) => /test is not required/.test(fact)), destination);
    }
});

test("Brazil does not receive ordinary AU/NZ direct-entry preparations", () => {
  for (const destination of ["AU", "NZ"])
    for (const species of ["dog", "cat"] as const) {
      const result = getDraftRouteAnswer({ ...trip, destination, species })!;
      assert.deepEqual(result.requirements.map((item) => item.id), [
        `${destination}-approved-origin-needed`,
      ]);
      assert.ok(result.requirements[0].sourceIds.length);
      assert.ok(result.blockingNotes.some((note) => /approved-country pathway/.test(note)));
      assert.ok(result.requirements.every((item) => !item.calendar));
    }
});

test("GB to Brazil prominently retains the unresolved certificate conflict", () => {
  const result = getDraftRouteAnswer({ ...trip, origin: "GB", destination: "BR" })!;
  assert.ok(result.blockingNotes.some((note) => /Certificate conflict/.test(note)));
  assert.ok(result.requirements.some((item) => item.id === "BR-import-gb-conflict"));
  assert.ok(result.sources.some((source) => source.id === "BR-gb-specimen"));
  assert.ok(result.sources.some((source) => source.id === "BR-portaria-741"));
  assert.ok(result.requirements.every((item) => !item.calendar));
  const fromUS = getDraftRouteAnswer({ ...trip, origin: "US", destination: "BR" })!;
  assert.ok(!fromUS.requirements.some((item) => item.id === "BR-import-gb-conflict"));
  assert.ok(!fromUS.sources.some((source) => source.id === "BR-gb-specimen"));
});

test("Brazil and UAE departures cannot receive a CDC low-risk-only dog step", () => {
  for (const origin of ["BR", "AE"]) {
    const result = getDraftRouteAnswer({ ...trip, origin, destination: "US", arrivalRegion: "mainland" })!;
    assert.ok(!result.requirements.some((item) => item.id === "us-import-dog-low"));
    assert.ok(result.routeFacts.some((fact) => fact.startsWith("CDC high-risk")));
    assert.ok(result.requirements.some((item) => item.id === "us-import-dog-us-vacc"));
    assert.ok(result.requirements.some((item) => item.id === "us-import-dog-foreign"));
  }
  const lowDeparture = getDraftRouteAnswer({ ...trip, origin: "GB", destination: "US", arrivalRegion: "mainland" })!;
  assert.ok(lowDeparture.requirements.some((item) => item.id === "us-import-dog-low"));
  assert.ok(lowDeparture.requirements.some((item) => item.id === "us-import-dog-foreign"));
  const cat = getDraftRouteAnswer({ ...trip, destination: "US", species: "cat", arrivalRegion: "mainland" })!;
  assert.ok(cat.requirements.every((item) => !item.id.startsWith("us-import-dog")));
  assert.ok(!cat.blockingNotes.some((note) => /origin classification/.test(note)));
});

test("unclassified origin groups fail closed instead of omitting conditional rules", () => {
  // Switzerland's Brazil classification is not researched in this addition.
  const result = getDraftRouteAnswer({ ...trip, destination: "CH" })!;
  assert.equal(result.requirements[0].id, "CH-origin-classification-needed");
  assert.ok(result.blockingNotes.some((note) => /has not been researched/.test(note)));
  assert.ok(result.requirements[0].bullets.some((note) => /not a finding that entry is prohibited/.test(note)));
  const japan = getDraftRouteAnswer({ ...trip, destination: "JP" })!;
  assert.ok(japan.routeFacts.some((fact) => fact.startsWith("Non-designated")));
  assert.ok(japan.requirements.some((item) => item.id === "JP-import-titer"));
});

test("new Brazil coverage has no missing source records in either direction", () => {
  assert.ok(dossierByCode("BR"));
  for (const other of countryDossiers.filter((country) => country.code !== "BR"))
    for (const [origin, destination] of [["BR", other.code], [other.code, "BR"]])
      for (const species of ["dog", "cat"] as const) {
        const result = getDraftRouteAnswer({ ...trip, origin, destination, species })!;
        for (const item of [...result.requirements, ...result.departureRequirements]) {
          assert.ok(item.sourceIds.length, `${origin}/${destination}/${item.id}`);
          assert.ok(item.sourceIds.every((id) => result.sources.some((source) => source.id === id)), item.id);
        }
      }
});
