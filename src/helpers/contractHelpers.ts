/* eslint-disable @typescript-eslint/no-unused-vars */
import BigNumber from "bignumber.js";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
const BUSDAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

const PancakeRouterAddress = "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F";
const IBUSDAddress = "0x7C9e73d4C71dae564d41F78d56439bB4ba87592f";
const FairLaunchAddress = "0xA625AB01B08ce023B2a342Dbb12a16f2C8489A8F";

let busdtoken: Contract | null = null;
let ibusdContract: Contract | null = null;
let FairLaunchContract: Contract | null = null;
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
  const investment = await contract.methods.getUserInvestedAmount(accounts[0]).call();
  const num = new BigNumber(web3.utils.fromWei(investment, "ether"));
  return num;
};

export const getPancakeContract = async (web3: Web3) => {
  const pancake = await import("JsonData/pancakeswap.json");
  return new web3.eth.Contract(pancake.default as any, PancakeRouterAddress);
};



export const getTotalPoolValue = async (web3: Web3, poolAddress: string) => {
  const contract = await getPoolContract(web3, poolAddress);
  const amount = await contract.methods.getTotalInvestAmount().call();
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
}

export const calculateWithdrawAmount = async (
  web3: Web3,
  poolAddress: string
) => {
  const accounts = await web3.eth.getAccounts();
  const poolContract = await getPoolContract(web3, poolAddress);
  const claimableAmount = poolContract.methods.getInvestorClaimableAmount(accounts[0]).call()
  const amount =  new BigNumber(web3.utils.fromWei(claimableAmount)).toFixed(2);
 
  return amount;
};

