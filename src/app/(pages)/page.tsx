"use client";

import AllInOneSection from "@/components/landing-page/all-in-one";
import FeaturesSection from "@/components/landing-page/features";
import HeroSection from "@/components/landing-page/hero";
import WhyUseUsSection from "@/components/landing-page/why-use-us";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <WhyUseUsSection />
      <AllInOneSection />
    </>
  );
}
