import { createContext } from "react";

export type IStakingContractContext = {
  isStaked: boolean | null;
  stakedDon : string;
  refetch: () => Promise<void>;
  stakingContract: any;
  stakingAddress: string;
  stake: (amount: string) => Promise<any>;
  unstake: (amount: string) => Promise<any>;
}

export const StakingContractContext = createContext<IStakingContractContext>({} as any);