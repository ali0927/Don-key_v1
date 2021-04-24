import BigNumber from "bignumber.js";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
const BUSDAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
var BDOaddress = "0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454";
const PancakeRouterAddress = "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F";

let busdtoken: Contract | null = null;

export const getBUSDTokenContract = async (web3: Web3) => {
  if (busdtoken) {
    return busdtoken;
  }
  const BUSDJson = await import("JsonData/BUSDToken.json");
  busdtoken = new web3.eth.Contract(BUSDJson.default as any, BUSDAddress);
  return busdtoken;
};

export const getPoolContract = async (web3: Web3, poolAddress: string) => {
  const POOLJson = await import("JsonData/Pool1.json");
  return new web3.eth.Contract(POOLJson.abi as any, poolAddress);
};

export const getStrategyContract = async (
  web3: Web3,
  strategyAddress: string
) => {
  const StrategyJsn = await import("JsonData/Strategy1.json");

  return new web3.eth.Contract(StrategyJsn.abi as any, strategyAddress);
};

export const getInvestedAmount = async (web3: Web3, poolAddress: string) => {
  const contract = await getPoolContract(web3, poolAddress);
  const accounts = await web3.eth.getAccounts();
  const investment = await contract.methods.getInvested(accounts[0]).call();
  const num = new BigNumber(web3.utils.fromWei(investment, "ether"));
  return num;
};

export const getPancakeContract = async (web3: Web3) => {
  const pancake = await import("JsonData/pancakeswap.json");
  return new web3.eth.Contract(pancake.default as any, PancakeRouterAddress);
};

export const addCubesToTestStrategy = async (
  web3: Web3,
  strategyAddress: string,
  poolAddress: string
) => {
  const pancakeContract = await getPancakeContract(web3);
  const strategyContract = await getStrategyContract(web3, strategyAddress);
  const BUSDContract = await getBUSDTokenContract(web3);
  const amount = await BUSDContract.methods.balanceOf(poolAddress).call();
  const accounts = await web3.eth.getAccounts();
  const approveBUSD = BUSDContract.methods
    .approve(PancakeRouterAddress, amount)
    .encodeABI();

  console.log(approveBUSD);

  var BUSD2BDOswap = await pancakeContract.methods
    .swapExactTokensForTokens(
      amount,
      0,
      [BUSDAddress, BDOaddress],
      strategyAddress,
      Date.now() + 10000
    )
    .encodeABI();

  console.log(BUSD2BDOswap);

  var addCubes = await strategyContract.methods
    .overrideCubes(
      [BUSDAddress, PancakeRouterAddress],
      [approveBUSD, BUSD2BDOswap],
      0
    )
    .send({ from: accounts[0] });
  console.log(addCubes);
};
