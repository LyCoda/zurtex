import type { RouteGuideRequest } from "./route-intelligence.ts";
import { dossierByCode } from "./country-research/index.ts";
import type { ResearchRequirement } from "./country-research/types.ts";
import { needsPurposeReview, purposeEvidence, purposeLabels } from "./journey-purpose.ts";

export type DraftRequirement = ResearchRequirement & {
  calendar?: { from: string; to: string; note: string };
};
export type QuarantineAssessment = {
  status: "not-normally-required" | "conditional" | "required";
  label: string;
  summary: string;
};
export type DraftRouteAnswer = {
  version: string;
  publicationStatus: "draft";
  approvedBy: null;
  checkedOn: string;
  originName: string;
  destinationName: string;
  headline: string;
  summary: string;
  guideKind: "personal" | "purpose-review";
  quarantine: QuarantineAssessment;
  assumptions: string[];
  routeFacts: string[];
  blockingNotes: string[];
  requirements: DraftRequirement[];
  departureRequirements: DraftRequirement[];
  unresolved: string[];
  sources: { id: string; title: string; authority: string; url: string }[];
};

const noRoutineQuarantine: QuarantineAssessment = {
  status: "not-normally-required",
  label: "Not normally required",
  summary:
    "Pets that meet this pathway are generally released after the required entry checks. Quarantine can still follow if the documents, eligibility or inspection requirements are not met.",
};

const conditionalQuarantine: QuarantineAssessment = {
  status: "conditional",
  label: "Depends on route conditions",
  summary:
    "Your pet's origin history, records or an authority decision will determine whether a quarantine stay is required.",
};

const requiredQuarantine: QuarantineAssessment = {
  status: "required",
  label: "Required on this pathway",
  summary:
    "The ordinary pathway for this origin includes a quarantine stay. Use the entry checklist for the booking and timing conditions.",
};

function quarantineAssessment(input: RouteGuideRequest, unsupportedDirect = false) {
  if (unsupportedDirect) return conditionalQuarantine;

  if (input.destination === "AU")
    return input.origin === "NZ" ? noRoutineQuarantine : requiredQuarantine;
  if (input.destination === "NZ")
    return input.origin === "AU" ? noRoutineQuarantine : requiredQuarantine;
  if (input.destination === "HK")
    return ["CN", "TH", "MY", "AE", "PH"].includes(input.origin)
      ? requiredQuarantine
      : noRoutineQuarantine;
  if (input.destination === "SG") {
    if (["AE", "CN", "TW", "TH", "MY", "PH"].includes(input.origin)) return requiredQuarantine;
    if (
      ["US", "CA", "FR", "DE", "HK", "IT", "JP", "NO", "PT", "ES", "CH", "NL"].includes(
        input.origin,
      )
    )
      return conditionalQuarantine;
    return noRoutineQuarantine;
  }
  if (input.destination === "MY")
    return ["AU", "CA"].includes(input.origin) ? requiredQuarantine : conditionalQuarantine;
  if (input.destination === "TW")
    return ["AU", "JP", "NZ", "NO", "SG", "GB"].includes(input.origin)
      ? noRoutineQuarantine
      : conditionalQuarantine;
  if (input.destination === "CN")
    return ["GB", "IE", "PT", "CH", "SG", "HK", "JP", "AU", "NZ"].includes(input.origin)
      ? noRoutineQuarantine
      : conditionalQuarantine;
  if (input.destination === "TH") return conditionalQuarantine;
  if (
    input.destination === "US" &&
    (input.arrivalRegion === "hawaii" ||
      input.arrivalRegion === "guam" ||
      (input.species === "dog" && ["CN", "TH", "MY", "PH", "BR", "AE"].includes(input.origin)))
  )
    return conditionalQuarantine;

  return noRoutineQuarantine;
}

// Only the server environment can enable unapproved research, never request fields.
export function draftAnswersAllowed(
  environment: string | undefined,
  serverResearchPreview?: string,
) {
  return environment === "development" || serverResearchPreview === "true";
}

export function shiftCalendarDate(value: string, days: number) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(value + "T00:00:00Z");
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) return null;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function applies(item: ResearchRequirement, input: RouteGuideRequest) {
  return (
    (!item.species || item.species === input.species) &&
    (!item.originCodes ||
      item.originCodes.includes(input.origin) ||
      item.retainForUnconfirmedHistory) &&
    (!item.excludedOriginCodes ||
      !item.excludedOriginCodes.includes(input.origin) ||
      (item.directOnlyOriginExemption && input.hasTransit)) &&
    (!item.destinationCodes || item.destinationCodes.includes(input.destination)) &&
    (!item.excludedDestinationCodes ||
      !item.excludedDestinationCodes.includes(input.destination)) &&
    (!item.arrivalRegions ||
      !input.arrivalRegion ||
      item.arrivalRegions.includes(input.arrivalRegion))
  );
}

function withCalendar(item: ResearchRequirement, input: RouteGuideRequest): DraftRequirement {
  const result: DraftRequirement = { ...item, bullets: [...item.bullets] };
  if (input.origin !== "GB")
    result.sourceIds = item.sourceIds.filter((id) => !id.startsWith("EU-gb-"));
  if (
    item.retainForUnconfirmedHistory &&
    item.originCodes &&
    !item.originCodes.includes(input.origin)
  ) {
    result.kind = "conditional";
    result.bullets.unshift(
      "Only if the lower-risk residence or return conditions are not met: ask the authority to select the correct pathway before arranging these procedures.",
    );
  }
  // Never calculate certificate or vaccine windows through an unassessed connection.
  if (input.hasTransit || !shiftCalendarDate(input.intendedArrival, 0)) return result;
  if (item.calendarRule === "eu-certificate" && input.origin === "GB") {
    result.calendar = {
      from: shiftCalendarDate(input.intendedArrival, -9)!,
      to: input.intendedArrival,
      note: "Possible issue window for this direct arrival; only after all health conditions are met.",
    };
  }
  if (item.calendarRule === "eu-primary-rabies") {
    const date = shiftCalendarDate(input.intendedArrival, -21)!;
    result.calendar = {
      from: date,
      to: date,
      note: "Latest first-course completion for the 21-day wait alone. Existing valid boosters differ; other steps may need much longer.",
    };
  }
  if (item.calendarRule === "arrival") {
    result.calendar = {
      from: input.intendedArrival,
      to: input.intendedArrival,
      note: "Your target arrival—not a confirmed booking or clearance.",
    };
  }
  return result;
}

export function getDraftRouteAnswer(input: RouteGuideRequest): DraftRouteAnswer | null {
  const origin = dossierByCode(input.origin);
  const destination = dossierByCode(input.destination);
  if (!origin || !destination || origin.code === destination.code) return null;
  if (needsPurposeReview(input)) {
    const evidence = purposeEvidence(input);
    const relevantSourceIds = new Set(
      destination.importRequirements.filter((r) => applies(r, input)).flatMap((r) => r.sourceIds),
    );
    const sources = evidence
      ? [evidence.source]
      : destination.sources.filter((s) => relevantSourceIds.has(s.id)).slice(0, 2);
    const sourceIds = sources.map((s) => s.id);
    return {
      version: "journey-purpose-2026-09-12.draft-1",
      publicationStatus: "draft",
      approvedBy: null,
      checkedOn: "2026-09-12",
      originName: origin.name,
      destinationName: destination.name,
      guideKind: "purpose-review",
      quarantine: conditionalQuarantine,
      headline: "Start with the right travel process.",
      summary: [
        `${purposeLabels[input.movementPurpose]}.`,
        ...(input.ownerTravelTiming === "outside-five-days"
          ? [
              "Your pet and their owner will travel more than five days apart, or the owner is not travelling.",
            ]
          : []),
        ...((input.petCount ?? 1) > 5
          ? [
              `You’re travelling with ${input.petCount} pets; group limits and any exceptions need checking.`,
            ]
          : []),
        "This journey needs a purpose-specific check before we can give you a veterinary checklist. This does not automatically mean a commercial journey.",
      ].join(" "),
      blockingNotes: [
        "This is a preparation brief, not a complete entry checklist. Confirm the process before booking transport or arranging dated certificates.",
      ],
      assumptions: [
        "No legal commercial/non-commercial classification has been made. The purpose of the journey, ownership, number of pets and owner’s travel dates all matter.",
        "Cargo is a transport choice, not a universal commercial classification.",
      ],
      routeFacts: [],
      requirements: [
        {
          id: "purpose-confirm",
          kind: "planning",
          title: "Confirm which rules cover this journey",
          timing: "Before booking",
          sourceIds,
          bullets: [
            evidence?.note ??
              `We have not verified the complete breeding, sale or transfer rules for ${destination.name}. Ask its animal-health authority to confirm how this journey is classified.`,
            `Describe the purpose (${purposeLabels[input.movementPurpose]}), ${input.petCount ?? 1} ${input.species}${(input.petCount ?? 1) > 1 ? "s" : ""}, who owns each animal before and after travel, and when the owner travels.`,
            "Ask separately about animal-health entry rules, customs treatment and any business or importer licence. One answer does not settle all three.",
          ],
        },
        {
          id: "purpose-documents",
          kind: "planning",
          title: "Agree the paperwork with both authorities",
          timing: "Once the process is confirmed",
          sourceIds,
          bullets: [
            "Ask the destination authority for the exact certificate model, permits, registrations and any advance arrival notification for this purpose. Requirements are not confirmed by this brief.",
            `Give those instructions to the official vet or animal-health authority in ${origin.name}. Confirm who signs or endorses the documents and which health work must happen first.`,
            "Keep sale, ownership, adoption or event evidence ready where relevant. Do not sign a declaration that does not describe the actual journey.",
          ],
        },
        {
          id: "purpose-transport",
          kind: "planning",
          title: "Confirm the arrival and transport arrangements",
          timing: "Before paying for the journey",
          sourceIds: [],
          bullets: [
            "After the authorities confirm the process, check the permitted arrival point, inspections and handling arrangements with the actual carrier or agent.",
            "Confirm every connection and each animal’s acceptance. A passenger booking or a cargo booking is not entry approval.",
          ],
        },
      ],
      departureRequirements: [],
      unresolved: [
        "A complete purpose-specific veterinary sequence, certificate timing, licensing and eligibility assessment remain outstanding.",
        "Any country-specific exceptions need confirmation for the actual owner, recipient, pet history and itinerary.",
      ],
      sources,
    };
  }
  let requirements = destination.importRequirements
    .filter((r) => applies(r, input))
    .map((r) => withCalendar(r, input));
  let departureRequirements = origin.exportRequirements
    .filter((r) => applies(r, input))
    .map((r) => withCalendar(r, input));
  // One appointment, not two: retain the origin's evidence inside the destination's AHC step.
  const ahc = requirements.find((r) => r.calendarRule === "eu-certificate");
  const gbAhc = departureRequirements.find((r) => r.id === "gb-export-eu");
  if (ahc && gbAhc) {
    ahc.bullets = [...new Set([...ahc.bullets, ...gbAhc.bullets])];
    ahc.sourceIds = [...new Set([...ahc.sourceIds, ...gbAhc.sourceIds])];
    departureRequirements = departureRequirements.filter((r) => r.id !== gbAhc.id);
  }
  departureRequirements = departureRequirements
    .filter((r) => input.movementPurpose !== "relocation" || r.id !== "gb-export-return")
    .map((r) =>
      r.id === "gb-export-return"
        ? {
            ...r,
            kind: "conditional" as const,
            title: "If you’re coming back, prepare the return journey",
          }
        : r,
    );
  const groups =
    input.destination === "US" && input.species === "cat"
      ? []
      : destination.originGroups.filter((group) => group.countryCodes.includes(input.origin));
  const unsupportedDirect =
    (input.destination === "AU" && ["BR", "CN", "TH", "MY", "PH"].includes(input.origin)) ||
    (input.destination === "NZ" && ["BR", "CN", "TH", "PH"].includes(input.origin));
  // A newly offered origin is not automatically eligible for a destination's
  // researched branches. This also protects future country-library additions.
  const originNotClassified =
    !unsupportedDirect &&
    destination.originGroups.length > 0 &&
    groups.length === 0 &&
    !(input.destination === "US" && input.species === "cat");
  const blockingNotes: string[] = [];
  if (input.origin === "GB" && input.destination === "BR")
    blockingNotes.push(
      "Certificate conflict needs confirmation: Brazil requires the newer MAPA CVI model, while APHA's active EHC 2906 page links an older specimen. Ask your official vet to reconcile the document and timing with APHA and MAPA before certificate issue or confirming travel.",
    );
  if (input.travellerRelationship !== "owner")
    blockingNotes.push(
      "Confirm the owner’s travel dates and written authorisation for the accompanying person. Personal-pet rules may not apply when those conditions are not met.",
    );
  if ((input.petCount ?? 1) > 1)
    blockingNotes.push(
      "Travelling with more than one pet: check the destination’s per-person and group limits, and prepare separate records for each animal. The number entered is not an eligibility check.",
    );
  if (unsupportedDirect) {
    blockingNotes.push(
      "This origin has no direct approved-country pathway in the researched list. Establish an approved preparation and residence pathway before booking.",
    );
    requirements = [
      {
        id: destination.code + "-approved-origin-needed",
        kind: "required",
        title: "Establish an approved exporting-country pathway first",
        timing: "Before arranging veterinary work or paying for transport",
        bullets: [
          "The selected departure country is not on the reviewed list of eligible direct-export origins.",
          "Ask the destination authority which approved country can complete the required residence, identity, tests and certification. A short connection or holiday does not establish eligibility.",
          "The standard direct-import steps are withheld here because they would not be a usable sequence for this route. The full country dossier retains those pathways for review.",
        ],
        sourceIds: groups.length
          ? groups.flatMap((group) => group.sourceIds)
          : destination.sources
              .filter((source) => source.id === "au-approved" || source.id === "nz-approvals")
              .map((source) => source.id),
      },
    ];
  }
  if (originNotClassified) {
    blockingNotes.push(
      `${origin.name}'s origin classification for ${destination.name} has not been researched. Confirm its pathway before relying on country-specific preparation steps.`,
    );
    requirements = [
      {
        id: destination.code + "-origin-classification-needed",
        kind: "required",
        title: "Confirm the origin-specific entry pathway",
        timing: "Before veterinary preparation or booking",
        bullets: [
          `Our ${destination.name} research does not yet classify arrivals from ${origin.name}. This is a research gap, not a finding that entry is prohibited.`,
          "Ask the destination's animal-health authority to confirm the applicable origin group, residence history, permits and certificate. The standard steps are withheld until the pathway is established.",
        ],
        sourceIds: [...new Set(destination.originGroups.flatMap((group) => group.sourceIds))],
      },
    ];
  }
  if (input.hasTransit)
    blockingNotes.push(
      "Connection not assessed: first-border entry, transit controls and handling can change these steps. Do not treat this as a complete connecting itinerary.",
    );
  if (input.destination === "US" && !input.arrivalRegion)
    blockingNotes.push(
      "Choose the actual US arrival region. Federal rules do not replace Hawaii, Guam or other local requirements.",
    );
  const used = new Set([...requirements, ...departureRequirements].flatMap((r) => r.sourceIds));
  for (const group of groups) for (const id of group.sourceIds) used.add(id);
  const sources = [
    ...new Map(
      [...destination.sources, ...origin.sources]
        .filter((s) => used.has(s.id))
        .map((s) => [s.id, s]),
    ).values(),
  ];
  return {
    version: "country-library-2026-09-12.draft-3",
    publicationStatus: "draft",
    approvedBy: null,
    checkedOn: [origin.checkedOn, destination.checkedOn].sort().at(-1)!,
    guideKind: "personal",
    quarantine: quarantineAssessment(input, unsupportedDirect || originNotClassified),
    originName: origin.name,
    destinationName: destination.name,
    headline:
      input.movementPurpose === "relocation"
        ? "A new home. The same family."
        : "A trip with your own pet.",
    summary:
      input.movementPurpose === "relocation"
        ? "You’re relocating with your pet, without a change of owner. Start with these travel preparations; moving home does not itself mean a sale or breeding shipment."
        : "You’re taking your own pet abroad, without a change of owner. Here’s what to arrange for the outward journey.",
    assumptions: [
      `${input.petCount ?? 1} personally owned ${input.species}${(input.petCount ?? 1) > 1 ? "s" : ""}, with no sale or ownership transfer. Each pet needs its own records. The owner’s travel dates and any authorised companion must meet the destination’s rules.`,
      "The departure country is known; residence history, earlier travel, age, breed and veterinary records have not yet been checked.",
      ...(input.origin === "GB" || input.destination === "GB"
        ? ["Great Britain means England, Scotland and Wales; Northern Ireland is not included."]
        : []),
      ...(input.origin === "MY" || input.destination === "MY"
        ? ["Malaysia means Peninsular Malaysia; Sabah and Sarawak need separate requirements."]
        : []),
      ...(input.hasTransit
        ? [
            "Your connection has not been assessed. Transit, first-border entry and cargo handling may change this checklist; calendar windows are withheld.",
          ]
        : ["Direct outbound journey assumed. A return journey requires a separate assessment."]),
      "This guide uses dated research and any live source checks shown in the evidence report. Government entry rules and the airline’s acceptance are separate.",
    ],
    routeFacts: groups.map((group) => `${group.label}: ${group.condition}`),
    blockingNotes,
    requirements,
    departureRequirements,
    unresolved: [
      ...(input.hasTransit
        ? ["Connection requirements are not included; confirm them before booking."]
        : []),
      ...(input.travellerRelationship !== "owner"
        ? ["The owner's travel dates and the companion's written authority must be established."]
        : []),
      ...(input.destination === "US" && !input.arrivalRegion
        ? [
            "Select the actual US state or territory: Hawaii, Guam and other destinations have different local requirements.",
          ]
        : []),
      ...destination.gaps.map((gap) => `${destination.name}: ${gap}`),
      ...destination.caveats,
      ...origin.gaps.map((gap) => `${origin.name} research limitation: ${gap}`),
      "Pet records, residence history and the actual carrier/entry point still need checking. No earliest feasible travel date or permission to travel has been determined.",
    ],
    sources,
  };
}
