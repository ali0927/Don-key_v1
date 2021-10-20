import { getWeb3 } from "don-components";
import { getPoolContract, captureException } from "helpers";

export const getUsersCount = async (farmers: any) => {
  let finalCount = 0;
  for (let farmer of farmers) {
    const web3 = getWeb3(farmer.network.chainId);
    const pool = await getPoolContract(web3, farmer.poolAddress, 2);
    try {
      const count = await pool.methods.getInvestorCount().call();
      finalCount = finalCount + Number(count);
    } catch (e) {
      captureException(e, "InvestorCountContract");
    }
  }
  return finalCount;
};
