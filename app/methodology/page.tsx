import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { MarketingPage } from "@/components/marketing-shell";

export const metadata: Metadata = {
  title: "How your route guide works | Zurtex",
  description: "Where your guide comes from, what it can tell you and what still needs checking.",
};
export default function MethodologyPage() {
  return (
    <MarketingPage
      title="A clearer guide starts with better questions."
      intro="We bring the official starting points together, explain what to ask next, and tell you where the answer still needs checking."
      variant="methodology-page"
      aside={
        <div className="policy-summary">
          <strong>What the beta can do today</strong>
          <p>
            Read the available route guidance and use the preparation tools for free. Your pet’s
            records, route eligibility and personalised deadlines still need checking.
          </p>
        </div>
      }
    >
      <section className="method-grid">
        <article>
          <h2>Where the information comes from</h2>
          <p>
            Our starting research links to government authorities and airlines. The current set was
            recorded in a research ledger dated 11 September 2026, with journey-purpose research
            added on 12 September. The source dates shown in your result identify its evidence.
          </p>
          <p>
            That date records the research, not a promise that every rule is still current or
            applies to your pet. Each result lets you open the original guidance.
          </p>
        </article>
        <article>
          <h2>What the labels mean</h2>
          <dl className="definition-list">
            <div>
              <dt>Question to confirm</dt>
              <dd>
                A useful question for the authority, your vet or your airline. It is not a confirmed
                instruction for your pet.
              </dd>
            </div>
            <div>
              <dt>More checking needed</dt>
              <dd>
                Our source coverage is incomplete. We withhold the detailed requirements and direct
                you to the authority.
              </dd>
            </div>
            <div>
              <dt>Not yet assessed</dt>
              <dd>
                We have not checked that part of the journey. An airline selection, for example,
                does not confirm a pet reservation.
              </dd>
            </div>
          </dl>
        </article>
      </section>
      <section className="method-process">
        <h2>From your route to your next step</h2>
        <ol>
          <li>
            <strong>Tell us the basics</strong>
            <span>
              Where you’re going, when you hope to arrive, who is travelling and how your pet will
              fly.
            </span>
          </li>
          <li>
            <strong>Open your checklist</strong>
            <span>
              See questions chosen for the destination and your pet, with official-source links
              beside them.
            </span>
          </li>
          <li>
            <strong>Check the flight separately</strong>
            <span>
              The country’s entry guidance is separate from the rules of the airline operating each
              flight.
            </span>
          </li>
          <li>
            <strong>Resolve what’s missing</strong>
            <span>
              Update your flight details, speak to the authority and review your pet’s records with
              your vet.
            </span>
          </li>
        </ol>
      </section>
      <section className="method-grid">
        <article>
          <h2>Why there may be no dates yet</h2>
          <p>
            An intended arrival date is only one part of the picture. Your pet’s history and the
            current rules determine the preparation sequence. Until both are checked, we do not
            confirm personalised deadlines or say the journey is feasible. Conditional planning
            windows may appear in a research preview; they are not a record check or approval.
          </p>
        </article>
        <article>
          <h2>What we’re checking next</h2>
          <p>
            Before personalised instructions can appear, each rule needs a complete source record,
            an applicability check and human approval. Export processes, transit airports and
            individual operating flights also need their own coverage.
          </p>
        </article>
      </section>
      <section className="boundary-band">
        <h2>Read freely. Talk it through if you need to.</h2>
        <p>
          The information and preparation tools stay free. A US$5 consultation adds personal
          support, not access to hidden rules. Booking begins with a temporary hold while a team
          member reviews the journey.
        </p>
        <a href="/consultation">
          Explore the consultation <ArrowRight size={17} />
        </a>
        <h2>Always check before you travel.</h2>
        <p>
          Government authorities, vets and airlines make the decisions. If something in our guide
          needs correcting, tell us at <a href="mailto:help@zurtex.org">help@zurtex.org</a>.
        </p>
        <a href="/#route-screen">
          Start your free guide <ArrowRight size={17} />
        </a>
      </section>
    </MarketingPage>
  );
}
