/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import BigNumber from "bignumber.js";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { isEqual } from "lodash";
import { captureException } from "./captureException";
import { api, strapi } from "../strapi";
import { BINANCE_CHAIN_ID,BSC_TESTNET_CHAIN_ID, getWeb3 } from "don-components";
import { waitFor } from "don-utils";
import { StakeType } from "interfaces";
const BUSDAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

const PancakeRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const IBUSDAddress = "0x7C9e73d4C71dae564d41F78d56439bB4ba87592f";
const FairLaunchAddress = "0xA625AB01B08ce023B2a342Dbb12a16f2C8489A8F";
export const USDTDONLP = "0x91b1b853c1426c4aa78cac984c6f6dd1e80b0c4f";
export const WBNBDONLP = "0xe091ffaaab02b5b3f0cf9f4309c22a6550de4c8e";
export const DONTokenAddressBSC = "0xAe63763C1d9580637e3014113E634668e9096d60";
export const DONTokenAddressEth = "0x217ddead61a42369a266f1fb754eb5d3ebadc88a";
export const StakingBSCAddress = "0xe2451a1F50Dc718eF2b37D2C29539121B18b9d24";
export const StakingEthAddress = "0x21A05270dCeCB199C8E41E8297c15e6e1328aE48";
export const WBNBAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
export const USDTAddressEth = "0xdac17f958d2ee523a2206206994597c13d831ec7";
export const DONBSCbridge = "0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255";
export const DONETHbridge = "0x533e3c0e6b48010873B947bddC4721b1bDFF9648";
const ReferralSystemAddress = process.env.GATSBY_REFERRAL_CONTRACT;
const DonkeyPriceFeedAddress = "0x6926aeb5703e9533B5Dd9AC58A9101622588aDe6";
const LPTokenStakeContractBsc = "0x68DC579eC90a6B6618e9686909229A8D870b2f33";
const LPTokenStakeContractEth = "0x737543958801F7D8678c41998A23f5655C0Dd9b6";

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
export const getTokenAddress = memoizeAsync(
  async (web3: Web3, poolAddress: string) => {
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
  }
);
//get DON BSC bridge contract
export const getDONBSCbridgeContract = async (web3: Web3) => {
  const json = await import("../JsonData/DONBSCbridge.json");
  return new web3.eth.Contract(json.abi as any, DONBSCbridge);
};

export const getWrappedContract = async (web3: Web3, address: string) => {
  const json = await import("../JsonData/WBNB.json");
  return new web3.eth.Contract(json.abi as any, address);
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
  // console.log(referralContract.options.address,"reward system address");
  const rewardSystemAddress = await referralContract.methods
    .getRewardSystem()
    .call();
  // console.log(rewardSystemAddress, "Reward System Address");

  const json = await import("../JsonData/RewardSystem.json");
  return new web3.eth.Contract(json.abi as any, rewardSystemAddress);
};

export const getUserReferralCode = async (web3: Web3, pool_address: string) => {
  const referralContract = await getReferralSystemContract(web3);
  const accounts = await web3.eth.getAccounts();
  const userInfo = await referralContract.methods
    .userInfo(pool_address, accounts[0])
    .call();
  if (userInfo.exists) {
    return userInfo.referralCode as string;
  }
  return null;
};

export const isValidReferralCode = async (
  web3: Web3,
  code: string,
  pool: string
) => {
  const referralContract = await getReferralSystemContract(web3);
  const userInfo = await referralContract.methods.userInfoFromCode(code).call();

  return userInfo.pool === pool;
};

export const getPoolValue = async (web3: Web3, poolAddress: string) => {
  try {
    const amount = await getTotalPoolValue(web3, poolAddress);
    const token = await getPoolToken(web3, poolAddress);
    const decimals = await token.methods.decimals().call();
    const bn = new BigNumber(toEther(amount, decimals)).toFixed(2);
    return bn.toString();
  } catch (e) {
    console.trace();
    captureException(e, "getPoolValue: " + poolAddress);
    return "0";
  }
};
export const getPoolValueInUSD = async (web3: Web3, poolAddress: string) => {
  const totalPoolValue = await getPoolValue(web3, poolAddress);
  let tokenPrice = "1";
  try {
    tokenPrice = await getTokenPrice(web3, poolAddress);
  } catch (e) {
    // console.trace();
    captureException(e, "Error in Pool Value USD");
  }

  return new BigNumber(totalPoolValue).multipliedBy(tokenPrice).toString();
};
export const getUserAddressFromCode = async (web3: Web3, code: string) => {
  const referralContract = await getReferralSystemContract(web3);
  const userInfo = await referralContract.methods.userInfoFromCode(code).call();
  return userInfo.user;
};

export const signUpAsReferral = async (
  web3: Web3,
  code: string,
  pool_address: string
) => {
  const referralContract = await getReferralSystemContract(web3);
  const accounts = await web3.eth.getAccounts();
  const userInfo = await referralContract.methods
    .userInfo(pool_address, accounts[0])
    .call();
  if (userInfo.exists) {
    return userInfo.referralCode;
  } else {
    await referralContract.methods
      .signUp(pool_address, code)
      .send({ from: accounts[0] });
    return code;
  }
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

export const getPriceFromPriceFeed = async (
  web3: Web3,
  priceFeedAddress: string,
  tokenAddress: string
) => {
  const priceFeeds = await getDonkeyPriceFeedContract(web3, priceFeedAddress);
  const usdPrice = await priceFeeds.methods.getPriceinUSD(tokenAddress).call();
  return usdPrice;
};

export const getTokenPrice = memoizeAsync(
  async (web3: Web3, poolAddress: string) => {
    try {
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
        const usdPrice = await getPriceFromPriceFeed(
          web3,
          priceFeedsListAddress,
          tokenAddress
        );
        return toEther(usdPrice);
      }
      const bnbPrice = await (await getPancakeContract(web3)).methods
        .getAmountsOut(toWei("0.1"), [tokenAddress, BUSDAddress])
        .call();

      let price = new BigNumber(toEther(bnbPrice[1])).dividedBy(0.1).toString();

      return price;
    } catch (e) {
      // console.trace();
      captureException(e, "Get TokenPrice Error");
      return "1";
    }
  }
);

export const getTokenSymbol = memoizeAsync(
  async (web3: Web3, poolAddress: string) => {
    const token = await getPoolToken(web3, poolAddress);

    return (await token.methods.symbol().call()) as string;
  }
);

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

  if (version === 3) {
    return await import("../JsonData/pool-manual.json");
  }
  if (version === 4) {
    return await import("../JsonData/pool-v4.json");
  }
  return await import("../JsonData/pool2.json");
};

export const hasMined = async (txHash: string, web3: Web3) => {
  while (true) {
    const receipt = await web3.eth.getTransactionReceipt(txHash);
    console.log("Loop Running");
    if (!receipt) {
      await waitFor(500);
    } else {
      console.log("Loop Ended");
      return receipt;
    }
  }
};

export const getPoolContract = memoizeAsync(
  async (web3: Web3, poolAddress: string, version: number) => {
    const POOLJson = await getPoolJSON(version);
    return new web3.eth.Contract(POOLJson.abi as any, poolAddress);
  }
);

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
    if (farmer.network.chainId === BSC_TESTNET_CHAIN_ID) {
      return;
    }
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

export const getNewStakingContract = async (web3: Web3, isBsc = false) => {
  const stakingJSON = await import("../JsonData/LpStaking.json");

  const contract = new web3.eth.Contract(
    stakingJSON.abi as any,
    isBsc ? LPTokenStakeContractBsc : LPTokenStakeContractEth
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

export const getDonPriceWeb3 = async () => {
  if (process.env.NODE_ENV === "development") {
    return "1";
  }
  const priceFeedContract = await getDonkeyPriceFeedContract(
    getWeb3(BINANCE_CHAIN_ID)
  );
  const priceofToken = await priceFeedContract.methods
    .getPriceinUSD(DONTokenAddressBSC)
    .call();
  return toEther(priceofToken);
};

export const getDonPrice = async (isBSC = false) => {
  if (isBSC) {
    return getDonPriceWeb3();
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

export const toEther = (val: string | number, decimals = 18) => {
  return new BigNumber(val).dividedBy(10 ** decimals).toString();
};
export const toWei = (val: string, decimals = 18) => {
  return new BigNumber(val).multipliedBy(10 ** decimals).toFixed(0);
};

export const gettotalSWAPLPoolValue = async (web3: Web3, type: StakeType) => {
  const isBSC = type === "binancenew" || type === "binance";
  const tokenContract = await getERCContract(
    web3,
    isBSC ? DONTokenAddressBSC : USDTAddressEth
  );

  const balance = await tokenContract.methods
    .balanceOf(isBSC ? WBNBDONLP : USDTDONLP)
    .call();
  const timestwo = new BigNumber(
    isBSC ? toEther(balance) : new BigNumber(balance).dividedBy(10 ** 6)
  ).multipliedBy(2);
  if (isBSC) {
    const wbnbPrice = await getDonPriceWeb3();
    return timestwo.multipliedBy(wbnbPrice);
  }
  return timestwo;
};
export const getStakeContract = async (web3: Web3, type: StakeType) => {
  if (type === "binancenew" || type === "ethereumnew") {
    return await getNewStakingContract(web3, type === "binancenew");
  }
  return await getStakingContract(web3, type === "binance");
};

export const calculateAPY = async (web3: Web3, type: StakeType) => {
  const stakingContract = await getStakeContract(web3, type);
  const lpContract = await getLPTokenContract(
    web3,
    type === "binance" || type === "binancenew"
  );

  let totalStakedTokens = new BigNumber(
    toEther(await stakingContract.methods.totalSupply().call())
  );
  const donPrice = await getDonPrice(
    type === "binance" || type === "binancenew"
  );
  const rewardRate = toEther(await stakingContract.methods.rewardRate().call());
  const totalLPSupply = toEther(await lpContract.methods.totalSupply().call());
  const totalLPAmount = await gettotalSWAPLPoolValue(web3, type);
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

export const calculateTVL = async (web3: Web3, type: StakeType) => {
  const stakingContract = await getStakeContract(web3, type);
  const lpContract = await getLPTokenContract(
    web3,
    type === "binancenew" || type === "binance"
  );

  let totalStakedTokens = new BigNumber(
    await stakingContract.methods.totalSupply().call()
  );
  const totalLPAmount = await gettotalSWAPLPoolValue(web3, type);
  const totalLPSupply = await lpContract.methods.totalSupply().call();

  return totalStakedTokens
    .dividedBy(totalLPSupply)
    .multipliedBy(totalLPAmount)
    .toFixed(2);
};

export const getPromotionalPoolContract = async (
  web3: Web3,
  poolAddress: string
) => {
  const promotionalPoolABI = await import(
    "../JsonData/PromotionalPool-ABI.json"
  );
  const promotionalPoolToken = new web3.eth.Contract(
    promotionalPoolABI.default as any,
    poolAddress
  );
  return promotionalPoolToken;
};

export const getPoolInfo = async (web3: Web3, poolAddress: string) => {
  const promotionalPoolContract = await getPromotionalPoolContract(
    web3,
    poolAddress
  );
  const poolInfo = await promotionalPoolContract.methods.poolInfo(0).call();
  return poolInfo;
};

export const getRewardToken = async (
  web3: Web3,
  poolAddress: string,
  chainId?: number
) => {
  const promotionalPoolContract = await getPromotionalPoolContract(
    web3,
    poolAddress
  );
  const rewardAddr = await promotionalPoolContract.methods.rewardToken().call();
  const bep20ABI = await import("../JsonData/BEP20Token.json");
  console.log(rewardAddr, poolAddress, chainId, "Chain");
  const newWeb3 = chainId ? getWeb3(chainId) : web3;
  const rewardToken = new newWeb3.eth.Contract(bep20ABI.abi as any, rewardAddr);
  const symbol = await rewardToken.methods.symbol().call();
  const name = await rewardToken.methods.name().call();
  const decimals = await rewardToken.methods.decimals().call();
  // console.log(symbol, name)
  return { name, symbol, decimals };
};

export const getPendingReward = async (
  web3: Web3,
  poolAddress: string,
  account: string
) => {
  const promotionalPoolContract = await getPromotionalPoolContract(
    web3,
    poolAddress
  );
  const pendingReward = await promotionalPoolContract.methods
    .pendingReward(account)
    .call();
  return pendingReward;
};

export const getStakedAmount = async (
  web3: Web3,
  poolAddress: string,
  account: string
) => {
  const promotionalPoolContract = await getPromotionalPoolContract(
    web3,
    poolAddress
  );
  const amountStaked = await promotionalPoolContract.methods
    .userInfo(account)
    .call();
  return amountStaked.amount;
};

export const approveDon = async (
  web3: Web3,
  poolAddress: string,
  amount: string,
  address: string
) => {
  const donContract = await getBSCDon(web3);

  const res = await donContract.methods
    .approve(poolAddress, amount)
    .send({ from: address });
  return res;
};

export const checkAllowance = async (
  web3: Web3,
  poolAddress: string,
  amount: string,
  address: string
) => {
  const donContract = await getBSCDon(web3);
  const allowance = await donContract.methods
    .allowance(address, poolAddress)
    .call();
  return new BigNumber(allowance).gte(amount);
};

export const stakeDon = async (
  web3: Web3,
  poolAddress: string,
  amount: string,
  address: string
) => {
  const promotionalPoolContract = await getPromotionalPoolContract(
    web3,
    poolAddress
  );

  const _res = await promotionalPoolContract.methods
    .deposit(amount)
    .send({ from: address });
  return _res;
};

export const withdrawDon = async (
  web3: Web3,
  poolAddress: string,
  amount: string,
  address: string
) => {
  const promotionalPoolContract = await getPromotionalPoolContract(
    web3,
    poolAddress
  );

  const _res = await promotionalPoolContract.methods
    .withdraw(amount)
    .send({ from: address });
  return _res;
};
