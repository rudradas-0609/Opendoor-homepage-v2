import { CashNowMoreLater } from "@/components/CashNowMoreLater";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { PromiseSection } from "@/components/PromiseSection";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Testimonials />
      <HowItWorks />
      <CashNowMoreLater />
      <PromiseSection />
    </main>
  );
}
