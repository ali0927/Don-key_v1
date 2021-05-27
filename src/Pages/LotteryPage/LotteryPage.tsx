import React from "react";
import { HeaderSection } from "./components";
import { CatchLuckSection } from "./components/CatchLuckSection";
import { HexagonSection } from "./components/HexagonSection/HexagonSection";
import { DescriptionSection } from "./components/DescriptionSection";

const LotteryStartTime = "May 17, 2021 15:00:00 UTC";
export const LotteryClosingTime = "May 27, 2021 18:00:00 UTC";
export const LotteryPage: React.FC = () => {
  return (
    <>
      <HeaderSection
        timerDate={LotteryStartTime}
        closingTime={LotteryClosingTime}
      />
      <CatchLuckSection />
      <HexagonSection />

      <DescriptionSection />
    </>
  );
};
