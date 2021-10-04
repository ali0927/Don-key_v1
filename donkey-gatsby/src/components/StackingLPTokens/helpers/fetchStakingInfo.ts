import { BINANCE_CHAIN_ID } from "don-components";
import {
  calculateAPY,
  calculateTVL,
  getLPTokenContract,
  getStakingContract,
  toEther,
} from "helpers";
import Web3 from "web3";
import { InitialState } from "../InitialState";
import { IStaking } from "../interfaces";

export const fetchStakingInfo = async ({
  connected,
  address,
  web3,
  chainId,
}: {
  web3: Web3;
  chainId: number;
  address?: string;
  connected: boolean;
}): Promise<IStaking> => {
  const defaultval: IStaking = {
    ...InitialState,
  };
  try {
    const apy = await calculateAPY(web3, chainId === BINANCE_CHAIN_ID);
    defaultval.apy = apy.toFixed(0);
    const tvl = await calculateTVL(web3, chainId === BINANCE_CHAIN_ID);
    defaultval.tvl = tvl;

    if (connected) {
      const stakingContract = await getStakingContract(
        web3,
        chainId === BINANCE_CHAIN_ID
      );
      const staked = await stakingContract.methods.balanceOf(address).call();
      defaultval.stakedLp = toEther(staked);

      const rewards = await stakingContract.methods.earned(address).call();
      defaultval.rewards = toEther(rewards);
      const lpTokenContract = await getLPTokenContract(
        web3,
        chainId === BINANCE_CHAIN_ID
      );
      const amount = await lpTokenContract.methods.balanceOf(address).call();
      defaultval.availableLp = toEther(amount);
    }
  } catch (e) {
    console.error(e);
    return defaultval;
  }

  return defaultval;
};
