"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Status = { state: string; testMode?: boolean; holdExpiresAt?: number | null };
const messages: Record<string, { title: string; body: string }> = {
  review_pending: {
    title: "Your hold is in place. Human review comes next.",
    body: "US$5 has been authorised, not collected. Your team member will check whether we can help, then confirm acceptance and agree the call time with you. No appointment is confirmed yet.",
  },
  payment_received: {
    title: "Your consultation payment has been received.",
    body: "Check your email for the team’s acceptance and call arrangements. This payment status alone does not confirm an appointment time.",
  },
  released: {
    title: "There is no active hold for this booking.",
    body: "The authorisation was cancelled or expired. Your bank controls when a released hold disappears. A new booking needs a new authorisation; we do not charge you again automatically.",
  },
  refunded: {
    title: "Your payment has been refunded.",
    body: "The refund has been recorded by Stripe. Your bank controls when it appears in your account. Contact us if you have questions about the consultation.",
  },
  partially_refunded: {
    title: "A partial refund has been recorded.",
    body: "Contact help@zurtex.org to clarify the remaining payment and consultation arrangements. This is not a full refund.",
  },
  amount_needs_checking: {
    title: "The payment amount needs checking.",
    body: "Contact help@zurtex.org before making another payment. We have not confirmed a full US$5 consultation payment.",
  },
  processing: {
    title: "We are checking the payment status.",
    body: "Your booking is not confirmed. Please check again shortly. Do not start another checkout while this payment is still being confirmed.",
  },
};

export function ConsultationStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(true);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (params.get("cancelled") === "true" && !sessionId) {
      setError(
        "You returned without completing checkout. No booking is confirmed. If you see a pending hold, contact us before trying again.",
      );
      setBusy(false);
      return;
    }
    if (!sessionId) {
      setError(
        "No booking reference was supplied. Open the return link from your checkout or contact help@zurtex.org.",
      );
      setBusy(false);
      return;
    }
    setBusy(true);
    setError("");
    fetch(`/api/checkout-status?session_id=${encodeURIComponent(sessionId)}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        const raw: unknown = await response.json();
        if (!raw || typeof raw !== "object") throw new Error("The booking status is unavailable.");
        const data = raw as Record<string, unknown>;
        if (!response.ok)
          throw new Error(
            typeof data.error === "string" ? data.error : "The booking status is unavailable.",
          );
        if (typeof data.state !== "string" || !Object.hasOwn(messages, data.state))
          throw new Error(
            "This is not a current consultation booking. Contact us about an earlier payment.",
          );
        setStatus({
          state: data.state,
          testMode: data.testMode === true,
          holdExpiresAt:
            typeof data.holdExpiresAt === "number" && Number.isFinite(data.holdExpiresAt)
              ? data.holdExpiresAt
              : null,
        });
      })
      .catch((cause) => {
        if (!controller.signal.aborted)
          setError(cause instanceof Error ? cause.message : "Please try checking again.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setBusy(false);
      });
    return () => controller.abort();
  }, [retry]);
  return (
    <section className="consultation-status" aria-live="polite" aria-busy={busy}>
      {error ? (
        <p role="alert" className="booking-error">
          {error}
        </p>
      ) : status ? (
        <>
          <h2>{messages[status.state].title}</h2>
          <p>{messages[status.state].body}</p>
          {status.testMode && (
            <p className="booking-availability">
              Test booking only. No real payment or appointment.
            </p>
          )}
          {status.holdExpiresAt && (
            <p>
              Hold expiry reported by Stripe:{" "}
              {new Date(status.holdExpiresAt * 1000).toLocaleString()}. An uncaptured hold will be
              released.
            </p>
          )}
          <p>
            Keep documents out of email. Wait for the team’s instructions before sharing any
            records.
          </p>
        </>
      ) : (
        <p>Checking your booking…</p>
      )}
      <Button
        className="secondary-button"
        variant="outline"
        disabled={busy}
        onClick={() => setRetry((value) => value + 1)}
      >
        {busy ? "Checking…" : "Check status again"}
      </Button>
      <p>
        <a className="text-link" href="/consultation">
          Back to consultations
        </a>
      </p>
    </section>
  );
}
