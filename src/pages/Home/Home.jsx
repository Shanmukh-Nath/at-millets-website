import React from "react";
import HeroSection from "../../components/home/HeroSection";
import OriginSection from "../../components/home/OriginSection";
import ValuesSection from "../../components/home/ValuesSection";
import ImpactGraphsSection from "../../components/home/ImpactGraphsSection";
import SlideshowNarrativeSection from "../../components/home/SlideShowNarrativeSection";
import TrustSection from "../../components/home/TrustSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <OriginSection />
      <ValuesSection />
      <ImpactGraphsSection />
      <SlideshowNarrativeSection />
      <TrustSection />
      {/* next sections will come here */}
    </>
  );
};

export default Home;
