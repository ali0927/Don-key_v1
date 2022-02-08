import {
  IStakingContractContext,
  StakingContractContext,
} from "contexts/StakingContractContext";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  BINANCE_CHAIN_ID,
  BSC_TESTNET_CHAIN_ID,
  getWeb3,
  useWeb3Context,
} from "don-components";
import DonStaking from "JsonData/DonStaking.json";
import { captureException, getBSCDon, sendEvent, toEther } from "helpers";
import BigNumber from "bignumber.js";
import moment from "moment";
import { api } from "strapi";
import React from "react";
import { tiersInfo } from "LandingPage/TiersSection";
const DonStakingAddress = process.env.GATSBY_STAKING_CONTRACT;
export type ITier = { apy: number; donRequired: string; tier: number };
const tiersList = [0, 1, 2, 3, 4, 5];
const staketierInfo: {
  isReady: boolean;
  data: { [x: string]: ITier };
} = { isReady: false, data: {} };

const fetchTiers = async (stakingContract: any) => {
  if (!staketierInfo.isReady) {
    for (const tierNum of tiersList) {
      const detail = await stakingContract.methods
        .getTierDetail(tierNum)
        .call();
      staketierInfo.data[tierNum] = {
        tier: tierNum,
        apy: parseInt(
          tiersInfo.find((item) => item.tier === tierNum)?.apy ||
            "0%".split("%")[0]
        ),
        donRequired: tierNum === 0 ? "0" : toEther(detail.cap),
      };
    }
    staketierInfo.isReady = true;
  }
};

export const getTierInfo = async (amount: string, stakingContract: any) => {
  await fetchTiers(stakingContract);
  for (const tierNum of tiersList) {
    const tier = staketierInfo.data[tierNum];
    const amountBN = new BigNumber(amount);
    if (tierNum === 5) {
      if (amountBN.gte(tier.donRequired)) {
        return tier;
      }
    }
    const nextTier = staketierInfo.data[tierNum + 1];
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

  const viewstakingContract = useMemo(() => {
    const newWeb3 = getWeb3(
      process.env.NODE_ENV === "development"
        ? BSC_TESTNET_CHAIN_ID
        : BINANCE_CHAIN_ID
    );
    return new newWeb3.eth.Contract(DonStaking.abi as any, DonStakingAddress);
  }, []);
  const connectedStakingContract = useMemo(() => {
    if (!connected) {
      return null;
    }
    const web3 = getConnectedWeb3();
    return new web3.eth.Contract(DonStaking.abi as any, DonStakingAddress);
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
      const newWeb3 = getWeb3(
        process.env.NODE_ENV === "development"
          ? BSC_TESTNET_CHAIN_ID
          : BINANCE_CHAIN_ID
      );
      let donEquivalent = "0";
      try {
        const contract = new newWeb3.eth.Contract(
          DonStaking.abi as any,
          DonStakingAddress
        );
        const userInfo = await contract.methods.userInfo(address).call();
        donEquivalent = toEther(userInfo.donEquivalent);
      } catch (e) {
        captureException(e, "Error in Fetching Don Equivalent");
      }
      const bep = resp.data.bep;
      const erc = resp.data.erc;
      const staked = resp.data.staked;
      const coolOff = resp.data.coolOff;
      totalDons = totalDons
        .plus(bep)
        .plus(erc)
        .plus(staked)
        .plus(coolOff)
        .plus(donEquivalent);
    } catch (e) {
      captureException(e, "fetchDons From Api : " + address);
    }
    setHoldedDons(totalDons);
  };

  const fetchPendingRewards = async () => {
    let pendingRewards = { rewardAmountInDON: "0" };
    try {
      pendingRewards = await viewstakingContract.methods
        .pendingReward(address)
        .call();
    } catch (e) {
      captureException(e, "fetchPendingRewards");
    }
    // console.log(pendingReward, "PP")
    setPendingReward(toEther(pendingRewards.rewardAmountInDON));
  };

  const fetchState = async () => {
    setLoading(true);
    let userInfo;
    try {
     
      userInfo = await viewstakingContract.methods.userInfo(address).call();
      console.log(userInfo, "User", address, DonStakingAddress);
    } catch (e: any) {
      console.log("Error UserInfo");
      captureException(e, `Address: ${address} Staking: ${DonStakingAddress} `)
      throw new Error(e);
     
    }

    try {
      const minDuration = await viewstakingContract.methods
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
    await fetchTiers(viewstakingContract);
    const crTier = staketierInfo.data[userInfo.tier_type];
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
    fetchTiers(viewstakingContract);
    if (connected && address) {
      // if (chainId === BINANCE_CHAIN_ID) {
      fetchState();
      const interval = setInterval(() => {
        fetchPendingRewards();
      }, 1000);
      return () => {
        clearState();
        clearInterval(interval);
      };
      // } else {
      //   fetchDonsFromApi();
      // }
    }
  }, [chainId, connected, address]);

  const checkAndApproveDon = async (amount: string) => {
    const donContract = await getBSCDon(getConnectedWeb3());
    const allowance = await donContract.methods
      .allowance(address, DonStakingAddress)
      .call();

    if (new BigNumber(allowance).lt(amount)) {
      await donContract.methods
        .approve(DonStakingAddress, amount)
        .send({ from: address });
    }
  };
  const stake = async (amount: string) => {
    await checkAndApproveDon(amount);
    await connectedStakingContract?.methods
      .stake(amount)
      .send({ from: address });
    await fetchState();
  };
  const unstake = async () => {
    await connectedStakingContract?.methods.unstake().send({ from: address });

    await fetchState();
    sendEvent("Unstake", { user: address });
  };

  const harvest = async () => {
    await connectedStakingContract?.methods
      .claimReward()
      .send({ from: address });
    await fetchState();
    sendEvent("Harvest", { user: address, rewards: pendingReward });
  };

  const claimTokens = async () => {
    await connectedStakingContract?.methods
      .claimStaked()
      .send({ from: address });
    await fetchState();
    sendEvent("Claimed", { user: address, claimed: coolOffAmount });
  };

  const stakingObj: IStakingContractContext = useMemo(() => {
    return {
      isStaked: isStaked,
      stakedDon,
      stakingContract: connectedStakingContract || viewstakingContract,
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
        return staketierInfo.data;
      },
      getTierInfo: (amount: string) => getTierInfo(amount, viewstakingContract),
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
    address,
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
