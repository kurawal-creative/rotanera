"use client";

import AllInOneSection from "@/components/landing-page/all-in-one";
import CallToAction from "@/components/landing-page/call-to-action";
import FeaturesSection from "@/components/landing-page/features";
import HeroSection from "@/components/landing-page/Hero";
import WhyUseUsSection from "@/components/landing-page/why-use-us";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <WhyUseUsSection />
      <AllInOneSection />
      <CallToAction />
    </>
  );
}
