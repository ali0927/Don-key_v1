import {
  IStakingContractContext,
  StakingContractContext,
} from "contexts/StakingContractContext";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useWeb3 } from "don-components";
import DonStaking from "JsonData/DonStaking.json";
import { getBSCDon, toEther } from "helpers";
import BigNumber from "bignumber.js";
import { api } from "don-utils";
import { useWeb3Network } from "components/Web3NetworkDetector";
import { NetworksMap } from "components/NetworkProvider/NetworkProvider";
import moment from "moment";

const DonStakingAddress = "0xC0f98D72B1b6E00232E3fb0030565677FE295259";
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
  const { chainId } = useWeb3Network();
  const stakingContract = useMemo(() => {
    return new web3.eth.Contract(DonStaking.abi as any, DonStakingAddress);
  }, []);
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
      pendingRewards = "0";
    }
    try {
      const minDuration = await stakingContract.methods.getMinDuration().call()
      const duration = moment.duration(minDuration);
      setCoolOffDuration(duration.humanize());
    } catch(e){
      setCoolOffDuration("2 weeks");
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
    setCoolOffTime(userInfo.coolOffPeriod);
    console.log(userInfo)
    setIsInCoolOffPeriod(new BigNumber(userInfo.coolOffPeriod).gt(0));
    setCoolOffAmount(toEther(userInfo.coolOffAmount));
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
    if (chainId === NetworksMap.BSC) {
      fetchState();
    }
  }, [chainId]);
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
    await stakingContract.methods
      .unstake()
      .send({ from: accounts[0] });
    await fetchState();
  };

  const harvest = async () => {
    const accounts = await web3.eth.getAccounts();
    await stakingContract.methods.claimReward().send({ from: accounts[0] });
    await fetchState();
  };

  const claimTokens = async () => {
    const accounts = await web3.eth.getAccounts();
    await stakingContract.methods.claimStaked().send({ from: accounts[0] });
    await fetchState();
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
      investedAmount,
      getTierInfo: (amount: string) => getTierInfo(amount, stakingContract),
      stakingAddress: DonStakingAddress,
      stake,
      unstake,
      harvest,
      pendingReward,
    };
  }, [
    isStaked,
    stakedDon,
    pendingReward,
    coolOffTime,
    canClaimTokens,
    isInCoolOffPeriod,
    coolOffAmount,
    currentTier,
    holdedDons,
    investedAmount,
  ]);

  return (
    <StakingContractContext.Provider value={stakingObj}>
      {children}
    </StakingContractContext.Provider>
  );
});
