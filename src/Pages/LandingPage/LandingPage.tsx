import { NavBar } from "../../components/Navbar/NavBar";
import { Footer } from "components/Footer/Footer";
import { BannerSection } from "./BannerSection";
import { CardsSection } from "./CardsSection";
import { BecomeAFarmerSection } from "./BecomeAFarmerSection";
import { StrategyBuilderSection } from "./StrategyBuilderSection";
import { DonTokenSection } from "./DonTokensSection";
import { JoinCommunity } from "./JoinCommunity";
import { RoundedCompletedSection } from "./RoundedCompletedSection";
import { LotteryPage } from "Pages/LotteryPage";





const LandingPage = () => {


  return (
    <div>
      <NavBar />

      <LotteryPage />

      {/* Banner */}
      <BannerSection />

      {/* Cards */}
      <CardsSection />

      <BecomeAFarmerSection />
      {/* Trading strategy builder */}

      <StrategyBuilderSection />

      {/* DON Tokens */}
      <DonTokenSection />

      {/** RoundedCompleted Section */}

      <RoundedCompletedSection />

      {/*  Join the Don-key Community */}
      <JoinCommunity />

      {/*  footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
