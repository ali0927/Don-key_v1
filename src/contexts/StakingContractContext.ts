import { ITier } from "components/StakingContractProvider";
import { createContext } from "react";

export type IStakingContractContext = {
  isStaked: boolean | null;
  stakedDon : string;
  refetch: () => Promise<void>;
  stakingContract: any;
  stakingAddress: string;
  investedAmount: string;
  tier: ITier;
  pendingReward: string;
  getTierInfo: (amount: string) => Promise<ITier | null>
  stake: (amount: string) => Promise<any>;
  unstake: (isForced: boolean) => Promise<any>;
  harvest: () => Promise<any>
}

export const StakingContractContext = createContext<IStakingContractContext>({} as any);