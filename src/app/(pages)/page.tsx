"use client";

import AllInOneSection from "@/components/landing-page/frequently-asked-questions";
import CallToAction from "@/components/landing-page/call-to-action";
import FeaturesSection from "@/components/landing-page/features";
import HeroSection from "@/components/landing-page/hero";
import TextRevealSection from "@/components/landing-page/text-reveal";
import WhyUseUsSection from "@/components/landing-page/why-use-us";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUseUsSection />
      <TextRevealSection />
      <FeaturesSection />
      <AllInOneSection />
      <CallToAction />
    </>
  );
}
