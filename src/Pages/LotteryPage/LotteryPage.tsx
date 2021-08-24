import React from "react";
import { HeaderSection } from "./components";
import { HexagonSection } from "./components/HexagonSection/HexagonSection";
import { DescriptionSection } from "./components/DescriptionSection";

const LotteryStartTime = "May 17, 2021 15:00:00 UTC";
export const LotteryClosingTime = "Sept 8, 2021 15:00:00 UTC";
export const LotteryPage: React.FC = () => {
  return (
    <>
      <HeaderSection
        timerDate={LotteryStartTime}
        closingTime={LotteryClosingTime}
      />
      {/* <CatchLuckSection /> */}
      <div style={{ minHeight: 100, backgroundColor: "#FFEF37" }}></div>
      <HexagonSection />

      <DescriptionSection />
    </>
  );
};
