import BigNumber from "bignumber.js";
import { waitFor } from "don-utils";
import { calculateInitialInvestment, calculateWithdrawAmount, getBUSDBalance, getTotalPoolValue } from "./contractHelpers";

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
    const investedAmount = await calculateWithdrawAmount(web3, poolAddress);
    const initialInvestment = await calculateInitialInvestment(web3, poolAddress);
    
    const profit =   parseFloat(investedAmount) - parseFloat(initialInvestment);

    const roi = profit/parseFloat(initialInvestment);
    return roi;
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



export  const checkIfUserWithDrawlWorked = async(web3: any, initialUserBalance: any) => {
    const accounts = await web3.eth.getAccounts();  
  
    return new Promise((res,rej) => {
      let retries = 3;
      async function  checkBalance() {
        const newBalance = await getBUSDBalance(web3,accounts[0]);
        const balanceisGreater = new BigNumber(newBalance).gt(initialUserBalance);
        retries--;
  
        if(balanceisGreater){
          res(newBalance);
        }
        if(retries === 0){
          if(!balanceisGreater){
            rej("Withdrawal failed");
          }
        }
        await waitFor(10000);
        await checkBalance();
      }
  
      checkBalance();
     
    })
  
  }
