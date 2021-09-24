/**eslint-disable react-hooks/exhaustive-deps*/
import BigNumber from "bignumber.js";
import { getPoolContract } from "helpers";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useInitialInvestment } from "./useInitialInvestment";

export const useROIAndInitialInvestment = (
  web3: Web3,
  poolAddress: string,
  refresh = false,
  disableOnLoad = false
) => {
  const [share, setMyShare] = useState("0");
  const { initialInvestment, initialInvestmentInUSD, isReady } =
    useInitialInvestment(poolAddress, refresh);
  const fetchRoi = async () => {
    const accounts = await web3.eth.getAccounts();
    const pool = await getPoolContract(web3, poolAddress, 2);

    let lptokensresponse = new BigNumber(
      await pool.methods.balanceOf(accounts[0]).call()
    );

    let totalShares = new BigNumber(await pool.methods.totalSupply().call());

    const myShares = totalShares.isEqualTo(0)
      ? 0
      : lptokensresponse.dividedBy(totalShares).multipliedBy(100);
    setMyShare(myShares.toFixed(2));
  };
  useEffect(() => {
    if (!disableOnLoad && web3) {
      fetchRoi();
    }
  }, [web3, poolAddress]);

  return {
    initialInvestment: isReady ? initialInvestment : "0",
    initialInvestmentInUSD: isReady ? initialInvestmentInUSD : "0",
    myShare: share,
    fetchRoi,
  };
};
