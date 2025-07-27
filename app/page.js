import HeroSection from "@/components/hero";
import InteractiveStats from "@/components/interactive-stats";
import FeatureSection from "@/components/features-section";
import PricingCard from "@/components/price-card-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden">
      {/* Hero */}
      <HeroSection />
      {/* Stats */}
      <InteractiveStats />
      {/* features */}
      <FeatureSection />
      {/* pricing */}
      <PricingCard />
    </div>
  );
}
