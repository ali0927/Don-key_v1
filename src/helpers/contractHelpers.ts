import Web3 from "web3";
import {Contract} from "web3-eth-contract";
const BUSDAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";



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

export const getStrategyContract = async (web3: Web3, strategyAddress: string) => {
  const StrategyJsn = await import("JsonData/Strategy.json");

  return new web3.eth.Contract(StrategyJsn.abi as any, strategyAddress);

}