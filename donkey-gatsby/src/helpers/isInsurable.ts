import BigNumber from "bignumber.js";
import { factor } from "components/InvestBlackCard/InsuranceInfo";

export const isInsurable  = ( amount: string | BigNumber, minAmount: BigNumber | number | null | undefined) => {
  
    if(typeof amount === "string"){
        amount = new BigNumber(amount);
    }
    if(!minAmount ){
        return false;
    }
    if(typeof minAmount === "number"){
        minAmount = new BigNumber(minAmount)
    }

    return amount.multipliedBy(factor).gte(minAmount);
}