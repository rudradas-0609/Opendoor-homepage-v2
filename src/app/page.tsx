import { AgentsSection } from "@/components/AgentsSection";
import { BuyHomes } from "@/components/BuyHomes";
import { CashNowMoreLater } from "@/components/CashNowMoreLater";
import { FAQ } from "@/components/FAQ";
import { FinalCTASwitcher } from "@/components/FinalCTASwitcher";
import { HeroSwitcher } from "@/components/HeroSwitcher";
import { HowItWorks } from "@/components/HowItWorks";
import { MomentsSection } from "@/components/MomentsSection";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <main>
        <HeroSwitcher />
        <Testimonials />
        <HowItWorks />
        <CashNowMoreLater />
        <MomentsSection>
          <BuyHomes />
          <AgentsSection />
          <FAQ />
          <FinalCTASwitcher />
        </MomentsSection>
      </main>
    </>
  );
}
