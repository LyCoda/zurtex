export type ReviewTier = 'screen' | 'enhanced_review' | 'manual_only';

export const countries = [
  {
    code: 'US',
    name: 'United States',
    tier: 'screen',
    note: 'Federal rules vary by species, recent travel and state or territory.',
    source: 'https://www.cdc.gov/importation/dogs/faqs.html',
  },
  {
    code: 'CA',
    name: 'Canada',
    tier: 'screen',
    note: 'CFIA requirements vary by species, age, purpose and origin.',
    source:
      'https://inspection.canada.ca/en/travelling-pets-food-plants/travelling-pets',
  },
  {
    code: 'GB',
    name: 'Great Britain',
    tier: 'enhanced_review',
    note: 'Approved routes and cargo rules apply; Northern Ireland is separate.',
    source: 'https://www.gov.uk/bring-pet-to-great-britain',
  },
  {
    code: 'IE',
    name: 'Ireland',
    tier: 'enhanced_review',
    note: 'Approved entry points, compliance checks and dog tapeworm timing apply.',
    source:
      'https://www.gov.ie/en/department-of-agriculture-food-and-the-marine/publications/pet-travel/',
  },
  {
    code: 'FR',
    name: 'France',
    tier: 'screen',
    note: 'EU identification, rabies and document rules apply.',
    source:
      'https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm',
  },
  {
    code: 'DE',
    name: 'Germany',
    tier: 'screen',
    note: 'EU identification, rabies and document rules apply.',
    source:
      'https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm',
  },
  {
    code: 'NL',
    name: 'Netherlands',
    tier: 'screen',
    note: 'EU identification, rabies and document rules apply.',
    source:
      'https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm',
  },
  {
    code: 'ES',
    name: 'Spain',
    tier: 'screen',
    note: 'EU rules and designated entry controls may apply.',
    source:
      'https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm',
  },
  {
    code: 'IT',
    name: 'Italy',
    tier: 'screen',
    note: 'EU identification, rabies and document rules apply.',
    source:
      'https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm',
  },
  {
    code: 'PT',
    name: 'Portugal',
    tier: 'screen',
    note: 'EU identification, rabies and document rules apply.',
    source:
      'https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm',
  },
  {
    code: 'CH',
    name: 'Switzerland',
    tier: 'enhanced_review',
    note: 'Origin risk, entry control and animal-specific restrictions require review.',
    source: 'https://www.blv.admin.ch/en/travelling-with-dogs-cats-and-ferrets',
  },
  {
    code: 'NO',
    name: 'Norway',
    tier: 'enhanced_review',
    note: 'Origin-dependent rabies rules and dog tapeworm timing apply.',
    source:
      'https://www.mattilsynet.no/en/animals/travelling-with-dogs-cats-and-ferrets-from-third-countries-and-territories-to-norway',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    tier: 'enhanced_review',
    note: 'Import permit, health records and breed restrictions apply.',
    source: 'https://moccae.gov.ae/Handlers/DownloadPDF.ashx?id=67445',
  },
  {
    code: 'SG',
    name: 'Singapore',
    tier: 'manual_only',
    note: 'Licence, import permit, inspection and possible quarantine require manual review.',
    source:
      'https://avs.nparks.gov.sg/pets/importing-exporting-a-pet/import/dogs-and-cats/',
  },
  {
    code: 'HK',
    name: 'Hong Kong',
    tier: 'manual_only',
    note: 'An advance Special Permit and origin-group rules apply; Mainland-China cases have a revised 30-day quarantine pathway when all conditions are met.',
    source:
      'https://www.afcd.gov.hk/english/quarantine/qua_ie/qua_ie_ipab/qua_ie_ipab_idc/qua_ie_ipab_idc.html',
  },
  {
    code: 'JP',
    name: 'Japan',
    tier: 'manual_only',
    note: 'Advance notice, testing and waiting-period rules require manual review.',
    source: 'https://www.maff.go.jp/aqs/english/animal/dog/',
  },
  {
    code: 'AU',
    name: 'Australia',
    tier: 'manual_only',
    note: 'Approved-origin, permit and quarantine controls may require six months or more.',
    source: 'https://www.agriculture.gov.au/cats-dogs/step-by-step-guides',
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    tier: 'manual_only',
    note: 'A 2026 import-standard transition is underway; country category, identification timing, permit and quarantine rules are date-sensitive.',
    source:
      'https://www.mpi.govt.nz/bring-send-to-nz/pets-travelling-to-nz/bringing-cats-and-dogs-to-nz',
  },
  {
    code: 'CN',
    name: 'Mainland China',
    tier: 'manual_only',
    note: 'One pet per passenger plus official documents and customs controls apply.',
    source:
      'https://english.customs.gov.cn/statics/88707c1e-aa4e-40ca-a968-bdbdbb565e4f.html',
  },
  {
    code: 'TW',
    name: 'Taiwan',
    tier: 'manual_only',
    note: 'Advance import permit and origin-specific quarantine requirements apply.',
    source: 'https://en.mofa.gov.tw/News_Content.aspx?n=1337&s=122349',
  },
  {
    code: 'TH',
    name: 'Thailand',
    tier: 'enhanced_review',
    note: 'Prior import permission, health certification and inspection apply.',
    source:
      'https://thailand.go.th/issue-focus-detail/how-to-legally-bring-pets-into-thailand?hl=en',
  },
  {
    code: 'MY',
    name: 'Peninsular Malaysia',
    tier: 'manual_only',
    note: 'MAQIS permit and origin-specific controls apply; Sabah and Sarawak are separate.',
    source: 'https://www.dvs.gov.my/index.php/pages/view/1941',
  },
  {
    code: 'PH',
    name: 'Philippines',
    tier: 'enhanced_review',
    note: 'SPS import clearance, microchip and tightly timed health documents apply.',
    source: 'https://www.bai.gov.ph/Stakeholders/PetImport',
  },
] as const satisfies readonly {
  code: string;
  name: string;
  tier: ReviewTier;
  note: string;
  source: string;
}[];

export const airlines = [
  {
    code: 'AA',
    name: 'American Airlines',
    modes:
      'Potential cabin or PetEmbark cargo; checked hold is highly limited.',
    source:
      'https://www.aa.com/web/i18n/travel-info/special-assistance/pets.html',
  },
  {
    code: 'DL',
    name: 'Delta Air Lines',
    modes:
      'Potential cabin or separately booked Delta Cargo option; destination, partner-airline and checked-baggage restrictions apply.',
    source: 'https://www.delta.com/us/en/pet-travel/overview',
  },
  {
    code: 'AS',
    name: 'Alaska Airlines',
    modes: 'Potential cabin, checked-hold or Pet Connect option.',
    source:
      'https://www.alaskaair.com/content/travel-info/policies/pets-traveling-with-pets.aspx',
  },
  {
    code: 'B6',
    name: 'JetBlue',
    modes: 'Small dogs or cats in cabin only; no hold or cargo option.',
    source: 'https://www.jetblue.com/help/traveling-with-pets',
  },
  {
    code: 'AC',
    name: 'Air Canada',
    modes: 'Potential cabin, checked-hold or AC Animals cargo option.',
    source:
      'https://www.aircanada.com/ca/en/aco/home/plan/special-assistance/pets.html',
  },
  {
    code: 'LA',
    name: 'LATAM Airlines',
    modes:
      'Potential cabin or checked-hold option on all-LATAM-operated itineraries.',
    source:
      'https://www.latamairlines.com/py/es/centro-ayuda/preguntas/mascotas/transporte/viaje-avion',
  },
  {
    code: 'AV',
    name: 'Avianca',
    modes:
      'Potential cabin or checked-hold option; seasonal route embargoes apply.',
    source:
      'https://ayuda.avianca.com/hc/en-us/articles/13091527349787-Can-I-fly-with-my-pet',
  },
  {
    code: 'BA',
    name: 'British Airways',
    modes:
      'Specialist hold or cargo arrangements only; ordinary pets cannot travel in cabin.',
    source:
      'https://www.britishairways.com/content/information/travel-assistance/travelling-with-pets',
  },
  {
    code: 'LH',
    name: 'Lufthansa',
    modes: 'Potential cabin, checked-hold or Lufthansa Cargo option.',
    source:
      'https://www.lufthansa.com/be/en/prepare-for-your-trip/baggage/travelling-with-animals.solo_continue',
  },
  {
    code: 'AF',
    name: 'Air France',
    modes: 'Potential cabin, checked-hold or cargo option.',
    source:
      'https://armenia.airfrance.com/information/passagers/voyager-avec-son-animal-chien-chat',
  },
  {
    code: 'KL',
    name: 'KLM',
    modes:
      'Potential cabin, checked-hold or cargo option; transfers materially affect eligibility.',
    source:
      'https://www.klm.com/information/pets/reservation?showredirectnotice=us',
  },
  {
    code: 'AY',
    name: 'Finnair',
    modes:
      'Potential cabin, checked-hold or cargo option; some destinations are cargo-only.',
    source: 'https://www.finnair.com/en/pets-on-finnair-flights',
  },
  {
    code: 'TP',
    name: 'TAP Air Portugal',
    modes:
      'Potential cabin or checked-hold option; UK and partner restrictions apply.',
    source:
      'https://www.flytap.com/en-us/information/traveling-with-animals/pets',
  },
  {
    code: 'IB',
    name: 'Iberia',
    modes:
      'Potential cabin, checked-hold or cargo option; route and breed exclusions are significant.',
    source: 'https://www.iberia.com/us/fly-with-iberia/pets/',
  },
  {
    code: 'TK',
    name: 'Turkish Airlines',
    modes: 'Potential cabin or aircraft-hold option for eligible pets.',
    source:
      'https://www.turkishairlines.com/en-int/any-questions/traveling-with-pets/',
  },
  {
    code: 'EK',
    name: 'Emirates',
    modes: 'Aircraft hold or cargo only; ordinary pets cannot travel in cabin.',
    source:
      'https://www.emirates.com/us/english/before-you-fly/baggage/unusual-baggage-and-special-allowances/',
  },
  {
    code: 'QR',
    name: 'Qatar Airways',
    modes: 'Aircraft hold or cargo for ordinary dogs and cats.',
    source: 'https://www.qatarairways.com/en-sd/baggage/animals.html',
  },
  {
    code: 'EY',
    name: 'Etihad Airways',
    modes:
      'Potential cabin option on selected routes; larger pets require cargo.',
    source:
      'https://www.etihad.com/en/plan/travel-companion/travelling-with-pets',
  },
  {
    code: 'SQ',
    name: 'Singapore Airlines',
    modes:
      'Checked baggage on eligible routes or cargo; no ordinary-pet cabin option.',
    source:
      'https://www.singaporeair.com/en_UK/us/travel-info/special-assistance/travelling-with-pets/',
  },
  {
    code: 'CX',
    name: 'Cathay Pacific',
    modes:
      'Cathay Cargo only; direct pet-shipment bookings are limited to qualifying accredited transport parties.',
    source:
      'https://www.cathaypacific.com/cx/en_GB/prepare-trip/help-for-passengers/travelling-with-animals/overview-cargo.html',
  },
  {
    code: 'JL',
    name: 'Japan Airlines',
    modes:
      'International pets travel as cargo; ordinary-pet cabin carriage is unavailable.',
    source: 'https://www.jal.co.jp/jp/en/inter/support/pet/',
  },
  {
    code: 'KE',
    name: 'Korean Air',
    modes:
      'Potential cabin or checked-hold option; aircraft, season and breed rules apply.',
    source:
      'https://www.koreanair.com/contents/plan-your-travel/special-assistance/travel-with-pets',
  },
  {
    code: 'BR',
    name: 'EVA Air',
    modes:
      'Checked hold only for ordinary accompanied pets on eligible routes.',
    source:
      'https://www.evaair.com/en-us/fly-prepare/baggage/travelling-with-pets/',
  },
  {
    code: 'QF',
    name: 'Qantas',
    modes: 'Qantas Freight only; ordinary pets cannot travel in cabin.',
    source: 'https://freight.qantas.com/en-au/pets/pet-travel-faqs',
  },
  {
    code: 'NZ',
    name: 'Air New Zealand',
    modes:
      'International pets require cargo coordination; domestic checked hold may be available.',
    source: 'https://www.airnewzealand.com/travelling-with-pets',
  },
] as const;

export function countryByCode(code: string) {
  return countries.find((country) => country.code === code);
}

export function airlineByCode(code: string) {
  return airlines.find((airline) => airline.code === code);
}

// These entries in the existing research need specialist/cargo coordination.
// They remain visible in the selectors, but must be checked by a person before payment.
export function needsManualScopeCheck(
  origin: string,
  destination: string,
  airline: string,
) {
  return (
    countryByCode(origin)?.tier === 'manual_only' ||
    countryByCode(destination)?.tier === 'manual_only' ||
    ['BA', 'CX', 'JL', 'QF', 'NZ'].includes(airline)
  );
}
