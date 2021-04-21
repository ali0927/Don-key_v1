import Web3 from "web3";
import StrategyJson from "../JsonData/Strategy.json";
import {Contract} from "web3-eth-contract";
import memoizeOne from "memoize-one";
const BUSDAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";


export const deployStrategy = async (web3: Web3) => {
  let gasPrice = await web3.eth.getGasPrice();
  let gasPriceHex = web3.utils.toHex(gasPrice);
  let gasLimitHex = web3.utils.toHex(6000000);
  let block = web3.eth.getBlock("latest");
  const accounts = await web3.eth.getAccounts();

  let code = '0x' + StrategyJson.evm.bytecode.object;

let SampleContract = new web3.eth.Contract(StrategyJson.abi as any);


}

let busdtoken: Contract| null = null;

export const getBUSDTokenContract = async (web3: Web3) => {
  if(busdtoken){
    return busdtoken;
  }
  const BUSDJson = await import("JsonData/BUSDToken.json");
  busdtoken = new web3.eth.Contract(BUSDJson.default as any, BUSDAddress);
  return busdtoken;
}

export const getPoolContract = async (web3: Web3,poolAddress: string) => {
  const POOLJson = await import("JsonData/Pool.json");
  return new web3.eth.Contract(POOLJson.abi as any, poolAddress);
}