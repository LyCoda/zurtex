import type { Metadata } from "next";
import { RouteWorkbench } from "@/components/route-guide/route-workbench";
import { MarketingFooter, MarketingHeader } from "@/components/marketing-shell";
import { routeGuideOptions } from "@/lib/route-intelligence";

export const metadata: Metadata = {
  title: "Free International Pet Route Guide | Zurtex",
  description:
    "Check the main government and airline questions for an international dog or cat journey before you pay or share documents.",
};

export default function HomePage() {
  return (
    <>
      <MarketingHeader />
      <main id="main-content">
        <RouteWorkbench
          countries={routeGuideOptions.countries.map(({ code, name }) => ({ code, name }))}
          airlines={routeGuideOptions.airlines.map(({ code, name }) => ({ code, name }))}
        />
      </main>
      <MarketingFooter />
    </>
  );
}
