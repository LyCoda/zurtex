export type ResearchRequirement = {
  id: string;
  title: string;
  kind: "required" | "conditional" | "planning";
  timing: string;
  bullets: string[];
  sourceIds: string[];
  species?: "dog" | "cat";
  originCodes?: string[];
  excludedOriginCodes?: string[];
  directOnlyOriginExemption?: boolean;
  retainForUnconfirmedHistory?: boolean;
  destinationCodes?: string[];
  excludedDestinationCodes?: string[];
  arrivalRegions?: string[];
  calendarRule?: "eu-primary-rabies" | "eu-certificate" | "arrival";
};

export type CountryDossier = {
  code: string;
  name: string;
  overview: string;
  checkedOn: string;
  researchStatus: "researched_with_gaps";
  importRequirements: ResearchRequirement[];
  exportRequirements: ResearchRequirement[];
  originGroups: {
    label: string;
    countryCodes: string[];
    condition: string;
    sourceIds: string[];
  }[];
  caveats: string[];
  gaps: string[];
  sources: {
    id: string;
    title: string;
    authority: string;
    url: string;
    publishedOn: string | null;
    accessedOn: string;
    claims: string[];
  }[];
};
