"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";

export function BetaRequestForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !consent) {
      setMessage("Enter your email and confirm consent before preparing the request.");
      return;
    }
    const subject = encodeURIComponent("Zurtex private beta request");
    const body = encodeURIComponent(
      `Please add ${email} to the Zurtex private-beta list.\n\nI understand this is an early-access request, not a purchase, review or service order.`,
    );
    setMessage("Your email app should open. Send the draft to complete your request.");
    window.location.href = `mailto:help@zurtex.org?subject=${subject}&body=${body}`;
  }

  return (
    <form className={`beta-request ${compact ? "is-compact" : ""}`} onSubmit={submit}>
      <h2>Request private-beta access</h2>
      <p>
        Want to hear when it’s ready? This opens a draft in your email app. Send it to ask us about
        early access.
      </p>
      <label htmlFor={compact ? "compact-beta-email" : "beta-page-email"}>Email address</label>
      <input
        id={compact ? "compact-beta-email" : "beta-page-email"}
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        required
      />
      <label className="consent-check">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
        />
        <span>
          I agree Zurtex may reply about private-beta access. This does not create a purchase,
          review or service order.
        </span>
      </label>
      <button type="submit">
        Prepare my beta request <ArrowRight size={18} />
      </button>
      {message ? (
        <p className="beta-message" role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
