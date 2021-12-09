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
import { VideoSection } from "LandingPage/VideoSection";
export default function Home() {
  return (
    <div>
      <NavBar hideDappButton />

      <MainSection />

      <VideoSection />

      <TiersSection
        partOne="Our Tier System unlocks utility on Don-key’s copy-farming platform. Each level unlocks an additional level of benefits and profitability, rewarding holders of $DON as much as possible."
        partTwo="At the moment our tiers provide extra APY in the form of $DON tokens, while base profits are given in the farmed coin. In the future the tiers will unlock more utilities such as: referral rewards, generative NFT rewards, exclusive farming opportunities, autonomous strategy building, and more."
      />

      {/* Cards */}
      <CardsSection />

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
