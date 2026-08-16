import { Hero } from "@/components/hero/Hero";
import { Punchline } from "@/components/punchline/Punchline";
import { WhyUpdog } from "@/components/why/WhyUpdog";
import { AltitudeDashboard } from "@/components/dashboard/AltitudeDashboard";
import { TokenPanel } from "@/components/token/TokenPanel";
import { FlightPlan } from "@/components/roadmap/FlightPlan";
import { Gallery } from "@/components/gallery/Gallery";
import { PfpGenerator } from "@/components/pfp/PfpGenerator";
import { ShareDog } from "@/components/share/ShareDog";
import { BoardingPass } from "@/components/boarding/BoardingPass";
import { FinalCta } from "@/components/finalCta/FinalCta";

/**
 * The UPDOG landing page — a single scroll that climbs through cloud strata:
 * ground-level hero → the punchline → why → flight status → the coin →
 * the flight plan → the pack → the sunset boarding call.
 *
 * All copy/links live in `src/config/site.ts`. Sections chain their cloud
 * banks by tint so the scroll reads as one continuous ascent.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <Punchline />
      <WhyUpdog />
      <BoardingPass />
      <AltitudeDashboard />
      <TokenPanel />
      <FlightPlan />
      <Gallery />
      <PfpGenerator />
      <ShareDog />
      <FinalCta />
    </>
  );
}
