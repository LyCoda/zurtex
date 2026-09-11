import { airlineByCode, airlines, countries, countryByCode } from "./route-coverage.ts";
import { airlineResearch, countryResearch, type ResearchSource } from "./route-research.ts";
import type { DraftRouteAnswer } from "./route-answer-drafts.ts";

export type Species = "dog" | "cat";
export type TravellerRelationship = "owner" | "family" | "authorised";
export type MovementPurpose =
  | "personal"
  | "relocation"
  | "sale"
  | "adoption"
  | "transfer"
  | "breeding"
  | "event";
export type TravelMode = "cabin" | "hold" | "cargo";
export type ResultStatus = "more_information_needed" | "actions_required" | "plan_looks_feasible";
export type Complexity = "straightforward" | "moderate" | "complex" | "specialist";

export type RouteGuideRequest = {
  origin: string;
  destination: string;
  intendedArrival: string;
  species: Species;
  travellerRelationship: TravellerRelationship;
  movementPurpose: MovementPurpose;
  travelMode: TravelMode;
  petCount?: number;
  ownerTravelTiming?: "together" | "within-five-days" | "outside-five-days" | "unknown";
  airline?: string;
  operatingAirline?: string;
  arrivalRegion?: "mainland" | "hawaii" | "guam" | "other";
  hasTransit: boolean;
  transitCountry?: string;
};

export type EvidenceReference = {
  id: string;
  title: string;
  authority: string;
  url: string;
  checkedOn: string;
  state: "research_baseline" | "editorial_hold";
  warning: string;
  effectiveOn: null;
  approvedBy: null;
  publicationStatus: "unapproved" | "held";
};

export type Finding = {
  id: string;
  group: "government" | "airline" | "timing" | "itinerary";
  title: string;
  summary: string;
  state: "starting_point" | "needs_confirmation" | "held" | "not_assessed";
  sourceIds: string[];
};

export type RouteGuideAssessment = {
  draftAnswer?: DraftRouteAnswer;
  assessmentId: string;
  createdAt: string;
  status: ResultStatus;
  complexity: Complexity;
  route: {
    origin: string;
    destination: string;
    intendedArrival: string;
    species: Species;
    travelMode: TravelMode;
    movementPurpose: MovementPurpose;
    travellerRelationship: TravellerRelationship;
    petCount: number;
    ownerTravelTiming: RouteGuideRequest["ownerTravelTiming"];
    airline: string | null;
    operatingAirline: string | null;
    arrivalRegion: string | null;
    transitCountry: string | null;
  };
  headline: string;
  explanation: string;
  findings: Finding[];
  missingFacts: string[];
  evidence: EvidenceReference[];
  approximatePreparation: null;
  earliestFeasibleArrival: null;
  readyPackPreview: {
    requirementCategories: number;
    openQuestions: number;
    sourceCount: number;
  };
};

type ParseSuccess = { ok: true; value: RouteGuideRequest };
type ParseFailure = { ok: false; error: string; fields?: string[] };

const species = new Set<Species>(["dog", "cat"]);
const relationships = new Set<TravellerRelationship>(["owner", "family", "authorised"]);
const purposes = new Set<MovementPurpose>([
  "personal",
  "relocation",
  "sale",
  "adoption",
  "transfer",
  "breeding",
  "event",
]);
const travelModes = new Set<TravelMode>(["cabin", "hold", "cargo"]);
const specialistCountries = new Set(["SG", "HK", "JP", "AU", "NZ", "CN", "TW", "MY"]);
const cargoLedAirlines = new Set(["BA", "EK", "CX", "JL", "QF", "NZ"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function parseRouteGuideRequest(
  raw: unknown,
  today = new Date().toISOString().slice(0, 10),
): ParseSuccess | ParseFailure {
  if (!isRecord(raw)) return { ok: false, error: "Enter the journey details again." };

  const required = [
    "origin",
    "destination",
    "intendedArrival",
    "species",
    "travellerRelationship",
    "movementPurpose",
    "travelMode",
  ].filter((field) => typeof raw[field] !== "string" || raw[field] === "");

  if (required.length) {
    return {
      ok: false,
      error: "Complete every required journey field.",
      fields: required,
    };
  }

  const origin = String(raw.origin);
  const destination = String(raw.destination);
  const intendedArrival = String(raw.intendedArrival);
  const selectedSpecies = String(raw.species) as Species;
  const travellerRelationship = String(raw.travellerRelationship) as TravellerRelationship;
  const movementPurpose = String(raw.movementPurpose) as MovementPurpose;
  const travelMode = String(raw.travelMode) as TravelMode;
  const petCount = raw.petCount === undefined ? 1 : raw.petCount;
  if (
    typeof petCount !== "number" ||
    !Number.isInteger(petCount) ||
    petCount < 1 ||
    petCount > 20
  ) {
    return { ok: false, error: "Enter a whole number of pets from 1 to 20." };
  }
  const ownerTravelTiming = raw.ownerTravelTiming as RouteGuideRequest["ownerTravelTiming"];
  if (
    ownerTravelTiming !== undefined &&
    !["together", "within-five-days", "outside-five-days", "unknown"].includes(ownerTravelTiming)
  ) {
    return { ok: false, error: "Choose when the owner will travel." };
  }
  if (
    travellerRelationship === "owner" &&
    ownerTravelTiming &&
    !["together", "unknown"].includes(ownerTravelTiming)
  ) {
    return { ok: false, error: "Check who accompanies your pet and when the owner travels." };
  }
  const airline = typeof raw.airline === "string" && raw.airline ? raw.airline : undefined;
  const operatingAirline =
    typeof raw.operatingAirline === "string" && raw.operatingAirline
      ? raw.operatingAirline
      : undefined;
  const arrivalRegion =
    destination === "US" && typeof raw.arrivalRegion === "string" && raw.arrivalRegion
      ? (raw.arrivalRegion as RouteGuideRequest["arrivalRegion"])
      : undefined;
  if (raw.hasTransit !== undefined && typeof raw.hasTransit !== "boolean") {
    return { ok: false, error: "Choose whether your journey includes a connection." };
  }
  const hasTransit = raw.hasTransit === true;
  const transitCountry =
    hasTransit && typeof raw.transitCountry === "string" && raw.transitCountry
      ? raw.transitCountry
      : undefined;

  if (!countryByCode(origin) || !countryByCode(destination)) {
    return { ok: false, error: "Choose an origin and destination from the supported list." };
  }
  if (origin === destination) {
    return { ok: false, error: "Choose two different jurisdictions for an international journey." };
  }
  if (!isIsoDate(intendedArrival) || intendedArrival < today) {
    return { ok: false, error: "Choose a valid intended arrival date from today onward." };
  }
  if (!species.has(selectedSpecies) || !relationships.has(travellerRelationship)) {
    return { ok: false, error: "Choose a valid pet and traveller relationship." };
  }
  if (!purposes.has(movementPurpose) || !travelModes.has(travelMode)) {
    return { ok: false, error: "Choose a valid movement purpose and travel mode." };
  }
  if (airline && airline !== "OTHER" && !airlineByCode(airline)) {
    return { ok: false, error: "Choose an airline from the supported list, or leave it unknown." };
  }
  if (operatingAirline && operatingAirline !== "OTHER" && !airlineByCode(operatingAirline)) {
    return { ok: false, error: "Choose the operating airline, or select another airline." };
  }
  if (arrivalRegion && !["mainland", "hawaii", "guam", "other"].includes(arrivalRegion)) {
    return { ok: false, error: "Choose your intended US arrival region." };
  }
  if (transitCountry && !countryByCode(transitCountry)) {
    return { ok: false, error: "Choose a transit jurisdiction from the supported list." };
  }

  return {
    ok: true,
    value: {
      origin,
      destination,
      intendedArrival,
      species: selectedSpecies,
      travellerRelationship,
      movementPurpose,
      travelMode,
      ...(raw.petCount !== undefined ? { petCount } : {}),
      ...(ownerTravelTiming ? { ownerTravelTiming } : {}),
      airline,
      ...(operatingAirline ? { operatingAirline } : {}),
      ...(arrivalRegion ? { arrivalRegion } : {}),
      hasTransit,
      transitCountry,
    },
  };
}

function complexityFor(input: RouteGuideRequest): Complexity {
  if (
    input.travelMode === "cargo" ||
    ["sale", "adoption", "transfer", "breeding", "event"].includes(input.movementPurpose) ||
    specialistCountries.has(input.origin) ||
    specialistCountries.has(input.destination) ||
    (input.airline && cargoLedAirlines.has(input.airline))
  ) {
    return "specialist";
  }
  if (input.hasTransit) return "complex";
  if (
    countryByCode(input.origin)?.tier === "enhanced_review" ||
    countryByCode(input.destination)?.tier === "enhanced_review"
  ) {
    return "moderate";
  }
  return "straightforward";
}

export function evaluateRouteGuide(
  input: RouteGuideRequest,
  now = new Date(),
): RouteGuideAssessment {
  const origin = countryByCode(input.origin)!;
  const destination = countryByCode(input.destination)!;
  const research = countryResearch[input.destination];
  const airline = input.airline ? airlineByCode(input.airline) : undefined;
  const operatingAirline = input.operatingAirline
    ? airlineByCode(input.operatingAirline)
    : undefined;
  const evidence: EvidenceReference[] = [];
  function addSources(sources: ResearchSource[], prefix: string, held: boolean) {
    return sources.map((source, index) => {
      const id = prefix + "-" + index;
      if (!evidence.some((existing) => existing.id === id)) {
        evidence.push({
          id,
          title: source.title,
          authority: source.authority,
          url: source.url,
          checkedOn: source.verifiedOn,
          state: held ? "editorial_hold" : "research_baseline",
          warning: held
            ? "The research is incomplete. Confirm current instructions directly."
            : "Research link only; not approved for personalised instructions.",
          effectiveOn: null,
          approvedBy: null,
          publicationStatus: held ? "held" : "unapproved",
        });
      }
      return id;
    });
  }
  // The US CDC dog pathway must never be attached to a cat's checklist.
  const sources = research.sources.filter(
    (source) =>
      !(input.destination === "US" && input.species === "cat" && source.url.includes("cdc.gov")),
  );
  const destinationSources = addSources(
    sources,
    "destination-" + input.destination.toLowerCase(),
    research.held,
  );
  const questions = research.questions.filter(
    (question) => !question.species || question.species === input.species,
  );
  const findings: Finding[] = questions.map((question, index) => ({
    id: "destination-question-" + index,
    group: "government",
    title: question.title,
    summary: question.summary,
    state: research.held ? "held" : "starting_point",
    sourceIds: destinationSources,
  }));
  if (input.destination === "US" && input.arrivalRegion) {
    const regionNames = {
      mainland: "the US mainland",
      hawaii: "Hawaii",
      guam: "Guam",
      other: "another US territory",
    };
    findings[0] = {
      ...findings[0],
      title: "Check the local pathway for " + regionNames[input.arrivalRegion],
      summary:
        "You selected " +
        regionNames[input.arrivalRegion] +
        ". Confirm that destination’s own instructions as well as the federal guidance. This beta has not assessed local eligibility or calculated its timeline.",
      state: "needs_confirmation",
    };
  }
  const ownershipChange = ["sale", "adoption", "transfer", "breeding", "event"].includes(
    input.movementPurpose,
  );
  if (ownershipChange || input.travellerRelationship !== "owner") {
    findings.push({
      id: "movement-classification",
      group: "government",
      title: ownershipChange
        ? "Which process fits the purpose of this journey?"
        : "What should the accompanying person prepare?",
      summary: ownershipChange
        ? "You selected " +
          input.movementPurpose +
          ". Ask the authority to confirm the correct movement pathway; do not assume a personal pet-travel checklist covers a change of owner. Cabin, hold or cargo is a separate question."
        : "You selected travel with " +
          (input.travellerRelationship === "family" ? "a family member" : "an authorised person") +
          ". Ask which authorisation and owner-travel details the authority needs for this journey.",
      state: "needs_confirmation",
      sourceIds: destinationSources,
    });
  }
  findings.push({
    id: "origin-export",
    group: "government",
    title: "What needs arranging before you leave " + origin.name + "?",
    summary:
      "Ask the departure country’s export authority which certificate, vet appointment or endorsement is needed for this destination. The supplied research covers destination entry; Zurtex has not yet assessed the export process.",
    state: "not_assessed",
    sourceIds: [],
  });
  const missingFacts = [
    "Microchip, rabies vaccination and any treatment or certificate records still need checking with your vet.",
    "The export process from " + origin.name + " has not been assessed.",
    "The destination rules have not yet been approved for personalised guidance.",
  ];
  if (!operatingAirline)
    missingFacts.push(
      "The airline operating each flight is not confirmed. The name on your booking may be different.",
    );
  if (input.destination === "US" && !input.arrivalRegion)
    missingFacts.push("Your US arrival region: mainland, Hawaii, Guam or another territory.");
  if (input.hasTransit)
    missingFacts.push(
      "Each connecting airport, any change of operating airline and the transfer arrangements need checking.",
    );
  if (research.held)
    missingFacts.push(
      "Our " +
        destination.name +
        " research is incomplete; its detailed requirements are withheld.",
    );
  const selectedCarrier = operatingAirline ?? airline;
  if (selectedCarrier) {
    const carrierResearch = airlineResearch[selectedCarrier.code];
    const sourceIds = addSources(
      carrierResearch.sources,
      "airline-" + selectedCarrier.code.toLowerCase(),
      carrierResearch.held,
    );
    findings.push({
      id: "airline-carriage",
      group: "airline",
      title: "Confirm your flight with " + selectedCarrier.name,
      summary: carrierResearch.held
        ? "Our research for this airline is incomplete. Ask its pet-travel team to confirm current carriage and booking arrangements for your exact flights. Detailed carriage claims are withheld."
        : "You selected travel " +
          { cabin: "in the cabin", hold: "in the hold", cargo: "as cargo" }[input.travelMode] +
          ". Ask whether your pet is accepted on the exact flight, what carrier or crate it needs, and how to reserve its place. We have not checked acceptance or space.",
      state: carrierResearch.held ? "held" : "needs_confirmation",
      sourceIds,
    });
    if (carrierResearch.held)
      missingFacts.push("The " + selectedCarrier.name + " research needs a complete review.");
  } else {
    findings.push({
      id: "airline-carriage",
      group: "airline",
      title: "Airline compatibility not yet assessed",
      summary:
        input.airline === "OTHER" || input.operatingAirline === "OTHER"
          ? "Your airline is outside this beta’s source list. Contact the airline that operates the flight and ask about your pet, route, carrier and intended travel mode."
          : "You can add your airline without starting over. When you have a flight in mind, ask the operating airline about your pet’s acceptance, carrier and reservation.",
      state: "not_assessed",
      sourceIds: [],
    });
  }
  if (airline && !operatingAirline)
    findings.push({
      id: "operating-carrier",
      group: "airline",
      title: "Check who actually operates the flight",
      summary:
        airline.name +
        " is the airline on your booking. Look for “operated by” on every flight segment; its pet policy may need a separate check.",
      state: "not_assessed",
      sourceIds: [],
    });
  if (input.hasTransit)
    findings.push({
      id: "transit",
      group: "itinerary",
      title: input.transitCountry
        ? "Your connection in " + countryByCode(input.transitCountry)?.name
        : "Where will you connect?",
      summary:
        "Confirm the airport, transfer arrangements and airline on each flight. This guide has not assessed transit entry, pet handling or connection acceptance. Add or change the connection below.",
      state: "not_assessed",
      sourceIds: [],
    });
  findings.push({
    id: "preparation-time",
    group: "timing",
    title: "Confirm the preparation timeline",
    summary:
      "An arrival date alone does not tell us whether there is enough time. Review the pet’s records and current applicable rules before setting deadlines.",
    state: "needs_confirmation",
    sourceIds: [],
  });
  return {
    assessmentId: crypto.randomUUID(),
    createdAt: now.toISOString(),
    status: "more_information_needed",
    complexity: complexityFor(input),
    route: {
      origin: origin.name,
      destination: destination.name,
      intendedArrival: input.intendedArrival,
      species: input.species,
      travelMode: input.travelMode,
      movementPurpose: input.movementPurpose,
      travellerRelationship: input.travellerRelationship,
      petCount: input.petCount ?? 1,
      ownerTravelTiming: input.ownerTravelTiming,
      airline: airline?.name ?? (input.airline === "OTHER" ? "Another airline" : null),
      operatingAirline:
        operatingAirline?.name ?? (input.operatingAirline === "OTHER" ? "Another airline" : null),
      arrivalRegion: input.arrivalRegion ?? null,
      transitCountry:
        input.hasTransit && input.transitCountry
          ? (countryByCode(input.transitCountry)?.name ?? null)
          : null,
    },
    headline: "Your route guide",
    explanation: research.held
      ? "We need to check more of the official guidance for this destination. Start by confirming the route directly with the authority; the checklist below keeps your next questions together."
      : "Here are the questions to work through for your route, with the official guidance beside them. This beta has not yet confirmed the requirements or timing for your individual pet.",
    findings,
    missingFacts,
    evidence,
    approximatePreparation: null,
    earliestFeasibleArrival: null,
    readyPackPreview: {
      requirementCategories: new Set(findings.map((f) => f.group)).size,
      openQuestions: findings.length,
      sourceCount: evidence.length,
    },
  };
}

export const routeGuideOptions = {
  countries,
  airlines,
};
