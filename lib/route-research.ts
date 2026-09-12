// Migrated from the supplied 11 September 2026 ledger. These are research links,
// not approved rules. Questions must not be rendered as confirmed requirements.
export type ResearchSource = {
  title: string;
  authority: string;
  url: string;
  status: string;
  note: string;
  verifiedOn: string;
};
export type ResearchCountry = {
  name: string;
  held: boolean;
  sources: ResearchSource[];
  questions: { title: string; summary: string; species?: "dog" | "cat" }[];
};
export const countryResearch: Record<string, ResearchCountry> = {
  BR: {
    name: "Brazil",
    held: false,
    sources: [
      {
        title: "Entrar no Brasil",
        authority: "Brazil MAPA / Vigiagro",
        url: "https://www.gov.br/agricultura/pt-br/assuntos/vigilancia-agropecuaria/animais-estimacao/entrar-no-brasil",
        status: "verified_official",
        note: "Current model required from September 2025; reconcile older bilateral export specimens before certification.",
        verifiedOn: "2026-09-12",
      },
      {
        title: "Portaria MAPA 741/2024: dogs and cats",
        authority: "Brazil MAPA / Diário Oficial da União",
        url: "https://www.gov.br/agricultura/pt-br/assuntos/vigilancia-agropecuaria/animais-estimacao/portaria-mapa-no-741_2024-caninos-e-felinos-domesticos-1.pdf",
        status: "verified_official",
        note: "Primary requirements; animal history and the actual accepted export document still need assessment.",
        verifiedOn: "2026-09-12",
      },
      {
        title: "Sair do Brasil",
        authority: "Brazil MAPA / Vigiagro",
        url: "https://www.gov.br/agricultura/pt-br/assuntos/vigilancia-agropecuaria/animais-estimacao/sair-do-brasil",
        status: "verified_official",
        note: "Use the destination-specific application, certification and endorsement process.",
        verifiedOn: "2026-09-12",
      },
    ],
    questions: [
      {
        title: "Which certificate has the exporting authority confirmed?",
        summary: "Brazil requires its current MAPA model. If leaving Great Britain, ask APHA and MAPA to reconcile the older EHC 2906 specimen before certificate issue.",
      },
      {
        title: "What are your pet's age and rabies records?",
        summary: "Confirm the actual age, continuous vaccination history and any claimed exception. Plan treatments against certificate issue, using the accepted document.",
      },
      {
        title: "Will your pet return or connect through another country?",
        summary: "Check every border separately. A Brazilian entry certificate does not establish eligibility to return to Great Britain or another home country.",
      },
    ],
  },
  US: {
    name: "United States",
    held: false,
    sources: [
      {
        title: "Bringing a Dog into the United States",
        authority: "United States Centers for Disease Control and Prevention",
        url: "https://www.cdc.gov/importation/dogs/index.html",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
      {
        title: "Pet Travel",
        authority: "United States Department of Agriculture APHIS",
        url: "https://www.aphis.usda.gov/pet-travel",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which state or territory will your pet enter?",
        summary:
          "Check the destination as well as the country. Tell us whether you are heading to the mainland, Hawaii, Guam or another territory.",
      },
      {
        title: "Where has your dog been in the last six months?",
        summary:
          "Prepare its country-by-country travel history for the authority. The departure country alone may not identify the right pathway.",
        species: "dog",
      },
      {
        title: "Which instructions apply to your pet’s species?",
        summary:
          "Use the relevant species guidance and ask about any additional state, airport or agriculture checks. Do not use the dog-import checklist for a cat.",
      },
    ],
  },
  CA: {
    name: "Canada",
    held: false,
    sources: [
      {
        title: "Travelling with pets",
        authority: "Canadian Food Inspection Agency",
        url: "https://inspection.canada.ca/en/travelling-pets-food-plants/travelling-pets",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which entry scenario matches your pet?",
        summary:
          "Ask CFIA to identify the scenario for your pet’s age, origin and reason for travelling.",
      },
      {
        title: "Is your pet returning home or changing owners?",
        summary:
          "Have the owner’s travel plans and any adoption or transfer details ready when checking the pathway.",
      },
      {
        title: "What should you check at your destination?",
        summary:
          "Confirm any provincial or territorial instructions alongside the federal guidance.",
      },
    ],
  },
  GB: {
    name: "Great Britain",
    held: false,
    sources: [
      {
        title: "Bringing your pet dog, cat or ferret to Great Britain",
        authority: "UK Government / APHA / DEFRA",
        url: "https://www.gov.uk/bring-pet-to-great-britain",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Are you travelling to Great Britain?",
        summary:
          "This selection covers England, Scotland and Wales. Northern Ireland needs a separate assessment; do not use this guide for it.",
      },
      {
        title: "Which travel document fits this journey?",
        summary:
          "Ask which document is appropriate for your origin, pet and vaccination history before arranging appointments.",
      },
      {
        title: "Can your pet arrive on your chosen route?",
        summary:
          "Check the authority’s current route guidance against the flight and arrival point you intend to use.",
      },
      {
        title: "What treatment and breed checks should you discuss?",
        summary:
          "Ask your vet and the authority which dog-specific checks apply and how any treatment must be timed.",
        species: "dog",
      },
    ],
  },
  IE: {
    name: "Ireland",
    held: false,
    sources: [
      {
        title: "Pet travel",
        authority: "Government of Ireland, Department of Agriculture, Food and the Marine",
        url: "https://www.gov.ie/en/department-of-agriculture-food-and-the-marine/publications/pet-travel/",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
      {
        title: "EU rules on travelling with pets",
        authority: "European Union - Your Europe",
        url: "https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which entry pathway applies to your origin?",
        summary:
          "Review your pet’s residence and travel history with the authority before choosing its paperwork.",
      },
      {
        title: "Which document and arrival checks do you need?",
        summary: "Confirm the travel document and any arrangements at the intended arrival point.",
      },
      {
        title: "Does your dog need a timed treatment?",
        summary:
          "Ask your vet whether the route needs tapeworm treatment and, if so, when it must be given.",
        species: "dog",
      },
    ],
  },
  FR: {
    name: "France",
    held: false,
    sources: [
      {
        title: "Travel: coming to France with your pet",
        authority: "French Customs",
        url: "https://www.douane.gouv.fr/fiche/travel-coming-france-your-pet",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
      {
        title: "EU rules on travelling with pets",
        authority: "European Union - Your Europe",
        url: "https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which entry pathway fits your pet’s journey?",
        summary:
          "Confirm the pathway for your departure country and your pet’s age and rabies history.",
      },
      {
        title: "Could your dog’s breed affect the journey?",
        summary:
          "Check the French authority’s guidance using the dog’s breed and physical type before booking.",
        species: "dog",
      },
      {
        title: "Which document and entry point should you use?",
        summary: "Ask which travel document and arrival checks apply to your exact journey.",
      },
    ],
  },
  DE: {
    name: "Germany",
    held: false,
    sources: [
      {
        title: "Dangerous dogs - import restrictions",
        authority: "German Customs",
        url: "https://www.zoll.de/DE/Privatpersonen/Reisen/Rueckkehr-aus-einem-Nicht-EU-Staat/Einschraenkungen/Gefaehrliche-Hunde/gefaehrliche_hunde.html",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
      {
        title: "EU rules on travelling with pets",
        authority: "European Union - Your Europe",
        url: "https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which German state are you heading to?",
        summary:
          "Have the final destination ready when checking the national and state-level guidance.",
      },
      {
        title: "Does your dog need a breed check?",
        summary: "Ask whether federal or state breed rules affect your dog’s journey.",
        species: "dog",
      },
      {
        title: "Which entry documents fit this pathway?",
        summary:
          "Confirm the pathway for your pet’s origin, age and rabies history, then ask which document you should obtain.",
      },
    ],
  },
  NL: {
    name: "Netherlands",
    held: false,
    sources: [
      {
        title: "Travelling from third countries to the Netherlands",
        authority: "Netherlands Food and Consumer Product Safety Authority",
        url: "https://english.nvwa.nl/topics/animal-health/travelling-to-the-netherlands-with-your-dog-or-cat/travelling-from-third-countries-to-the-netherlands",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
      {
        title: "EU rules on travelling with pets",
        authority: "European Union - Your Europe",
        url: "https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Where has your pet recently lived?",
        summary:
          "Review its residence history as well as the country it is flying from. Ask whether any origin-specific health conditions need checking.",
      },
      {
        title: "Does its age and rabies history fit the entry pathway?",
        summary: "Bring the relevant records to your vet before making a timing plan.",
      },
      {
        title: "What happens at your arrival point?",
        summary: "Confirm the document, customs and identity checks for your intended arrival.",
      },
    ],
  },
  ES: {
    name: "Spain",
    held: false,
    sources: [
      {
        title: "Travelling with pets",
        authority: "Spanish Ministry of Agriculture, Fisheries and Food",
        url: "https://www.mapa.gob.es/en/ganaderia/temas/comercio-exterior-ganadero/desplazamiento-animales-compania",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
      {
        title: "EU rules on travelling with pets",
        authority: "European Union - Your Europe",
        url: "https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which entry pathway applies to your origin?",
        summary:
          "Review the official guidance for the country your pet is coming from and its health history.",
      },
      {
        title: "Is your intended airport or port suitable?",
        summary: "Confirm where the entry checks for your pathway can take place.",
      },
      {
        title: "Do the owner’s travel dates change the process?",
        summary:
          "Tell the authority how many pets are travelling, who accompanies them and when the owner travels.",
      },
    ],
  },
  IT: {
    name: "Italy",
    held: false,
    sources: [
      {
        title: "Travelling to Italy with pets",
        authority: "Italian Ministry of Health",
        url: "https://www.salute.gov.it/new/en/tema/animali-daffezione/travelling-italy-pets/",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
      {
        title: "EU rules on travelling with pets",
        authority: "European Union - Your Europe",
        url: "https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Is this personal travel or a change of owner?",
        summary: "Identify the right pathway before relying on a personal pet-travel checklist.",
      },
      {
        title: "Does your pet’s history fit that pathway?",
        summary: "Check its age and vaccination records with your vet and the relevant authority.",
      },
      {
        title: "Which document and arrival checks should you arrange?",
        summary: "Include the number of pets and owner’s travel dates when confirming the process.",
      },
    ],
  },
  PT: {
    name: "Portugal",
    held: false,
    sources: [
      {
        title: "Entering Portugal from a country outside the EU",
        authority: "Portuguese Directorate-General for Food and Veterinary Affairs",
        url: "https://www.dgav.pt/vaiviajar/conteudo/conteudo-animais-de-companhia/entrar-em-portugal-a-partir-de-um-pais-fora-da-ue-inclui-o-reino-unido-exceto-a-irlanda-do-norte/",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
      {
        title: "EU rules on travelling with pets",
        authority: "European Union - Your Europe",
        url: "https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which instructions apply on your arrival date?",
        summary:
          "Confirm the current entry pathway for your origin and intended arrival before arranging documents.",
      },
      {
        title: "Which document fits your pet’s history?",
        summary: "Have its identification and rabies records ready for the document check.",
      },
      {
        title: "Can entry checks take place when you arrive?",
        summary:
          "Confirm the intended airport, arrival time, connections and owner’s travel dates with the authority.",
      },
    ],
  },
  CH: {
    name: "Switzerland",
    held: false,
    sources: [
      {
        title: "Travelling with dogs, cats and ferrets",
        authority: "Swiss Federal Food Safety and Veterinary Office",
        url: "https://www.blv.admin.ch/en/travelling-with-dogs-cats-and-ferrets",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which Swiss entry pathway fits your origin?",
        summary:
          "Use the official guidance to identify the relevant pathway before planning appointments.",
      },
      {
        title: "Does your pet need an additional eligibility check?",
        summary: "Ask whether its age, breed or any ear or tail alterations need authority review.",
      },
      {
        title: "What records and arrival steps should you confirm?",
        summary:
          "Check the identification, rabies, any relevant test records and customs process for that pathway.",
      },
    ],
  },
  NO: {
    name: "Norway",
    held: false,
    sources: [
      {
        title: "Travelling with dogs, cats and ferrets from third countries",
        authority: "Norwegian Food Safety Authority",
        url: "https://www.mattilsynet.no/en/animals/travelling-with-dogs-cats-and-ferrets-from-third-countries-and-territories-to-norway",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which entry pathway applies to your origin?",
        summary: "Ask which travel document and rabies records are relevant to this journey.",
      },
      {
        title: "Does your dog need a timed treatment?",
        summary: "Ask your vet whether treatment applies and which timing the authority requires.",
        species: "dog",
      },
      {
        title: "Should you contact your arrival point in advance?",
        summary: "Confirm the inspection process and any advance arrangements with the authority.",
      },
    ],
  },
  AE: {
    name: "United Arab Emirates",
    held: true,
    sources: [
      {
        title: "Official pet import requirements PDF",
        authority: "UAE Ministry of Climate Change and Environment",
        url: "https://moccae.gov.ae/Handlers/DownloadPDF.ashx?id=67445",
        status: "official_source_partial",
        note: "Official file identified; detailed extraction requires manual editorial capture before production.",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Confirm the current route directly with MOCCAE",
        summary:
          "Our UAE research is incomplete. Ask MOCCAE for the instructions for your pet, origin and intended arrival date. We are not publishing its detailed requirements here.",
      },
    ],
  },
  SG: {
    name: "Singapore",
    held: false,
    sources: [
      {
        title: "Importing dogs and cats",
        authority: "Singapore Animal and Veterinary Service",
        url: "https://avs.nparks.gov.sg/pets/importing-exporting-a-pet/import/dogs-and-cats/",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which pathway fits your pet’s residence history?",
        summary: "Review where your pet has lived, including the origin of this journey, with AVS.",
      },
      {
        title: "Do the ownership and travel dates change that pathway?",
        summary: "Have the ownership, co-residence and owner-travel details ready when asking AVS.",
      },
      {
        title: "What records and arrival arrangements need checking?",
        summary:
          "Ask which identification, vaccination, licence, inspection or quarantine questions apply before building a timeline.",
      },
    ],
  },
  HK: {
    name: "Hong Kong",
    held: false,
    sources: [
      {
        title: "Import of dogs and cats",
        authority: "Hong Kong Agriculture, Fisheries and Conservation Department",
        url: "https://www.afcd.gov.hk/english/quarantine/qua_ie/qua_ie_ipab/qua_ie_ipab_idc/qua_ie_ipab_idc.html",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which origin group fits your pet’s history?",
        summary:
          "Ask AFCD to identify the relevant origin group using your pet’s residence history, not just the departure airport.",
      },
      {
        title: "Could breed or ancestry affect the pathway?",
        summary:
          "Confirm your pet’s breed and any hybrid ancestry against the current official guidance.",
      },
      {
        title: "What permits and arrival arrangements should you discuss?",
        summary:
          "Ask AFCD which health records, permit steps, flight arrangements or quarantine questions apply to this route.",
      },
    ],
  },
  JP: {
    name: "Japan",
    held: false,
    sources: [
      {
        title: "Importing dogs and cats into Japan",
        authority:
          "Japan Ministry of Agriculture, Forestry and Fisheries - Animal Quarantine Service",
        url: "https://www.maff.go.jp/aqs/english/animal/dog/",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which entry pathway fits your pet’s history?",
        summary:
          "Review its residence history with Japan’s Animal Quarantine Service before choosing a preparation sequence.",
      },
      {
        title: "What do its microchip and vaccination records show?",
        summary: "Bring the dates and any antibody-test records to your vet for review.",
      },
      {
        title: "Which dates should AQS confirm?",
        summary:
          "Ask about the applicable waiting, notification, examination and certification steps before relying on an arrival date.",
      },
    ],
  },
  AU: {
    name: "Australia",
    held: false,
    sources: [
      {
        title: "Step-by-step guides for bringing cats and dogs to Australia",
        authority: "Australian Department of Agriculture, Fisheries and Forestry",
        url: "https://www.agriculture.gov.au/cats-dogs/step-by-step-guides",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which Australian entry pathway fits your pet?",
        summary:
          "Confirm its origin, residence history, breed and any hybrid ancestry with the authority.",
      },
      {
        title: "Which health records need checking?",
        summary:
          "Have the identification, rabies and any antibody-test records available for the pathway assessment.",
      },
      {
        title: "What transport and arrival arrangements apply?",
        summary:
          "Ask about the permit, flight and quarantine arrangements in the official guide before booking.",
      },
    ],
  },
  NZ: {
    name: "New Zealand",
    held: true,
    sources: [
      {
        title: "Bringing cats and dogs to New Zealand",
        authority: "New Zealand Ministry for Primary Industries",
        url: "https://www.mpi.govt.nz/bring-send-to-nz/pets-travelling-to-nz/bringing-cats-and-dogs-to-nz",
        status: "official_source_partial",
        note: "Official page identified; exact 2026 transition details need manual editorial capture.",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Confirm the current route directly with MPI",
        summary:
          "Our New Zealand research is incomplete. Ask MPI for the instructions for your pet, origin and intended arrival date. We are not publishing its detailed requirements here.",
      },
    ],
  },
  CN: {
    name: "Mainland China",
    held: false,
    sources: [
      {
        title: "Announcement on quarantine supervision of pets entering China",
        authority: "General Administration of Customs of China",
        url: "https://english.customs.gov.cn/statics/88707c1e-aa4e-40ca-a968-bdbdbb565e4f.html",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
      {
        title: "Quarantine and supervision requirements for pets entering China",
        authority: "Beijing Municipal Government - official English republication",
        url: "https://english.beijing.gov.cn/latest/lawsandpolicies/202104/t20210407_2346645.html",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which entry pathway fits your journey?",
        summary:
          "Tell Customs your origin, how many pets are travelling and how many passengers accompany them.",
      },
      {
        title: "Which records should Customs check?",
        summary: "Ask which microchip, rabies and laboratory records are relevant to that pathway.",
      },
      {
        title: "What happens at your intended entry port?",
        summary: "Confirm inspection and any quarantine arrangements for the exact arrival point.",
      },
    ],
  },
  TW: {
    name: "Taiwan",
    held: false,
    sources: [
      {
        title: "Online Application System for Dog/Cat Import Permit",
        authority: "Taiwan Animal and Plant Health Inspection Agency",
        url: "https://pet-epermit.aphia.gov.tw/Entry?Command=Apply_Addnew&sLang=2&sRoot=Y&sShellType=99&sUrlParameter=sShellType%3D99%7CsLang%3D2",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
      {
        title: "Notes on Applying for Quarantine",
        authority: "Taiwan Animal and Plant Health Inspection Agency",
        url: "https://pet-epermit.aphia.gov.tw/Entry?Command=Information_PrintContent&sFunctionId=&sItem=165&sLang=2&sPicName=pubimg0.png",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which pathway fits your pet’s residence history?",
        summary: "Ask APHIA to identify the pathway for your origin, pet and recent residence.",
      },
      {
        title: "Could breed or health records change the answer?",
        summary:
          "Confirm breed eligibility and which identification, rabies and laboratory records need review.",
      },
      {
        title: "What should you arrange before travelling?",
        summary: "Ask APHIA which application timing and arrival arrangements apply to this route.",
      },
    ],
  },
  TH: {
    name: "Thailand",
    held: false,
    sources: [
      {
        title: "How to legally bring pets into Thailand",
        authority: "Royal Thai Government",
        url: "https://thailand.go.th/issue-focus-detail/how-to-legally-bring-pets-into-thailand?hl=en",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which DLD instructions fit your journey?",
        summary: "Identify the instructions for your pet’s origin and travel purpose.",
      },
      {
        title: "Which applications and records should you prepare?",
        summary: "Ask which permissions, vaccination records and certificate dates are relevant.",
      },
      {
        title: "What should you arrange at your arrival airport?",
        summary:
          "Confirm the process with the animal quarantine station serving your intended airport.",
      },
    ],
  },
  MY: {
    name: "Peninsular Malaysia",
    held: true,
    sources: [
      {
        title: "Import and export permit information",
        authority: "Department of Veterinary Services Malaysia",
        url: "https://www.dvs.gov.my/index.php/pages/view/1941",
        status: "official_source_partial",
        note: "Authority and ePermit pathway verified; pet-specific condition tables require manual extraction.",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Confirm the authority for your exact destination",
        summary:
          "Our Malaysia research is incomplete and its seed scope is Peninsular Malaysia only. Do not use it for Sabah or Sarawak. Ask the authority responsible for your destination for current instructions before booking.",
      },
    ],
  },
  PH: {
    name: "Philippines",
    held: false,
    sources: [
      {
        title: "Pet import requirements",
        authority: "Philippines Bureau of Animal Industry",
        url: "https://www.bai.gov.ph/Stakeholders/PetImport",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
    questions: [
      {
        title: "Which BAI pathway fits your pet?",
        summary:
          "Check the application pathway using your pet’s age and the number of animals travelling.",
      },
      {
        title: "Which health records should you prepare?",
        summary:
          "Ask which identification, vaccination and treatment records are needed for that application.",
      },
      {
        title: "Do your arrival and document dates line up?",
        summary:
          "Confirm any applicable clearance or certificate windows, original documents and arrival checks with BAI.",
      },
    ],
  },
};
export const airlineResearch: Record<
  string,
  { name: string; held: boolean; sources: ResearchSource[] }
> = {
  AA: {
    name: "American Airlines",
    held: false,
    sources: [
      {
        title: "Travelling with pets",
        authority: "American Airlines",
        url: "https://www.aa.com/web/i18n/travel-info/special-assistance/pets.html",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  DL: {
    name: "Delta Air Lines",
    held: false,
    sources: [
      {
        title: "Pet travel overview",
        authority: "Delta Air Lines",
        url: "https://www.delta.com/us/en/pet-travel/overview",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  AS: {
    name: "Alaska Airlines",
    held: false,
    sources: [
      {
        title: "Travelling with pets",
        authority: "Alaska Airlines",
        url: "https://www.alaskaair.com/content/travel-info/policies/pets-traveling-with-pets.aspx",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  B6: {
    name: "JetBlue",
    held: false,
    sources: [
      {
        title: "Travelling with pets",
        authority: "JetBlue",
        url: "https://www.jetblue.com/help/traveling-with-pets",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  AC: {
    name: "Air Canada",
    held: false,
    sources: [
      {
        title: "Travelling with your pet",
        authority: "Air Canada",
        url: "https://www.aircanada.com/ca/en/aco/home/plan/special-assistance/pets.html",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  LA: {
    name: "LATAM Airlines",
    held: false,
    sources: [
      {
        title: "Travelling with pets",
        authority: "LATAM Airlines",
        url: "https://www.latamairlines.com/py/es/centro-ayuda/preguntas/mascotas/transporte/viaje-avion",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  AV: {
    name: "Avianca",
    held: false,
    sources: [
      {
        title: "Can I fly with my pet?",
        authority: "Avianca",
        url: "https://ayuda.avianca.com/hc/en-us/articles/13091527349787-Can-I-fly-with-my-pet",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  BA: {
    name: "British Airways",
    held: false,
    sources: [
      {
        title: "Travelling with pets",
        authority: "British Airways",
        url: "https://www.britishairways.com/content/information/travel-assistance/travelling-with-pets",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  LH: {
    name: "Lufthansa",
    held: false,
    sources: [
      {
        title: "Travelling with animals",
        authority: "Lufthansa",
        url: "https://www.lufthansa.com/be/en/prepare-for-your-trip/baggage/travelling-with-animals.solo_continue",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  AF: {
    name: "Air France",
    held: false,
    sources: [
      {
        title: "Travelling with your pet",
        authority: "Air France",
        url: "https://armenia.airfrance.com/information/passagers/voyager-avec-son-animal-chien-chat",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  KL: {
    name: "KLM",
    held: false,
    sources: [
      {
        title: "Reservation for pets",
        authority: "KLM",
        url: "https://www.klm.com/information/pets/reservation?showredirectnotice=us",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  AY: {
    name: "Finnair",
    held: false,
    sources: [
      {
        title: "Pets on Finnair flights",
        authority: "Finnair",
        url: "https://www.finnair.com/en/pets-on-finnair-flights",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  TP: {
    name: "TAP Air Portugal",
    held: false,
    sources: [
      {
        title: "Travelling with animals",
        authority: "TAP Air Portugal",
        url: "https://www.flytap.com/en-us/information/traveling-with-animals/pets",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  IB: {
    name: "Iberia",
    held: false,
    sources: [
      {
        title: "Travelling with pets",
        authority: "Iberia",
        url: "https://www.iberia.com/us/fly-with-iberia/pets/",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  TK: {
    name: "Turkish Airlines",
    held: false,
    sources: [
      {
        title: "Travelling with pets",
        authority: "Turkish Airlines",
        url: "https://www.turkishairlines.com/en-int/any-questions/traveling-with-pets/",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  EK: {
    name: "Emirates",
    held: false,
    sources: [
      {
        title: "Unusual baggage and animals",
        authority: "Emirates",
        url: "https://www.emirates.com/us/english/before-you-fly/baggage/unusual-baggage-and-special-allowances/",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  QR: {
    name: "Qatar Airways",
    held: false,
    sources: [
      {
        title: "Transporting animals",
        authority: "Qatar Airways",
        url: "https://www.qatarairways.com/en-sd/baggage/animals.html",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  EY: {
    name: "Etihad Airways",
    held: false,
    sources: [
      {
        title: "Travelling with pets",
        authority: "Etihad Airways",
        url: "https://www.etihad.com/en/plan/travel-companion/travelling-with-pets",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  SQ: {
    name: "Singapore Airlines",
    held: false,
    sources: [
      {
        title: "Travelling with pets",
        authority: "Singapore Airlines",
        url: "https://www.singaporeair.com/en_UK/us/travel-info/special-assistance/travelling-with-pets/",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  CX: {
    name: "Cathay Pacific",
    held: true,
    sources: [
      {
        title: "Travelling with animals - cargo overview",
        authority: "Cathay Pacific",
        url: "https://www.cathaypacific.com/cx/en_GB/prepare-trip/help-for-passengers/travelling-with-animals/overview-cargo.html",
        status: "official_source_partial",
        note: "Cargo-only mode is verified; current direct-booking/accreditation details require a final manual page capture before publication.",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  JL: {
    name: "Japan Airlines",
    held: false,
    sources: [
      {
        title: "International pet service",
        authority: "Japan Airlines",
        url: "https://www.jal.co.jp/jp/en/inter/support/pet/",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  KE: {
    name: "Korean Air",
    held: false,
    sources: [
      {
        title: "Travel with pets",
        authority: "Korean Air",
        url: "https://www.koreanair.com/contents/plan-your-travel/special-assistance/travel-with-pets",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  BR: {
    name: "EVA Air",
    held: false,
    sources: [
      {
        title: "Travelling with pets",
        authority: "EVA Air",
        url: "https://www.evaair.com/en-us/fly-prepare/baggage/travelling-with-pets/",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  QF: {
    name: "Qantas",
    held: false,
    sources: [
      {
        title: "Pet travel FAQs",
        authority: "Qantas Freight",
        url: "https://freight.qantas.com/en-au/pets/pet-travel-faqs",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
  NZ: {
    name: "Air New Zealand",
    held: false,
    sources: [
      {
        title: "Travelling with pets",
        authority: "Air New Zealand",
        url: "https://www.airnewzealand.com/travelling-with-pets",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
      {
        title: "National cargo pet services",
        authority: "Air New Zealand Cargo",
        url: "https://www.airnewzealandcargo.com/national-cargo-pet-services",
        status: "verified_official",
        note: "",
        verifiedOn: "2026-09-11",
      },
    ],
  },
};
