"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { NativeSelect } from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { consultationPurposes } from "@/lib/consultation";

export function ConsultationBookingForm({
  countries,
  configured,
  testMode,
}: {
  countries: { code: string; name: string }[];
  configured: boolean;
  testMode: boolean;
}) {
  const attempt = useRef<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const fields = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    attempt.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(fields),
          petCount: Number(fields.get("petCount")),
          consent: fields.get("consent") === "on",
          checkoutAttemptId: attempt.current,
        }),
      });
      const raw: unknown = await response.json();
      if (!raw || typeof raw !== "object")
        throw new Error("Checkout returned an unreadable response. Please try again.");
      const result = raw as Record<string, unknown>;
      if (!response.ok)
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "Checkout could not open. Please try again.",
        );
      if (typeof result.url !== "string")
        throw new Error("Checkout did not provide a secure address. Please try again.");
      const url = new URL(result.url);
      if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com")
        throw new Error("Checkout returned an unexpected address. Please contact Zurtex.");
      window.location.assign(url.href);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Checkout could not open. Please try again.",
      );
      setBusy(false);
    }
  }
  return (
    <section id="book" className="consultation-booking" aria-labelledby="booking-title">
      <div className="booking-intro">
        <h2 id="booking-title">Book your consultation.</h2>
        <p>
          Start with the journey basics. Your team member checks whether we can help before
          approving the consultation and collecting the US$5 payment.
        </p>
        <p>
          We agree the call time with you after review. Your preferred time is not a reserved
          appointment.
        </p>
        <p className="section-footnote">
          Please do not include medical details, microchip numbers or identity documents. There is
          no document upload here.
        </p>
      </div>
      <form
        className="consultation-form"
        onSubmit={submit}
        onChange={() => {
          attempt.current = null;
        }}
        aria-busy={busy}
      >
        <fieldset disabled={busy}>
          <legend className="sr-only">Journey and call details</legend>
          <div className="consultation-fields">
            <label>
              Travelling from
              <NativeSelect name="origin" required defaultValue="">
                <option value="" disabled>
                  Choose a country
                </option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </NativeSelect>
            </label>
            <label>
              Travelling to
              <NativeSelect name="destination" required defaultValue="">
                <option value="" disabled>
                  Choose a country
                </option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </NativeSelect>
            </label>
            <label>
              Arriving on
              <input name="arrival" type="date" required />
            </label>
            <label>
              Your pet
              <NativeSelect name="species" defaultValue="dog">
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </NativeSelect>
            </label>
            <label>
              How many pets?
              <input name="petCount" type="number" min="1" max="20" defaultValue="1" required />
            </label>
            <label>
              Reason for travel
              <NativeSelect name="purpose" defaultValue="personal">
                {Object.entries(consultationPurposes).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </NativeSelect>
            </label>
            <label>
              Airline, if known
              <input name="airline" maxLength={100} />
            </label>
            <label>
              Connections, if any
              <input name="transit" maxLength={120} />
            </label>
            <label className="field-wide">
              When could you talk? Include your time zone
              <input
                name="availability"
                maxLength={180}
                required
                placeholder="For example, weekday evenings after 6pm, Hong Kong time"
              />
            </label>
          </div>
          <label className="consent-check">
            <input name="consent" type="checkbox" required />
            <span>
              I agree to the{" "}
              <a href="/terms" target="_blank" rel="noreferrer">
                consultation terms
              </a>{" "}
              and{" "}
              <a href="/payments-refunds" target="_blank" rel="noreferrer">
                payment policy
              </a>
              . I authorise a US$5 hold, with payment collected only after human approval. This does
              not confirm a call time.
            </span>
          </label>
          <p className="section-footnote">
            One journey. No fixed call-length limit. A written recap with no fixed delivery
            deadline. Holds expire if not captured; they do not stay open indefinitely.
          </p>
          {!configured ? (
            <p className="booking-availability" role="status">
              Checkout is not connected in this preview. No card hold can be placed here yet.
            </p>
          ) : testMode ? (
            <p className="booking-availability">
              Test checkout only. No real payment will be taken.
            </p>
          ) : null}
          <Button type="submit" className="primary-button" disabled={!configured || busy}>
            {busy ? "Opening secure checkout…" : "Continue to secure checkout"}{" "}
            {!busy && <ArrowRight size={18} />}
          </Button>
          <p className="section-footnote">
            Stripe collects your contact and payment details.{" "}
            <a href="/privacy" target="_blank" rel="noreferrer">
              How we use your information
            </a>
          </p>
        </fieldset>
        {error && (
          <p role="alert" className="booking-error">
            {error}
          </p>
        )}
      </form>
    </section>
  );
}
