import BigNumber from "bignumber.js";
import { calculateInitialInvestment, calculateWithdrawAmount, getTotalPoolValue } from "./contractHelpers";

export const getQueryParam = (name: string) => {
    if (typeof window === "undefined") {
        return "";
    }
    const search = window.location.search;
    const queryString = decodeURIComponent(search.slice(1, search.length));
    const queryObj: any = {};
    queryString.split("&").forEach((item) => {
        const items = item.split("=");
        queryObj[items[0]] = items[1];
    });
 
    return queryObj[name];
};

export const tuplify = <T extends any[]>(...args: T) => {
    return args;
};





export const getROI =async(web3: any, poolAddress: string) => {
    const investedAmountWithReward = new BigNumber(await calculateWithdrawAmount(web3, poolAddress));
    const initialInvestment = new BigNumber(await calculateInitialInvestment(web3, poolAddress));
    console.log(initialInvestment.toFixed(0));
    console.log(investedAmountWithReward.toFixed(0));
    if(initialInvestment.isEqualTo(0)){
      return "0";
    }
    return (investedAmountWithReward.minus(initialInvestment).multipliedBy(100)).dividedBy(initialInvestment).toFixed(2);
}


export const getProfitLoss =async(web3: any, poolAddress: string) => {
    const investedAmount = await calculateWithdrawAmount(web3, poolAddress);
    const initialInvestment = await calculateInitialInvestment(web3, poolAddress);
    
    const value =   parseFloat(investedAmount) - parseFloat(initialInvestment);
    return value;
}

export const getPoolValue = async (web3: any, poolAddress:string) => {
    try {
      const amount = await getTotalPoolValue(web3, poolAddress);
      const bn = new BigNumber(web3.utils.fromWei(amount, "ether")).toFixed(2);
      return bn.toString();
    }catch(e){
      return "0"
    }
  }



