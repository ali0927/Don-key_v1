import Web3 from "web3";
import StrategyJson from "../JsonData/Strategy.json";


export const deployStrategy = async (web3: Web3) => {
  let gasPrice = await web3.eth.getGasPrice();
  let gasPriceHex = web3.utils.toHex(gasPrice);
  let gasLimitHex = web3.utils.toHex(6000000);
  let block = web3.eth.getBlock("latest");
  const accounts = await web3.eth.getAccounts();

  let code = '0x' + StrategyJson.evm.bytecode.object;

let SampleContract = new web3.eth.Contract(StrategyJson.abi as any);





}