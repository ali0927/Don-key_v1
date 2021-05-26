import BigNumber from "bignumber.js";
import { calculateInitialInvestment, calculateWithdrawAmount, getPoolContract, getProfitLoss, getROI, getTotalPoolValue } from "helpers";
import { useEffect, useState } from "react";
import Web3 from "web3";

export const useROIAndInitialInvestment = (web3: Web3, poolAddress: string) => {
  const [totalRoi, setTotalRoi]= useState("0");
  const [roi, setRoi] = useState("0");
  const [share,setMyShare] =useState("0");
  const [initialInvestment, setInitialInvestment] = useState("0");

  useEffect(() => {
      const callInvestment = async() => {
        const accounts = await web3.eth.getAccounts();
        const pool = await getPoolContract(web3, poolAddress);
        let poolValue = await getTotalPoolValue(web3, poolAddress);
        poolValue = new BigNumber(poolValue);

        let lptokensresponse = await pool.methods.balanceOf(accounts[0]).call();
        lptokensresponse = new BigNumber(lptokensresponse);
        let totalShares = await pool.methods.totalSupply().call();
        totalShares = new BigNumber(totalShares);
        const myShares = lptokensresponse.dividedBy(totalShares);
        setMyShare(myShares);

        const totalRoi = poolValue.dividedBy(lptokensresponse);
        setTotalRoi(totalRoi.toFixed(2).toString());

        const startingInvestment = await calculateInitialInvestment(web3, poolAddress);
        const roi = await getROI(web3, poolAddress);

        setInitialInvestment(startingInvestment);
    
    
        
        setRoi(roi.toFixed(2).toString());
    
       
      }

      callInvestment();

  }, [web3, poolAddress]);

  return {
      roi: totalRoi,
      farmerRoi: roi,
      initialInvestment: initialInvestment,
      myShare: share
  }
};
