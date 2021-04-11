import Web3 from "web3";
import pancakerouterabi from "./PancakeRouterAbi.json";

export const getEstimatedAmount = async (
  web3: Web3,
  amount: string,
  tokenA: string,
  tokenB: string
) => {
  const pancakerouteraddress = "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F";
  if (amount === "0") {
    return "0";
  }
  const pancakeRouter = new web3.eth.Contract(
    pancakerouterabi as any,
    pancakerouteraddress
  );

  var weiAmout = web3.utils.toBN(amount)
  var weiAmount2 = web3.utils.toWei(weiAmout.toString() );

  const estimate = await pancakeRouter.methods
    .getAmountsOut(weiAmount2, [tokenA, tokenB])
    .call();
  const out = estimate[1] as string;
  
  return web3.utils.fromWei(out, 'ether') as string;
};
