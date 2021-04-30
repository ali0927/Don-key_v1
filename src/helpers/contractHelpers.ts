import BigNumber from "bignumber.js";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
const BUSDAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const BDOaddress = "0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454";
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
  const investment = await contract.methods.getInvested(accounts[0]).call();
  const num = new BigNumber(web3.utils.fromWei(investment, "ether"));
  return num;
};

export const getPancakeContract = async (web3: Web3) => {
  const pancake = await import("JsonData/pancakeswap.json");
  return new web3.eth.Contract(pancake.default as any, PancakeRouterAddress);
};

export const buildPancakeStrategy = async (web3: Web3, poolAddress: string) => {
  const pancakeContract = await getPancakeContract(web3);
  const poolContract = await getPoolContract(web3, poolAddress);
  const strategyAddress = await poolContract.methods.getStrategy().call();
  const strategyContract = await getStrategyContract(web3, strategyAddress);
  const BUSDContract = await getBUSDTokenContract(web3);
  const amount = await BUSDContract.methods.balanceOf(poolAddress).call();
  console.log("amount", amount);
  const accounts = await web3.eth.getAccounts();
  const approveBUSD = BUSDContract.methods
    .approve(PancakeRouterAddress, amount)
    .encodeABI();

  const blockNumber = await web3.eth.getBlockNumber();
  const blockData = await web3.eth.getBlock(blockNumber);
  var BUSD2BDOswap = await pancakeContract.methods
    .swapExactTokensForTokens(
      amount,
      0,
      [BUSDAddress, BDOaddress],
      strategyAddress,
      (blockData.timestamp as number) + 10000
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
  console.log(addCubes, "override cubes");
};

const convertBUSDToIBUSD = async (
  web3: Web3,
  amount: string,
) => {
  const IBUSDContract = await getIBUSDContract(web3);

  const totalToken = await IBUSDContract.methods.debtValToShare(amount).call()
  return totalToken;
};

export const buildAlpacaStrategy = async (web3: Web3, poolAddress: string) => {
  const BUSDContract = await getBUSDTokenContract(web3);
  const IBUSDContract = await getIBUSDContract(web3);
  const FairLaunchContract = await getFairLaunchContract(web3);
  const poolContract = await getPoolContract(web3, poolAddress);
  const strategyAddress = await poolContract.methods.getStrategy().call();
  const strategyContract = await getStrategyContract(web3, strategyAddress);
  const Amount = await BUSDContract.methods.balanceOf(poolAddress).call();

  const ApproveBUSD = await BUSDContract.methods
    .approve(IBUSDAddress, Amount)
    .encodeABI();

  console.log("approved alpake");
  // // // deposit busd to get ibusd
  const DepositBUSD = await IBUSDContract.methods.deposit(Amount).encodeABI();

  const ibusdValue = await convertBUSDToIBUSD(web3, Amount);

  console.log(web3.utils.fromWei(ibusdValue, "ether"), "balance in iBUSD");

  // // stake ibusd to get allocated alpaca contract
  const APPROVEForStake = await IBUSDContract.methods
    .approve(FairLaunchAddress, ibusdValue)
    .encodeABI();

  const accounts = await web3.eth.getAccounts();

  var poolId = 3;

  var stakeMoney = await FairLaunchContract.methods
    .deposit(strategyAddress, poolId, ibusdValue)
    .encodeABI();

  await strategyContract.methods
    .overrideCubes(
      [BUSDAddress, IBUSDAddress, IBUSDAddress, FairLaunchAddress],
      [ApproveBUSD, DepositBUSD, APPROVEForStake, stakeMoney],
      0
    )
    .send({ from: accounts[0] });

  console.log("Alpaca Cubes Added");
};


export const withdrawFromAlpacaStrategy = () => {
  
}