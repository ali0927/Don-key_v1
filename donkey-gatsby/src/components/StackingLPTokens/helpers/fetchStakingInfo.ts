import BigNumber from "bignumber.js";
import { BINANCE_CHAIN_ID } from "don-components";
import {
  calculateAPY,
  calculateTVL,
  getDonPrice,
  getLPTokenContract,
  getNewStakingContract,
  getStakeContract,
  getStakingContract,
  toEther,
} from "helpers";
import { StakeType } from "interfaces";
import Web3 from "web3";
import { InitialState } from "../InitialState";
import { IStaking } from "../interfaces";

export const fetchStakingInfo = async ({
  connected,
  address,
  web3,
 type
}: {
  web3: Web3;
  type: StakeType
  address?: string;
  connected: boolean;
}): Promise<IStaking> => {
  const defaultval: IStaking = {
    ...InitialState,
  };
  try {
    const apy = await calculateAPY(web3, type);
    defaultval.apy = apy.toFixed(0);
    const tvl = await calculateTVL(web3, type);
    defaultval.tvl = tvl;

    if (connected) {
      const stakingContract = await getStakeContract(
        web3,
        type
      );
      const staked = await stakingContract.methods.balanceOf(address).call();
      defaultval.stakedLp = toEther(staked);
      defaultval.isStaked = new BigNumber(staked).gt(0);
      const rewards = await stakingContract.methods.earned(address).call();
      defaultval.rewards = toEther(rewards);
      const lpTokenContract = await getLPTokenContract(
        web3,
        type !== "ethereum"
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


export const fetchNewStakingInfo = async ({
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
  const stakingContract = await getNewStakingContract(
    web3
  );
  try {
    const apy = await calculateAPY(web3, "binancenew");
    defaultval.apy = apy.toFixed(0);
    const lpTokenAmount  = await stakingContract.methods.getStakedTokenAmount();
    const wbnbPrice = await getDonPrice();
    const tvl = new BigNumber(toEther(lpTokenAmount)).multipliedBy(wbnbPrice).multipliedBy(2);
    defaultval.tvl = tvl.toString();

    if (connected) {
    
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

}