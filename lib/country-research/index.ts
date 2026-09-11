import europe from "./europe-2026-09-11.json" with { type: "json" };
import west from "./west-2026-09-11.json" with { type: "json" };
import east from "./east-2026-09-11.json" with { type: "json" };
import south from "./south-2026-09-11.json" with { type: "json" };
import type { CountryDossier } from "./types.ts";

// Dated research, not an approved regulatory rule set. Server-side preview only.
export const countryDossiers = [...europe, ...west, ...east, ...south] as CountryDossier[];
export const dossierByCode = (code: string) =>
  countryDossiers.find((dossier) => dossier.code === code);
