import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, existsSync } from "node:fs";
import { countryDossiers } from "../lib/country-research/index.ts";

test("every current country dossier has matching permanent documentation and citations", () => {
  for (const country of countryDossiers) {
    const path = new URL(
      "../docs/research/countries-2026-09-11/" + country.code.toLowerCase() + ".md",
      import.meta.url,
    );
    const doc = readFileSync(path, "utf8");
    assert.ok(doc.includes(country.checkedOn), country.code);
    assert.ok(doc.includes("Human approval: none"), country.code);
    for (const step of [...country.importRequirements, ...country.exportRequirements]) {
      assert.ok(doc.includes(step.title), step.id);
      assert.ok(
        step.bullets.every((bullet) => doc.includes(bullet)),
        step.id,
      );
    }
    for (const source of country.sources) assert.ok(doc.includes(source.url), source.id);
    assert.ok(!doc.includes("[^undefined]"), country.code);
  }
});

test("coverage manifest distinguishes composition from approval and preserves prior research", () => {
  const manifest = JSON.parse(
    readFileSync(
      new URL("../docs/data/country-research-coverage-2026-09-11.json", import.meta.url),
      "utf8",
    ),
  );
  assert.equal(manifest.jurisdictions, countryDossiers.length);
  assert.equal(
    manifest.importActions,
    countryDossiers.reduce((sum, c) => sum + c.importRequirements.length, 0),
  );
  assert.equal(
    manifest.exportActions,
    countryDossiers.reduce((sum, c) => sum + c.exportRequirements.length, 0),
  );
  assert.equal(manifest.individuallyApprovedCorridors, 0);
  assert.equal(manifest.approvedBy, null);
  const index = readFileSync(new URL("../docs/research/README.md", import.meta.url), "utf8");
  assert.ok(index.includes("2026-09-11-petcleared-flows-and-ready-pack.md"));
  assert.ok(
    existsSync(
      new URL("../docs/research/2026-09-11-petcleared-flows-and-ready-pack.md", import.meta.url),
    ),
  );
});
