import { RefreshProvider } from "components/LotteryForm";
import { StackingLPTokens } from "components/StackingLPTokens";
import React from "react";

export default function StakingPage() {
  return (
    <RefreshProvider>
      <StackingLPTokens />
    </RefreshProvider>
  );
}
