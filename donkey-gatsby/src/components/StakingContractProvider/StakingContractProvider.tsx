import {
  IStakingContractContext,
  StakingContractContext,
} from "contexts/StakingContractContext";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { BINANCE_CHAIN_ID, getWeb3, useWeb3Context } from "don-components";
import DonStaking from "JsonData/DonStaking.json";
import { captureException, getBSCDon, sendEvent, toEther } from "helpers";
import BigNumber from "bignumber.js";
import moment from "moment";
import { api } from "strapi";
import React from "react";
const DonStakingAddress = process.env.GATSBY_STAKING_CONTRACT;
export type ITier = { apy: number; donRequired: string; tier: number };
const tiersList = [0, 1, 2, 3, 4, 5];
const tierInfo: {
  isReady: boolean;
  data: { [x: string]: ITier };
} = { isReady: false, data: {} };

const fetchTiers = async (stakingContract: any) => {
  if (!tierInfo.isReady) {
    for (const tierNum of tiersList) {
      const detail = await stakingContract.methods
        .getTierDetail(tierNum)
        .call();
      tierInfo.data[tierNum] = {
        tier: tierNum,
        apy: parseInt(detail.rewardPer) / 100,
        donRequired: tierNum === 0 ? "0" : toEther(detail.cap),
      };
    }
    tierInfo.isReady = true;
  }
};

export const getTierInfo = async (amount: string, stakingContract: any) => {
  await fetchTiers(stakingContract);
  for (const tierNum of tiersList) {
    const tier = tierInfo.data[tierNum];
    const amountBN = new BigNumber(amount);
    if (tierNum === 5) {
      if (amountBN.gte(tier.donRequired)) {
        return tier;
      }
    }
    const nextTier = tierInfo.data[tierNum + 1];
    if (tierNum === 0) {
      if (amountBN.lt(nextTier.donRequired)) {
        return tier;
      }
    }

    if (amountBN.gte(tier.donRequired) && amountBN.lt(nextTier.donRequired)) {
      return tier;
    }
  }
  return null;
};

const useStaking = () => {
  const { chainId, getConnectedWeb3, connected, address } = useWeb3Context();
  const web3 = getConnectedWeb3();
  const stakingContract = useMemo(() => {
    const newWeb3 = getWeb3(BINANCE_CHAIN_ID);
    return connected
      ? new web3.eth.Contract(DonStaking.abi as any, DonStakingAddress)
      : new newWeb3.eth.Contract(DonStaking.abi as any, DonStakingAddress);
  }, [connected]);
  const [coolOffTime, setCoolOffTime] = useState("0");
  const [isInCoolOffPeriod, setIsInCoolOffPeriod] = useState(false);
  const [canClaimTokens, setCanClaimTokens] = useState(false);
  const [coolOffAmount, setCoolOffAmount] = useState("0");
  const [coolOffDuration, setCoolOffDuration] = useState("2 weeks");
  const [holdedDons, setHoldedDons] = useState<BigNumber | null>(null);
  const [isStaked, setIsStaked] = useState<boolean | null>(null);
  const [stakedDon, setStakedDon] = useState<string>("0");
  const [currentTier, setCurrentTier] = useState<ITier>({
    donRequired: "0",
    apy: 0,
    tier: 0,
  });
  const [loading, setLoading] = useState(false);
  const [pendingReward, setPendingReward] = useState("0");
  const [investedAmount, setInvestedAmount] = useState("0");
  const [lastRewardTime, setLastRewardTime] = useState(0);

  const clearState = () => {
    setIsInCoolOffPeriod(false);
    setCanClaimTokens(false);
    setCoolOffAmount("0");
    setHoldedDons(null);
    setStakedDon("0");
    setLoading(false);
    setPendingReward("0");
    setInvestedAmount("0");
    setCoolOffAmount("0");
    setLastRewardTime(0);
  };

  const fetchDonsFromApi = async () => {
    let totalDons = new BigNumber(0);

    try {
      const resp = await api.post("/api/v2/walletdetails", {
        walletAddress: address,
      });
      const newWeb3 = getWeb3(BINANCE_CHAIN_ID);
      const contract = new newWeb3.eth.Contract(
        DonStaking.abi as any,
        DonStakingAddress
      );
      const userInfo = await contract.methods.userInfo(address).call();

      const bep = resp.data.bep;
      const erc = resp.data.erc;
      const staked = resp.data.staked;
      const coolOff = resp.data.coolOff;
      totalDons = totalDons
        .plus(bep)
        .plus(erc)
        .plus(staked)
        .plus(coolOff)
        .plus(toEther(userInfo.donEquivalent));
    } catch (e) {
      captureException(e, "fetchDons From Api");
    }
    setHoldedDons(totalDons);
  };

  const fetchPendingRewards = async () => {
    let pendingRewards = { rewardAmountInDON: "0" };
    try {
      const accounts = await web3.eth.getAccounts();
      pendingRewards = await stakingContract.methods
        .pendingReward(accounts[0])
        .call();
    } catch (e) {
      captureException(e, "fetchPendingRewards");
    }
    // console.log(pendingReward, "PP")
    setPendingReward(toEther(pendingRewards.rewardAmountInDON));
  };

  const fetchState = async () => {
    setLoading(true);
    if (BINANCE_CHAIN_ID === chainId) {
      const accounts = await web3.eth.getAccounts();
      const userInfo = await stakingContract.methods
        .userInfo(accounts[0])
        .call();

      try {
        const minDuration = await stakingContract.methods
          .getMinDuration()
          .call();
        const duration = moment.duration(minDuration * 1000);
        setCoolOffDuration(duration.humanize());
      } catch (e) {
        captureException(e, "getMinDuration");
        setCoolOffDuration("2 weeks");
      }

      const donAmount = toEther(
        new BigNumber(userInfo.tokenAmount)
          .plus(userInfo.donEquivalent)
          .toFixed(0)
      );

      await fetchTiers(stakingContract);
      const crTier = tierInfo.data[userInfo.tier_type];
      const coolOffDons = toEther(userInfo.coolOffAmount);

      setIsStaked(userInfo.isStaked);
      setStakedDon(donAmount);
      setInvestedAmount(toEther(userInfo.totalInvestedAmount));
      if (crTier) {
        setCurrentTier(crTier);
      }

      await fetchPendingRewards();
      setCoolOffTime(userInfo.coolOffPeriod);
      setIsInCoolOffPeriod(new BigNumber(userInfo.coolOffPeriod).gt(0));
      setCoolOffAmount(coolOffDons);
      setLastRewardTime(userInfo.lastRewardTime);
    }
    await fetchDonsFromApi();

    setLoading(false);
  };

  const checkCanClaimTokens = useCallback(() => {
    if (coolOffTime === "0") {
      setCanClaimTokens(false);
    } else {
      const endTime = moment.unix(parseInt(coolOffTime));

      const isEnded = endTime.isBefore(moment());
      setCanClaimTokens(isEnded);
    }
  }, [coolOffTime, coolOffAmount]);

  useEffect(() => {
    const interval = setInterval(checkCanClaimTokens, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [checkCanClaimTokens]);

  useEffect(() => {
    fetchTiers(stakingContract);
    if (connected && address) {
      if (chainId === BINANCE_CHAIN_ID) {
        fetchState();
        const interval = setInterval(() => {
          fetchPendingRewards();
        }, 1000);
        return () => {
          clearState();
          clearInterval(interval);
        };
      } else {
        fetchDonsFromApi();
      }
    }
  }, [chainId, connected, address]);

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
  const unstake = async () => {
    const accounts = await web3.eth.getAccounts();
    await stakingContract.methods.unstake().send({ from: accounts[0] });

    await fetchState();
    sendEvent("Unstake", { user: accounts[0] });
  };

  const harvest = async () => {
    const accounts = await web3.eth.getAccounts();
    await stakingContract.methods.claimReward().send({ from: accounts[0] });
    await fetchState();
    sendEvent("Harvest", { user: accounts[0], rewards: pendingReward });
  };

  const claimTokens = async () => {
    const accounts = await web3.eth.getAccounts();
    await stakingContract.methods.claimStaked().send({ from: accounts[0] });
    await fetchState();
    sendEvent("Claimed", { user: accounts[0], claimed: coolOffAmount });
  };

  const stakingObj: IStakingContractContext = useMemo(() => {
    return {
      isStaked: isStaked,
      stakedDon,
      stakingContract,
      coolOffAmount,
      isInCoolOffPeriod: isInCoolOffPeriod,
      coolOffTime,
      canClaimTokens,
      coolOffDuration,
      claimTokens,
      tier: currentTier,
      holdingDons: holdedDons,
      refetch: fetchState,
      fetchHoldingDons: fetchDonsFromApi,
      investedAmount,
      loading,
      lastRewardTime,
      getTierList: () => {
        return tierInfo.data;
      },
      getTierInfo: (amount: string) => getTierInfo(amount, stakingContract),
      stakingAddress: DonStakingAddress as string,
      stake,
      unstake,
      harvest,
      pendingReward,
    };
  }, [
    isStaked,
    stakedDon,
    pendingReward,
    loading,
    coolOffTime,
    canClaimTokens,
    isInCoolOffPeriod,
    coolOffAmount,
    currentTier,
    holdedDons,
    investedAmount,
  ]);
  return stakingObj;
};

export const StakingContractProvider: React.FC = memo(({ children }) => {
  const stakingObj = useStaking();
  return (
    <StakingContractContext.Provider value={stakingObj}>
      {children}
    </StakingContractContext.Provider>
  );
});
