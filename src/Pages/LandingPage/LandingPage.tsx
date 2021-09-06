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
import { RoadMap } from "./RoadMap/RoadMap";
import { MainSection } from "./HeaderSection";





const LandingPage = () => {


  return (
    <div>
      <NavBar />
      
      <MainSection/>
      

      {/* <LotteryPage />
      */}

      {/* Banner */}
      <BannerSection />

      

      {/* Cards */}
      <CardsSection />

      <BecomeAFarmerSection />
      {/* Trading strategy builder */}

      <StrategyBuilderSection />

      {/* DON Tokens */}
      <DonTokenSection />

      {/* <FAQSection /> */}
      {/** RoundedCompleted Section */}
      <RoadMap />
      <RoundedCompletedSection />

      {/*  Join the Don-key Community */}
      <JoinCommunity />

      {/*  footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
