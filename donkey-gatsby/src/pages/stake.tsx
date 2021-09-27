import { RefreshProvider } from "components/LotteryForm";
import { StackingLPTokens } from "components/StackingLPTokens";

export default function StakingPage() {
  return (
    <RefreshProvider>
      <StackingLPTokens />
    </RefreshProvider>
  );
}
