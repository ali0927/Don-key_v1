import { RefreshProvider } from "components/LotteryForm";
import StakePage from "components/StakePage/StakePage";
import { StakingContractProvider } from "components/StakingContractProvider";
import { ReferralStateProvider } from "contexts/ReferralContext";

export default function StakingPage() {
  return (
    <RefreshProvider>
      {/* <StackingLPTokens /> */}

      <StakingContractProvider>
        <ReferralStateProvider>
          <StakePage />
        </ReferralStateProvider>
      </StakingContractProvider>
    </RefreshProvider>
  );
}
