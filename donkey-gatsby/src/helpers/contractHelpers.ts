/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import BigNumber from "bignumber.js";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { isEqual } from "lodash";
import { waitFor } from "don-utils";
import { captureException } from "./captureException";
import { api, strapi } from "../strapi";
import { getWeb3 } from "don-components";
const BUSDAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

const PancakeRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const IBUSDAddress = "0x7C9e73d4C71dae564d41F78d56439bB4ba87592f";
const FairLaunchAddress = "0xA625AB01B08ce023B2a342Dbb12a16f2C8489A8F";
export const USDTDONLP = "0x91b1b853c1426c4aa78cac984c6f6dd1e80b0c4f";
export const WBNBDONLP = "0xe091ffaaab02b5b3f0cf9f4309c22a6550de4c8e";
export const DONTokenAddressBSC = "0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255";
export const DONTokenAddressEth = "0x217ddead61a42369a266f1fb754eb5d3ebadc88a";
export const StakingBSCAddress = "0xe2451a1F50Dc718eF2b37D2C29539121B18b9d24";
export const StakingEthAddress = "0x21A05270dCeCB199C8E41E8297c15e6e1328aE48";
export const WBNBAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
export const USDTAddressEth = "0xdac17f958d2ee523a2206206994597c13d831ec7";
export const DONBSCbridge = "0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255";
export const DONETHbridge = "0x533e3c0e6b48010873B947bddC4721b1bDFF9648";
const ReferralSystemAddress = process.env.GATSBY_REFERRAL_CONTRACT;
const DonkeyPriceFeedAddress = "0x6926aeb5703e9533B5Dd9AC58A9101622588aDe6";
let ibusdContract: Contract | null = null;
let FairLaunchContract: Contract | null = null;

export const getERCContract = async (web3: Web3, address: string) => {
  const BUSDJson = await import("../JsonData/BUSDToken.json");
  const busdtoken = new web3.eth.Contract(BUSDJson.default as any, address);
  return busdtoken;
};

export const getBUSDTokenContract = async (web3: Web3) => {
  const busdtoken = await getERCContract(web3, BUSDAddress);
  return busdtoken;
};

export const getBSCDon = async (web3: Web3) => {
  return await getERCContract(web3, DONTokenAddressBSC);
};

export const getETHDon = async (web3: Web3) => {
  return await getERCContract(web3, DONTokenAddressEth);
};
export const getTokenAddress = async (web3: Web3, poolAddress: string) => {
  try {
    const tokenAddress = await (
      await getPoolContract(web3, poolAddress, 2)
    ).methods
      .getToken()
      .call();
    return tokenAddress;
  } catch (e) {
    captureException(e, "getTokenAddress:" + poolAddress);
    return "0xe9e7cea3dedca5984780bafc599bd69add087d56";
  }
};
//get DON BSC bridge contract
export const getDONBSCbridgeContract = async (web3: Web3) => {
  const json = await import("../JsonData/DONBSCbridge.json");
  return new web3.eth.Contract(json.abi as any, DONBSCbridge);
};

export const getUserDons = async (web3: Web3, chainIds: number[]) => {
  const accounts = await web3.eth.getAccounts();

  const promises = chainIds.map(async (chainId) => {
    try {
      const resp = await api.post("/api/v2/walletdetails/" + chainId, {
        walletAddress: accounts[0],
      });
      return { balance: resp.data.balance };
    } catch (e: any) {
      captureException(e, "getUserDons");
      return { balance: "0", error: e.message };
    }
  });

  return (await Promise.all(promises)) as { balance: string }[];
};
//you only need to transfer DON to ETH bridge contract

export const getPoolToken = async (web3: Web3, poolAddress: string) => {
  const tokenAddress = await getTokenAddress(web3, poolAddress);
  return getERCContract(web3, tokenAddress);
};

export const getDonkeyPriceFeedContract = async (
  web3: Web3,
  feedsAddress = DonkeyPriceFeedAddress
) => {
  const json = await import("../JsonData/DonKeyPriceFeeds.json");
  return new web3.eth.Contract(json.abi as any, feedsAddress);
};

export const getReferralSystemContract = async (web3: Web3) => {
  const json = await import("../JsonData/ReferralSystem.json");
  return new web3.eth.Contract(json.abi as any, ReferralSystemAddress);
};

export const getRewardSystemContract = async (web3: Web3) => {
  const referralContract = await getReferralSystemContract(web3);
  const rewardSystemAddress = await referralContract.methods
    .getRewardSystem()
    .call();
  const json = await import("../JsonData/RewardSystem.json");
  return new web3.eth.Contract(json.abi as any, rewardSystemAddress);
};

export const getUserReferralCode = async (web3: Web3) => {
  const referralContract = await getReferralSystemContract(web3);
  const accounts = await web3.eth.getAccounts();
  const userInfo = await referralContract.methods.userInfo(accounts[0]).call();
  if (userInfo.exists) {
    return userInfo.referralCode as string;
  }
  return null;
};

export const isValidReferralCode = async (web3: Web3, code: string) => {
  const referralContract = await getReferralSystemContract(web3);
  const userInfo = await referralContract.methods.userInfoFromCode(code).call();
  return userInfo.referral.exists;
};

export const getPoolValue = async (web3: Web3, poolAddress: string) => {
  try {
    const amount = await getTotalPoolValue(web3, poolAddress);
    const token = await getPoolToken(web3, poolAddress);
    const decimals = await token.methods.decimals().call();
    const bn = new BigNumber(toEther(amount, decimals)).toFixed(2);
    return bn.toString();
  } catch (e) {
    captureException(e, "getPoolValue: " + poolAddress);
    return "0";
  }
};
export const getPoolValueInUSD = async (web3: Web3, poolAddress: string) => {
  const totalPoolValue = await getPoolValue(web3, poolAddress);
  const tokenPrice = await getTokenPrice(web3, poolAddress);

  return new BigNumber(totalPoolValue).multipliedBy(tokenPrice).toString();
};
export const getUserAddressFromCode = async (web3: Web3, code: string) => {
  const referralContract = await getReferralSystemContract(web3);
  const userInfo = await referralContract.methods.userInfoFromCode(code).call();
  return userInfo.user;
};

export const signUpAsReferral = async (web3: Web3, code: string) => {
  const referralContract = await getReferralSystemContract(web3);
  const accounts = await web3.eth.getAccounts();
  await referralContract.methods.signUp(code).send({ from: accounts[0] });
};

const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const getPriceFromChainLink = async (
  web3: Web3,
  chainLinkContractAddress: string
) => {
  const priceFeed = new web3.eth.Contract(
    aggregatorV3InterfaceABI as any,
    chainLinkContractAddress
  );
  const data = await priceFeed.methods.latestRoundData().call();

  return new BigNumber(data.answer).dividedBy(10 ** 8).toFixed();
};

const WmaticAddress = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
const cakeTokenAddress = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";
const tokenPriceGetter = [
  {
    token: WBNBAddress,
    priceFeedAddress: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
  },
  {
    token: WmaticAddress,
    priceFeedAddress: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
  },
  {
    token: cakeTokenAddress,
    priceFeedAddress: "0xB6064eD41d4f67e353768aA239cA86f4F73665a1",
  },
];

const makeAsyncMultiCalled = <T extends any[], V>(
  func: (...args: T) => Promise<V>
): ((...args: T) => Promise<V>) => {
  const callers: { res: any; rej: any }[] = [];
  let isInProgress = false;
  return async (...args: T) => {
    return new Promise(async (res, rej) => {
      callers.push({ res, rej });
      if (isInProgress) {
        return;
      }
      if (!isInProgress) {
        isInProgress = true;

        try {
          const result = await func(...args);
          callers.forEach((caller) => {
            caller.res(result);
          });
        } catch (e) {
          callers.forEach((caller) => {
            caller.rej(e);
          });
        } finally {
          isInProgress = false;
        }
      }
    });
  };
};

const memoizeAsync = <T extends any[], V>(
  func: (...args: T) => Promise<V>
): ((...args: T) => Promise<V>) => {
  const argsMap: {
    [x: string]: { calledFunc: any; args: T; result: any };
  } = {};
  let count = 0;
  const findIndex = (args: T) => {
    let index = -1;
    if (count === 0) {
      return index;
    }
    for (let i = 1; i <= count; i++) {
      if (isEqual(argsMap[i].args, args)) {
        index = i;
        break;
      }
    }
    return index;
  };
  return async (...args: T) => {
    let funcToCall = makeAsyncMultiCalled(func);
    let index = -1;

    index = findIndex(args);
    if (index === -1) {
      ++count;
      argsMap[count] = { calledFunc: funcToCall, args, result: null };
    } else {
      funcToCall = argsMap[index].calledFunc;
      if (argsMap[count].result) {
        return argsMap[count].result;
      }
    }
    const result = await funcToCall(...args);
    return result;
  };
};

export const getTokenPrice = memoizeAsync(
  async (web3: Web3, poolAddress: string) => {
    const tokenAddress = await getTokenAddress(web3, poolAddress);
    if (tokenAddress.toLowerCase() === BUSDAddress.toLowerCase()) {
      return "1";
    }

    const index = tokenPriceGetter.findIndex(
      (item) => item.token.toLowerCase() === tokenAddress.toLowerCase()
    );
    if (index > -1) {
      const price = await getPriceFromChainLink(
        web3,
        tokenPriceGetter[index].priceFeedAddress
      );
      return price;
    }
    if (index === -1) {
      const pool = await getPoolContract(web3, poolAddress, 3);
      const priceFeedsListAddress = await pool.methods.getPriceFeed().call();
      const priceFeeds = await getDonkeyPriceFeedContract(
        web3,
        priceFeedsListAddress
      );
      const usdPrice = await priceFeeds.methods
        .getPriceinUSD(tokenAddress)
        .call();
      return toEther(usdPrice);
    }
    const bnbPrice = await (await getPancakeContract(web3)).methods
      .getAmountsOut(toWei("0.1"), [tokenAddress, BUSDAddress])
      .call();

    let price = new BigNumber(toEther(bnbPrice[1])).dividedBy(0.1).toString();

    return price;
  }
);

export const getTokenSymbol = async (web3: Web3, poolAddress: string) => {
  const token = await getPoolToken(web3, poolAddress);
  await waitFor(100);
  return (await token.methods.symbol().call()) as string;
};

export const getTokenImage = async (web3: Web3, poolAddress: string) => {
  const tokenAddress = await getTokenAddress(web3, poolAddress);
  return `/assets/images/coins/${tokenAddress}.png`;
};

const getPoolJSON = async (version: number) => {
  if (version === 1 || !version) {
    return await import("../JsonData/pool2.json");
  }
  if (version === 2) {
    return await import("../JsonData/advanced-pool.json");
  }

  if (version === 3 ) {
    return await import("../JsonData/pool-manual.json");
  }
  if(version === 4){
    return await import("../JsonData/pool-v4.json");
  }
  return await import("../JsonData/pool2.json");
};

export const getPoolContract = async (
  web3: Web3,
  poolAddress: string,
  version: number
) => {
  await waitFor(100);
  const POOLJson = await getPoolJSON(version);
  return new web3.eth.Contract(POOLJson.abi as any, poolAddress);
};

export const getIBUSDContract = async (web3: Web3) => {
  if (ibusdContract) {
    return ibusdContract;
  }
  const ibusdjson = await import("../JsonData/IBUSDToken.json");
  ibusdContract = new web3.eth.Contract(ibusdjson.default as any, IBUSDAddress);
  return ibusdContract;
};

export const getFairLaunchContract = async (web3: Web3) => {
  if (FairLaunchContract) {
    return FairLaunchContract;
  }
  const fairLaunchJSON = await import("../JsonData/FairLaunch.json");
  FairLaunchContract = new web3.eth.Contract(
    fairLaunchJSON.default as any,
    FairLaunchAddress
  );
  return FairLaunchContract;
};

export const getStrategyContract = async (
  web3: Web3,
  strategyAddress: string
) => {
  const StrategyJsn = await import("../JsonData/strategy-abi.json");

  return new web3.eth.Contract(StrategyJsn.abi as any, strategyAddress);
};

export const getInvestedAmount = async (web3: Web3, poolAddress: string) => {
  const contract = await getPoolContract(web3, poolAddress, 1);
  const accounts = await web3.eth.getAccounts();
  const investment = await contract.methods
    .getInvestorClaimableAmount(accounts[0])
    .call();
  const num = new BigNumber(toEther(investment));
  return num;
};

export const getPancakeContract = async (web3: Web3) => {
  const pancake = await import("../JsonData/pancakeswap.json");
  return new web3.eth.Contract(pancake.default as any, PancakeRouterAddress);
};

export const getTotalPoolValue = async (web3: Web3, poolAddress: string) => {
  const contract = await getPoolContract(web3, poolAddress, 2);

  const amount = await contract.methods.getinvestedAmountWithReward().call();

  return amount;
};

export const getTotalReservePoolValue = async (
  web3: Web3,
  poolAddress: string
) => {
  const amount = await (await getBUSDTokenContract(web3)).methods
    .balanceOf(poolAddress)
    .call();
  return amount;
};

export const getLpTokensTotal = async (web3: Web3, poolAddress: string) => {
  const accounts = await web3.eth.getAccounts();
  const pool = await getPoolContract(web3, poolAddress, 2);
  const lptokensresponse = await pool.methods.balanceOf(accounts[0]).call();
  const total = await pool.methods.totalSupply().call();
  return { user: lptokensresponse, total };
};

export const getBUSDBalance = async (web3: Web3, address: string) => {
  const BUSDContract = await getBUSDTokenContract(web3);
  const balance = await BUSDContract.methods.balanceOf(address).call();
  return balance;
};

export const getAmount = async (
  web3: Web3,
  poolAddress: string,
  address: string,
  version = 2,
  percent = 100
) => {
  const poolContract = await getPoolContract(web3, poolAddress, version);
  try {
    let claimableAmount = "0";
    if (version < 4) {
      claimableAmount = await poolContract.methods
        .getFinalClaimableAmount(address)
        .call();
    } else {
      claimableAmount = await poolContract.methods
        .getFinalClaimableAmount(address, percent * 100)
        .call();
    }

    const token = await getPoolToken(web3, poolAddress);
    const decimals = await token.methods.decimals().call();
    return toEther(claimableAmount, decimals);
  } catch (e) {
    captureException(e, `getAmount: Pool: ${poolAddress}`);
    return "0";
  }
};

export const calculateWithdrawAmount = async (
  web3: Web3,
  poolAddress: string
) => {
  const accounts = await web3.eth.getAccounts();
  return await getAmount(web3, poolAddress, accounts[0]);
};

export const calculateUserClaimableAmount = async (
  web3: Web3,
  poolAddress: string,
  account?: string
) => {
  const accounts = account ? [account] : await web3.eth.getAccounts();
  const poolContract = await getPoolContract(web3, poolAddress, 2);

  try {
    const claimableAmount = await poolContract.methods
      .getInvestorClaimableAmount(accounts[0])
      .call();

    return toEther(claimableAmount);
  } catch (e) {
    console.log(account, poolAddress);
    captureException(e, "calculateUserClaimableAmount");
    return "0";
  }
};

const ALL_FARMERS_QUERY = `
query allFarmerQuery {
  farmers(
    where: {
      status_in: ["active"]
    }
  ) {
    name
    description
    farmerImage {
      url
    }
    guid
    twitter
    telegram
    poolAddress
    poolVersion
    network {
      name
      chainId
      symbol
    }
  }
}
`;

export const calcSumOfAllPoolValues = memoizeAsync(async () => {
  let allPoolValues = new BigNumber(0);
  const resp = await strapi.post("/graphql", { query: ALL_FARMERS_QUERY });
  const list = resp.data.data.farmers.map(async (farmer: any) => {
    const web3 = getWeb3(farmer.network.chainId);
    const poolValue = await getPoolValueInUSD(web3, farmer.poolAddress);
    allPoolValues = allPoolValues.plus(poolValue);
  });
  await Promise.all(list);
  console.log(allPoolValues.toFixed(2), "TVL");
  return allPoolValues.toFixed(2);
});

export const calculateInitialInvestment = async (
  web3: Web3,
  poolAddress: string,
  address: string
) => {
  const poolContract = await getPoolContract(web3, poolAddress, 2);
  const initialAmount = await poolContract.methods
    .getUserInvestedAmount(address)
    .call();
  const token = await getPoolToken(web3, poolAddress);
  const decimals = await token.methods.decimals().call();
  const amount = new BigNumber(toEther(initialAmount, decimals)).toString();
  return amount;
};

export const calculateInitialInvestmentInUSD = async (
  web3: Web3,
  poolAddress: string,
  address: string
) => {
  try {
    const poolContract = await getPoolContract(web3, poolAddress, 2);
    const initialAmount = await poolContract.methods
      .getUserInvestedAmountInUSD(address)
      .call();
    const token = await getPoolToken(web3, poolAddress);
    const decimals = await token.methods.decimals().call();
    const amount = new BigNumber(toEther(initialAmount, decimals)).toString();
    return amount;
  } catch (e) {
    captureException(e, "calculateUserClaimableAmount");
    const initialInvestment = await calculateInitialInvestment(
      web3,
      poolAddress,
      address
    );

    const tokenPrice = await getTokenPrice(web3, poolAddress);
    return new BigNumber(initialInvestment).multipliedBy(tokenPrice).toFixed(2);
  }
};

export const getStakingContract = async (web3: Web3, isBSC = false) => {
  const stakingJSON = await import("../JsonData/KiraStaking.json");

  const contract = new web3.eth.Contract(
    stakingJSON.abi as any,
    isBSC ? StakingBSCAddress : StakingEthAddress
  );

  return contract;
};

export const getLPTokenContract = async (web3: Web3, isBSC = false) => {
  const lpJSON = await import("../JsonData/BUSDToken.json");

  const contract = new web3.eth.Contract(
    lpJSON.default as any,
    isBSC ? WBNBDONLP : USDTDONLP
  );

  return contract;
};

export const getDonPriceWeb3 = async (web3: Web3) => {
  const priceFeedContract = await getDonkeyPriceFeedContract(web3);
  const priceofToken = await priceFeedContract.methods
    .getPriceinUSD(DONTokenAddressBSC)
    .call();
  return toEther(priceofToken);
};

export const getDonPrice = async (isBSC = false) => {
  if (isBSC) {
    const res = await axios.get(
      `https://api.pancakeswap.info/api/v2/tokens/${DONTokenAddressBSC}`
    );
    return res.data.data.price;
  }

  const res = await axios.post(
    `https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2`,
    {
      query: `query  {
    bundle(id: "1") {
      ethPrice
    }
  
    token(id: "0x217ddead61a42369a266f1fb754eb5d3ebadc88a") {
      name
      symbol
      decimals
      derivedETH
    	
      tradeVolumeUSD
      totalLiquidity
    }
  }`,
    }
  );
  const donPrice = new BigNumber(res.data.data.bundle.ethPrice).multipliedBy(
    res.data.data.token.derivedETH
  );

  return donPrice.toFixed(10);
};

export const toEther = (val: string, decimals = 18) => {
  return new BigNumber(val).dividedBy(10 ** decimals).toString();
};
export const toWei = (val: string, decimals = 18) => {
  return new BigNumber(val).multipliedBy(10 ** decimals).toFixed(0);
};

export const getWBNBPrice = async () => {
  const res = await axios.get(
    `https://api.pancakeswap.info/api/v2/tokens/${WBNBAddress}`
  );
  return res.data.data.price;
};

export const gettotalSWAPLPoolValue = async (web3: Web3, isBSC = false) => {
  const tokenContract = await getERCContract(
    web3,
    isBSC ? WBNBAddress : USDTAddressEth
  );
  const balance = await tokenContract.methods
    .balanceOf(isBSC ? WBNBDONLP : USDTDONLP)
    .call();
  const timestwo = new BigNumber(
    isBSC ? toEther(balance) : new BigNumber(balance).dividedBy(10 ** 6)
  ).multipliedBy(2);
  if (isBSC) {
    const wbnbPrice = await getWBNBPrice();
    return timestwo.multipliedBy(wbnbPrice);
  }
  return timestwo;
};

export const calculateAPY = async (web3: Web3, isBSC = false) => {
  const stakingContract = await getStakingContract(web3, isBSC);
  const lpContract = await getLPTokenContract(web3, isBSC);

  let totalStakedTokens = new BigNumber(
    toEther(await stakingContract.methods.totalSupply().call())
  );
  const donPrice = await getDonPrice(isBSC);
  const rewardRate = toEther(await stakingContract.methods.rewardRate().call());
  const totalLPSupply = toEther(await lpContract.methods.totalSupply().call());
  const totalLPAmount = await gettotalSWAPLPoolValue(web3, isBSC);
  const SECOND_PER_YEAR = 3600 * 24 * 365.25;

  const nominator = new BigNumber(donPrice)
    .multipliedBy(SECOND_PER_YEAR)
    .multipliedBy(rewardRate);

  totalStakedTokens = totalStakedTokens.gt(0)
    ? totalStakedTokens
    : new BigNumber("1");
  const denominator = new BigNumber(totalStakedTokens)
    .div(totalLPSupply)
    .multipliedBy(totalLPAmount);
  return nominator.div(denominator).multipliedBy(100);
};

export const calculateTVL = async (web3: Web3, isBSC = false) => {
  const stakingContract = await getStakingContract(web3, isBSC);
  const lpContract = await getLPTokenContract(web3, isBSC);

  let totalStakedTokens = new BigNumber(
    await stakingContract.methods.totalSupply().call()
  );
  const totalLPAmount = await gettotalSWAPLPoolValue(web3, isBSC);
  const totalLPSupply = await lpContract.methods.totalSupply().call();

  return totalStakedTokens
    .dividedBy(totalLPSupply)
    .multipliedBy(totalLPAmount)
    .toFixed(2);
};
