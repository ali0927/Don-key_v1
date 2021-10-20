
import BigNumber from "bignumber.js";
import { getWeb3 } from "don-components";
import {
    captureException,
  formatNum,
  getPoolToken,
  getTokenPrice,
  getTotalPoolValue,
  toEther,
} from "helpers";

export const getTVL = async (farmers: any) => {
  let finalTVL: BigNumber = new BigNumber(0);
  for (let farmer of farmers) {
    const web3 = getWeb3(farmer.network.chainId);
    try {
      const token = await getPoolToken(web3, farmer.poolAddress);
      const decimals = await token.methods.decimals().call();
      let [poolValue, tokenPrice] = await Promise.all([
        getTotalPoolValue(web3, farmer.poolAddress),
        getTokenPrice(web3, farmer.poolAddress),
      ]);
      const tokens = toEther(poolValue, decimals);
      const final = new BigNumber(tokens).multipliedBy(tokenPrice);
      finalTVL = finalTVL.plus(final);
    } catch (e) {
      captureException(e, "getTVL");
    }
  }
  return formatNum(finalTVL.toFixed(0).toString());
};
