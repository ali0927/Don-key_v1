import BigNumber from "bignumber.js";
import { ITier } from "components/StakingContractProvider";
import { createContext } from "react";

export type IStakingContractContext = {
  isStaked: boolean | null;
  stakedDon : string;
  refetch: () => Promise<void>;
  stakingContract: any;
  stakingAddress: string;
  investedAmount: string;
  holdingDons: BigNumber | null;
  tier: ITier;
  isInCoolOffPeriod: boolean;
  coolOffTime: string;
  pendingReward: string;
  claimTokens: () => Promise<any>;
  canClaimTokens: boolean;
  loading: boolean;
  coolOffDuration: string;
  coolOffAmount: string;
  getTierInfo: (amount: string) => Promise<ITier | null>
  stake: (amount: string) => Promise<any>;
  unstake: () => Promise<any>;
  harvest: () => Promise<any>
}

export const StakingContractContext = createContext<IStakingContractContext>({} as any);