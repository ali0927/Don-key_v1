/**eslint-disable react-hooks/exhaustive-deps*/
import BigNumber from "bignumber.js";
import {
  calculateInitialInvestment,
  getPoolContract,
  getROI,
  getTotalPoolValue,
} from "helpers";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useInitialInvestment } from "./useInitialInvestment";

export const useROIAndInitialInvestment = (
  web3: Web3,
  poolAddress: string,
  refresh= false,
  disableOnLoad = false

) => {
  const [totalRoi, setTotalRoi] = useState("0");
  const [roi, setRoi] = useState("0");
  const [share, setMyShare] = useState("0");
  const {initialInvestment,initialInvestmentInUSD, isReady} = useInitialInvestment(poolAddress, refresh);
  const fetchRoi = async () => {
    const accounts = await web3.eth.getAccounts();
    const pool = await getPoolContract(web3, poolAddress, 2);
    let poolValue = await getTotalPoolValue(web3, poolAddress);
    const poolValueBN = new BigNumber(poolValue);
    const totalInvestedAmount = new BigNumber(
      await pool.methods.getTotalInvestAmount().call()
    );
    let lptokensresponse = new BigNumber(
      await pool.methods.balanceOf(accounts[0]).call()
    );

    let totalShares = new BigNumber(await pool.methods.totalSupply().call());

    const myShares = totalShares.isEqualTo(0)
      ? 0
      : lptokensresponse.dividedBy(totalShares).multipliedBy(100);
    setMyShare(myShares.toFixed(2));

    const totalRoi = totalInvestedAmount.isEqualTo(0)
      ? 0
      : poolValueBN
          .minus(totalInvestedAmount)
          .multipliedBy(100)
          .dividedBy(totalInvestedAmount);
    setTotalRoi(totalRoi.toFixed(2));
    const roi = await getROI(web3, poolAddress);

    setRoi(roi);
  };
  useEffect(() => {
    if (!disableOnLoad) {
      fetchRoi();
    }
  }, [web3, poolAddress]);

  return {
    roi: totalRoi,
    farmerRoi: roi,
    initialInvestment: isReady ? initialInvestment: "0",
    initialInvestmentInUSD: isReady ? initialInvestmentInUSD: "0",
    myShare: share,
    fetchRoi,
  };
};
