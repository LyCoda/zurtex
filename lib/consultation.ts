import { countries } from "./route-coverage.ts";

export const CONSULTATION_PRICE_CENTS = 500;
export const CONSULTATION_CURRENCY = "usd";
export const CONSULTATION_WORKFLOW = "consultation_manual_review_v1";
export const CONSULTATION_POLICY_VERSION = "2026-09-12";
export const CONSULTATION_HOLD_MESSAGE =
  "Authorise US$5 for one Pet Travel Consultation. Your payment method is authorised now; we collect payment only after human approval. A hold is not an accepted booking or a confirmed call time. Uncaptured holds expire.";

export const consultationPurposes = {
  personal: "Travelling with my pet",
  relocation: "Moving home with my pet",
  sale: "Sale or delivery to a new owner",
  adoption: "Adoption or rehoming",
  transfer: "Another change of owner",
  breeding: "Breeding, with the same owner",
  event: "Show, competition or sporting event",
} as const;

export type ConsultationBooking = {
  origin: string;
  destination: string;
  arrival: string;
  species: "dog" | "cat";
  petCount: number;
  purpose: keyof typeof consultationPurposes;
  airline: string;
  transit: string;
  availability: string;
  consent: true;
  checkoutAttemptId: string;
};

export function parseConsultationBooking(
  raw: unknown,
  today = new Date().toISOString().slice(0, 10),
): { value: ConsultationBooking; error?: never } | { error: string; value?: never } {
  if (!raw || typeof raw !== "object" || Array.isArray(raw))
    return { error: "Check your booking details and try again." };
  const input = raw as Record<string, unknown>;
  const text = (key: string, max: number, required = false) => {
    const value = input[key];
    if (value === undefined && !required) return "";
    if (typeof value !== "string" || value.length > max || /[\u0000-\u001f\u007f]/.test(value))
      return null;
    return required && !value.trim() ? null : value.trim();
  };
  const origin = countries.find((c) => c.code === input.origin);
  const destination = countries.find((c) => c.code === input.destination);
  if (!origin || !destination || origin.code === destination.code)
    return { error: "Choose two different countries for your journey." };
  const arrival = text("arrival", 10, true);
  const date = arrival ? new Date(`${arrival}T00:00:00Z`) : new Date(NaN);
  if (
    !arrival ||
    !/^\d{4}-\d{2}-\d{2}$/.test(arrival) ||
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== arrival ||
    arrival < today
  )
    return { error: "Choose a valid arrival date, today or later." };
  const purpose = input.purpose;
  if (typeof purpose !== "string" || !Object.hasOwn(consultationPurposes, purpose))
    return { error: "Choose the reason for your journey." };
  if (
    !["dog", "cat"].includes(String(input.species)) ||
    typeof input.petCount !== "number" ||
    !Number.isInteger(input.petCount) ||
    input.petCount < 1 ||
    input.petCount > 20
  )
    return { error: "Choose dog or cat and a pet count from 1 to 20." };
  const airline = text("airline", 100);
  const transit = text("transit", 120);
  const availability = text("availability", 180, true);
  if (airline === null || transit === null || availability === null)
    return {
      error: "Check the airline, connections and call availability. Include your time zone.",
    };
  if (input.consent !== true)
    return { error: "Please agree to the consultation terms and temporary payment hold." };
  const attempt = text("checkoutAttemptId", 36, true);
  if (
    !attempt ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(attempt)
  )
    return { error: "Please reload the page before starting checkout." };
  return {
    value: {
      origin: origin.code,
      destination: destination.code,
      arrival,
      species: input.species as "dog" | "cat",
      petCount: input.petCount,
      purpose: purpose as ConsultationBooking["purpose"],
      airline,
      transit,
      availability,
      consent: true,
      checkoutAttemptId: attempt,
    },
  };
}
