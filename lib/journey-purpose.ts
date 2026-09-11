import type { RouteGuideRequest } from "./route-intelligence.ts";

export const purposeLabels = {
  personal: "Travelling with my pet",
  relocation: "Moving home with my pet",
  sale: "Sale or delivery to a new owner",
  adoption: "Adoption or rehoming",
  transfer: "Another change of owner",
  breeding: "Breeding, with the same owner",
  event: "Show, competition or sporting event",
};

// This is a guide-selection boundary, not a legal commercial/non-commercial verdict.
export function needsPurposeReview(input: RouteGuideRequest) {
  return (
    !["personal", "relocation"].includes(input.movementPurpose) ||
    (input.petCount ?? 1) > 5 ||
    input.ownerTravelTiming === "outside-five-days"
  );
}

export const movementSources = {
  EU: {
    id: "movement-EU",
    authority: "European Commission",
    title: "Pet movement FAQs",
    url: "https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/faqs_en",
  },
  GB: {
    id: "movement-GB",
    authority: "GOV.UK",
    title: "Bringing your pet to Great Britain",
    url: "https://www.gov.uk/bring-pet-to-great-britain",
  },
  US: {
    id: "movement-US",
    authority: "USDA APHIS",
    title: "Commercial dog import and exceptions",
    url: "https://www.aphis.usda.gov/live-animal-import/commercial-dog-import",
  },
  CA: {
    id: "movement-CA",
    authority: "CFIA",
    title: "Buying, adopting and importing dogs",
    url: "https://inspection.canada.ca/en/importing-food-plants-animals/pets/ask-questions-you-get-dog",
  },
  CH: {
    id: "movement-CH",
    authority: "Swiss FSVO",
    title: "Travelling with dogs, cats and ferrets",
    url: "https://www.blv.admin.ch/en/travelling-with-dogs-cats-and-ferrets",
  },
  NO: {
    id: "movement-NO",
    authority: "Mattilsynet",
    title: "When someone else travels with your pet",
    url: "https://www.mattilsynet.no/dyr/kjaeledyr/reise-med-kjaeledyr/reglene-for-ikke-kommersiell-reise-med-kjaeledyr/nar-dyrene-ikke-kan-reise-sammen-med-deg",
  },
  AU: {
    id: "movement-AU",
    authority: "Australian Border Force",
    title: "Importing animals: customs treatment",
    url: "https://www.abf.gov.au/importing-exporting-and-manufacturing/importing/how-to-import/types-of-imports/importing-animals",
  },
  NZ: {
    id: "movement-NZ",
    authority: "New Zealand Customs",
    title: "Bringing pets and animals into New Zealand",
    url: "https://www.customs.govt.nz/travel-to-and-from-new-zealand/move-to-new-zealand-permanently/import-pets-and-animals",
  },
  SG: {
    id: "movement-SG",
    authority: "Singapore AVS",
    title: "Importing dogs and cats",
    url: "https://avs.nparks.gov.sg/pets/importing-exporting-a-pet/import/dogs-and-cats/",
  },
};
export const euDestinations = ["IE", "FR", "DE", "NL", "ES", "IT", "PT"];

const additionalPurposeEvidence: Record<
  string,
  { source: { id: string; authority: string; title: string; url: string }; note: string }
> = {
  HK: {
    source: {
      id: "movement-HK",
      authority: "Hong Kong AFCD",
      title: "Import application and trading-purpose licence",
      url: "https://www.afcd.gov.hk/english/quarantine/qua_ie/qua_ie_ipab/qua_ie_ipab_idc/qua_ie_ipab_idc_Group_I.html",
    },
    note: "AFCD requires an Animal Trader Licence in advance for trading-purpose imports, alongside the Special Permit. Confirm whether your purpose requires that licence; imported adoption, breeding and event cases are not fully assessed here.",
  },
  CN: {
    source: {
      id: "movement-CN",
      authority: "GACC / Beijing Government",
      title: "Incoming pets: passenger rules",
      url: "https://english.beijing.gov.cn/latest/lawsandpolicies/202104/t20210407_2346645.html",
    },
    note: "China’s passenger-pet regime limits entry to one dog or cat per person per entry. That regime does not establish eligibility for commercial sale, breeding or cargo outside the passenger process. Those arrangements need direct Customs confirmation.",
  },
  TW: {
    source: {
      id: "movement-TW",
      authority: "Taiwan APHIA",
      title: "Dog and cat import FAQ, March 2026",
      url: "https://pet-epermit.aphia.gov.tw/files/other/information_146asfiledownload0_14721c.pdf",
    },
    note: "Taiwan has a specific short-term procedure for certain international events, including a project quarantine application at least 60 days before import. It is not an exemption for every show. Sale, adoption and breeding permissions still need confirmation.",
  },
  JP: {
    source: {
      id: "movement-JP",
      authority: "Japan Ministry of the Environment",
      title: "Animal-business registration",
      url: "https://www.env.go.jp/nature/dobutsu/aigo/1_law/trader.html",
    },
    note: "Japan’s animal-business registration rules include breeding and importing or exporting animals for sale. These business rules are separate from AQS animal-health entry requirements; occasional purchases, adoption and event cases are not fully assessed here.",
  },
  MY: {
    source: {
      id: "movement-MY",
      authority: "Malaysia DVS",
      title: "Dog and cat import protocol and country notice",
      url: "https://www.dvs.gov.my/dvs/resources/user_1/2026/BKPBV/IMPORT%20EKSPORT/%28R2%29-CatsNdogs-NONSCHEDULED_COUNTRIES-revised131213_-_notis.pdf",
    },
    note: "The DVS protocol covers any purpose, but controlled dog breeds have personal-pet or security-use restrictions. This does not settle business licensing or permission to sell. Confirm the applicable protocol and purpose with DVS and MAQIS.",
  },
  TH: {
    source: {
      id: "movement-TH",
      authority: "Thai Customs",
      title: "Personal pets: passenger, cargo and temporary import",
      url: "https://www.customs.go.th/list_strc_simple_neted.php?ini_content=individual_F01_160913_01&ini_menu=menu_individual_submenu_02&lang=en&left_menu=menu_individual_submenu_02_160421_02&root_left_menu=menu_individual_submenu_02",
    },
    note: "Thai Customs expressly provides personal-pet cargo and temporary-import procedures. Cargo does not establish a commercial purpose. Sale, breeding and trading permissions remain unverified here, and DLD animal-health permission is a separate check.",
  },
  PH: {
    source: {
      id: "movement-PH",
      authority: "Philippines BAI",
      title: "Citizen’s Charter: pet and commercial importers",
      url: "https://www.bai.gov.ph/cc/2024%20bai%20citizen%27s%20charter.pdf",
    },
    note: "BAI’s 2024 Charter includes non-profit breeding within its one-time pet-importer category, while regular commercial importers require accreditation. Confirm current BAI implementation and the actual permit; breeding is not a universal commercial label.",
  },
  AE: {
    source: {
      id: "movement-AE",
      authority: "UAE MOCCAE",
      title: "Import companion animals: individual and establishment conditions",
      url: "https://www.moccae.gov.ae/ar/services/import-permit-pets",
    },
    note: "MOCCAE distinguishes individual importers from licensed establishments. Establishments need an appropriate animal-activity licence. Individual sale, adoption, breeding and event eligibility are not fully assessed here; confirm these alongside the import permit and health conditions.",
  },
};

export function purposeEvidence(input: RouteGuideRequest) {
  if (additionalPurposeEvidence[input.destination])
    return additionalPurposeEvidence[input.destination];
  if (input.destination === "NO")
    return {
      source: movementSources.NO,
      note: "Norway allows a pet to travel as freight within five days before or after the owner, with evidence of the owner’s journey. Accompaniment and written documents matter; if the private-travel conditions are not met, the authority directs travellers to its commercial-import rules.",
    };
  if (input.destination === "AU")
    return {
      source: movementSources.AU,
      note: "Australian customs treats animals imported for breeding, sale, racing or competition as commercial animals. This is a customs classification: biosecurity eligibility, approved origins, health preparation and permits still need separate confirmation.",
    };
  if (input.destination === "NZ")
    return {
      source: movementSources.NZ,
      note: "New Zealand Customs includes breeding, showing and racing among commercial reasons and directs those importers to a customs broker. MPI’s animal-health and biosecurity conditions must be checked separately.",
    };
  if (input.destination === "SG")
    return {
      source: movementSources.SG,
      note: "Singapore separates personal and commercial import licences. For Schedule II, owner timing and shared residence affect quarantine for a personal licence; a commercial licence has different quarantine arrangements. Confirm the licence and history before choosing the preparation steps.",
    };
  if (euDestinations.includes(input.destination))
    return {
      source: movementSources.EU,
      note: "EU personal-pet travel depends on ownership, the owner’s travel and the accompanying person—not cabin versus cargo. A journey intended for sale or transfer needs the appropriate movement rules. Some newly acquired pets travelling home with their new owner can qualify; confirm the actual circumstances.",
    };
  if (input.destination === "GB")
    return {
      source: movementSources.GB,
      note: "Great Britain requires extra rules for sale, rehoming or ownership transfer, an owner arriving more than five days apart, or more than five pets without an eligible event exception. Moving home is not itself a sale.",
    };
  if (input.destination === "US" && input.species === "dog")
    return {
      source: movementSources.US,
      note: "USDA’s dog-resale rules do not cover every adoption or breeding journey. Its exceptions include breeding dogs not resold and dogs delivered to final new owners who will not resell them. CDC, other animal-health and state requirements remain separate.",
    };
  if (input.destination === "CA" && input.species === "dog")
    return {
      source: movementSources.CA,
      note: "Canada’s commercial dog purposes include breeding, showing, adoption, fostering and transfer to another person. Confirm the applicable age, origin and end-use rules with CFIA; do not use another country’s definition.",
    };
  if (input.destination === "CH")
    return {
      source: movementSources.CH,
      note: "Swiss pet-travel and commercial-import conditions are separate. Confirm ownership, accompaniment and the number of animals before selecting the certificate and entry procedure.",
    };
  return null;
}
