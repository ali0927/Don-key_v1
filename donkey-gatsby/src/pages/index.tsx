import { NavBar } from "components/Navbar";
import { CardsSection } from "LandingPage/CardsSection";
import { BecomeAFarmerSection } from "LandingPage/BecomeAFarmerSection";
// import { FAQSection } from "components/FAQSection";
import { StrategyBuilderSection } from "LandingPage/StrategyBuilderSection";
import { DonTokenSection } from "LandingPage/DonTokensSection";
import { RoadMap } from "LandingPage/RoadMap/RoadMap";
import { RoundedCompletedSection } from "LandingPage/RoundedCompletedSection";
import { JoinCommunity } from "LandingPage/JoinCommunity";
import { Footer } from "components/Footer";
import { MainSection } from "LandingPage/HeaderSection";
import React from "react";
import { PartnerSection } from "LandingPage/PartnersSection";
import { TiersSection } from "LandingPage/TiersSection";
export default function Home() {
  return (
    <div>
      <NavBar  hideDappButton />

      <MainSection />

      {/* Cards */}
      <CardsSection />

      <TiersSection/>

      <BecomeAFarmerSection />
      {/* Trading strategy builder */}
      {/* <FAQSection /> */}
      <StrategyBuilderSection />

      {/* DON Tokens */}
      <DonTokenSection />

      {/* <FAQSection /> */}
      {/** RoundedCompleted Section */}
      <RoadMap />
      <RoundedCompletedSection />
      <PartnerSection />

      {/*  Join the Don-key Community */}
      <JoinCommunity />

      {/*  footer */}
      <Footer />
    </div>
  );
}
