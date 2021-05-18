/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import BigNumber from "bignumber.js";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
const BUSDAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

const PancakeRouterAddress = "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F";
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

let busdtoken: Contract | null = null;
let ibusdContract: Contract | null = null;
let FairLaunchContract: Contract | null = null;

export const getERCContract = async (web3: Web3, address: string) => {
  const BUSDJson = await import("JsonData/BUSDToken.json");
  busdtoken = new web3.eth.Contract(BUSDJson.default as any, address);
  return busdtoken;
};

export const getBUSDTokenContract = async (web3: Web3) => {
  if (busdtoken) {
    return busdtoken;
  }
  const BUSDJson = await import("JsonData/BUSDToken.json");
  busdtoken = new web3.eth.Contract(BUSDJson.default as any, BUSDAddress);
  return busdtoken;
};

export const getPoolContract = async (web3: Web3, poolAddress: string) => {
  const POOLJson = await import("JsonData/pool2.json");
  return new web3.eth.Contract(POOLJson.abi as any, poolAddress);
};

export const getIBUSDContract = async (web3: Web3) => {
  if (ibusdContract) {
    return ibusdContract;
  }
  const ibusdjson = await import("JsonData/IBUSDToken.json");
  ibusdContract = new web3.eth.Contract(ibusdjson.default as any, IBUSDAddress);
  return ibusdContract;
};

export const getFairLaunchContract = async (web3: Web3) => {
  if (FairLaunchContract) {
    return FairLaunchContract;
  }
  const fairLaunchJSON = await import("JsonData/FairLaunch.json");
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
  const StrategyJsn = await import("JsonData/strategy2.json");

  return new web3.eth.Contract(StrategyJsn.abi as any, strategyAddress);
};

export const getInvestedAmount = async (web3: Web3, poolAddress: string) => {
  const contract = await getPoolContract(web3, poolAddress);
  const accounts = await web3.eth.getAccounts();
  const investment = await contract.methods
    .getInvestorClaimableAmount(accounts[0])
    .call();
  const num = new BigNumber(web3.utils.fromWei(investment, "ether"));
  return num;
};

export const getPancakeContract = async (web3: Web3) => {
  const pancake = await import("JsonData/pancakeswap.json");
  return new web3.eth.Contract(pancake.default as any, PancakeRouterAddress);
};

export const getTotalPoolValue = async (web3: Web3, poolAddress: string) => {
  const contract = await getPoolContract(web3, poolAddress);
  const amount = await contract.methods.getinvestedAmountWithReward().call();
  return amount;
};

export const getTotalReservePoolValue = async (
  web3: Web3,
  poolAddress: string
) => {
  const contract = await getPoolContract(web3, poolAddress);
  const amount = await contract.methods.getCurrentBUSDBalance().call();
  return amount;
};

export const getLpTokensTotal = async (web3: Web3, poolAddress: string) => {
  const accounts = await web3.eth.getAccounts();
  const pool = await getPoolContract(web3, poolAddress);
  const lptokensresponse = await pool.methods.balanceOf(accounts[0]).call();
  const total = await pool.methods.totalSupply().call();
  return { user: lptokensresponse, total };
};

export const getBUSDBalance = async (web3: Web3, address: string) => {
  const BUSDContract = await getBUSDTokenContract(web3);
  const balance = await BUSDContract.methods.balanceOf(address).call();
  return balance;
};

export const calculateWithdrawAmount = async (
  web3: Web3,
  poolAddress: string
) => {
  const accounts = await web3.eth.getAccounts();
  const poolContract = await getPoolContract(web3, poolAddress);
  const claimableAmount = await poolContract.methods
    .getFinalClaimableAmount(accounts[0])
    .call();
  const amount = new BigNumber(web3.utils.fromWei(claimableAmount)).toString();
  return amount;
};

export const calculateInitialInvestment = async (
  web3: Web3,
  poolAddress: string
) => {
  const accounts = await web3.eth.getAccounts();
  const poolContract = await getPoolContract(web3, poolAddress);
  const initialAmount = await poolContract.methods
    .getUserInvestedAmount(accounts[0])
    .call();
  const amount = new BigNumber(web3.utils.fromWei(initialAmount)).toString();
  return amount;
};

export const getStakingContract = async (web3: Web3, isBSC = false) => {
  const stakingJSON = await import("JsonData/KiraStaking.json");

  const contract = new web3.eth.Contract(
    stakingJSON.abi as any,
    isBSC ? StakingBSCAddress : StakingEthAddress
  );

  return contract;
};

export const getLPTokenContract = async (web3: Web3, isBSC = false) => {
  const lpJSON = await import("JsonData/BUSDToken.json");

  const contract = new web3.eth.Contract(
    lpJSON.default as any,
    isBSC ? WBNBDONLP : USDTDONLP
  );

  return contract;
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

export const toEther = (val: string) => {
  return Web3.utils.fromWei(val, "ether");
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
