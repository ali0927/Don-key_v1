import {
  IStakingContractContext,
  StakingContractContext,
} from "contexts/StakingContractContext";
import { memo, useEffect, useMemo, useState } from "react";
import { useWeb3 } from "don-components";
import DonStaking from "JsonData/DonStaking.json";
import { getBSCDon, toEther } from "helpers";
import BigNumber from "bignumber.js";
import { api } from "don-utils";

const DonStakingAddress = "0x05Aa8673d8Bb5D3CB7D5ad6ba2bC8A536a7C99B7";
export type ITier = { apy: number; donRequired: string; tier: number };
const tiersList = [0, 1, 2, 3, 4, 5];
const tierInfo: {
  isReady: boolean;
  data: { [x: string]: ITier };
} = { isReady: false, data: {} };
export const getTierInfo = async (amount: string, stakingContract: any) => {
  if (!tierInfo.isReady) {
    for (const tierNum of tiersList) {
      const detail = await stakingContract.methods
        .getTierDetail(tierNum)
        .call();
      tierInfo.data[tierNum] = {
        tier: tierNum,
        apy: parseInt(detail.rewardPer) / 100,
        donRequired: toEther(detail.cap),
      };
    }
    tierInfo.isReady = true;
  }
  for (const tierNum of tiersList) {
    const tier = tierInfo.data[tierNum];
    const amountBN = new BigNumber(amount);
    if (tierNum === 5) {
      if (amountBN.gte(tier.donRequired)) {
        return tier;
      }
    }
    const nextTier = tierInfo.data[tierNum + 1];
    if (amountBN.gte(tier.donRequired) && amountBN.lt(nextTier.donRequired)) {
      return tier;
    }
  }
  return null;
};
export const StakingContractProvider: React.FC = memo(({ children }) => {
  const web3 = useWeb3();

  const stakingContract = useMemo(() => {
    return new web3.eth.Contract(DonStaking.abi as any, DonStakingAddress);
  }, []);

  const [holdedDons, setHoldedDons] = useState<BigNumber | null>(null);
  const [isStaked, setIsStaked] = useState<boolean | null>(null);
  const [stakedDon, setStakedDon] = useState<string>("0");
  const [currentTier, setCurrentTier] = useState<ITier>({
    donRequired: "0",
    apy: 0,
    tier: 0,
  });
  const [pendingReward, setPendingReward] = useState("0");
  const [investedAmount, setInvestedAmount] = useState("0");
  const fetchState = async () => {
    const accounts = await web3.eth.getAccounts();
    const userInfo = await stakingContract.methods.userInfo(accounts[0]).call();
    let totalDons = new BigNumber(0);
    try {
      const resp = await api.post("/api/v2/walletdetails", {
        walletAddress: accounts[0],
      });
      const bep = resp.data.bep;
      const erc = resp.data.erc;

      totalDons = totalDons.plus(bep).plus(erc);
    } catch (e) {
      console.error(e);
    }

    let pendingRewards = "0";
    try {
      pendingRewards = await stakingContract.methods
        .pendingReward(accounts[0])
        .call();
    } catch (e) {
      console.log("Error");
    } finally {
      pendingRewards = "0";
    }

    const donAmount = toEther(userInfo.tokenAmount);
    const tierInfo = await getTierInfo(donAmount, stakingContract);
    totalDons = totalDons.plus(donAmount);
    setHoldedDons(totalDons);
    setIsStaked(userInfo.isStaked);
    setStakedDon(donAmount);
    setInvestedAmount(toEther(userInfo.totalInvestedAmount));
    if (tierInfo) {
      setCurrentTier(tierInfo);
    }
    setPendingReward(toEther(pendingRewards));
  };

  useEffect(() => {
    fetchState();
  }, []);
  const checkAndApproveDon = async (amount: string) => {
    const accounts = await web3.eth.getAccounts();
    const donContract = await getBSCDon(web3);
    const allowance = await donContract.methods
      .allowance(accounts[0], DonStakingAddress)
      .call();

    if (new BigNumber(allowance).lt(amount)) {
      await donContract.methods
        .approve(DonStakingAddress, amount)
        .send({ from: accounts[0] });
    }
  };
  const stake = async (amount: string) => {
    const accounts = await web3.eth.getAccounts();
    await checkAndApproveDon(amount);
    await stakingContract.methods.stake(amount).send({ from: accounts[0] });
    await fetchState();
  };
  const unstake = async (isForced: boolean = false) => {
    const accounts = await web3.eth.getAccounts();
    await stakingContract.methods
      .unstake(!isForced)
      .send({ from: accounts[0] });
    await fetchState();
  };

  const harvest = async () => {
    const accounts = await web3.eth.getAccounts();
    await stakingContract.methods.claimReward().send({ from: accounts[0] });
  };

  const stakingObj: IStakingContractContext = useMemo(() => {
    return {
      isStaked: isStaked,
      stakedDon,
      stakingContract,
      tier: currentTier,
      holdingDons: holdedDons,
      refetch: fetchState,
      investedAmount,
      getTierInfo: (amount: string) => getTierInfo(amount, stakingContract),
      stakingAddress: DonStakingAddress,
      stake,
      unstake,
      harvest,
      pendingReward,
    };
  }, [isStaked, stakedDon, pendingReward, currentTier,holdedDons, investedAmount]);

  return (
    <StakingContractContext.Provider value={stakingObj}>
      {children}
    </StakingContractContext.Provider>
  );
});
