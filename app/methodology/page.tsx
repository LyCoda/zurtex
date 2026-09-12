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
      title="A clearer guide starts with the source."
      intro="We bring the official guidance together, check what we can read today, and show you what still needs confirming."
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
            Your guide starts with dated research from government authorities and airlines. When
            you submit a journey, Zurtex tries to open the relevant official pages and find related
            guidance. The progress screen follows those checks as they happen.
          </p>
          <p>
            An automated comparison checks the available source text against the checklist when
            the evidence service is connected. Your result shows which pages could be read, what
            the comparison found, and any gaps. Opening a page alone does not verify a rule.
          </p>
        </article>
        <article>
          <h2>What the labels mean</h2>
          <dl className="definition-list">
            <div>
              <dt>Supported by source</dt>
              <dd>
                The automated comparison found supporting text in a source read for this journey.
                This is a research check, not human review or confirmation of your pet’s eligibility.
              </dd>
            </div>
            <div>
              <dt>Needs another look</dt>
              <dd>
                A source may disagree, be unclear or be unavailable. Read the explanation and
                confirm that item with the relevant authority before relying on it.
              </dd>
            </div>
            <div>
              <dt>Not checked live</dt>
              <dd>
                The evidence service could not complete this check. The research remains a starting
                point, with its original source links available for you to inspect.
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
            <strong>Follow the source check</strong>
            <span>
              Watch the departure, arrival and evidence checks finish, then open your guide with
              timing, practical tasks and official-source links.
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
