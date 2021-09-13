

import BigNumber from "bignumber.js";

export const convertToInternationalCurrencySystem = (labelValue: number | string) => {
  // Nine Zeroes for Billions

  const value = Math.abs(Number(labelValue));
  if(value >= 1.0e9){
      const finalValue = value / 1.0e9;
      return new BigNumber((finalValue)).toFixed(2) + "B";
      
  }
  else if (value >= 1.0e6){
    const finalValue =value / 1.0e6;
    return new BigNumber((finalValue)).toFixed(2) + "M";
  }

  else if (value >= 1.0e3){
    const finalValue =value / 1.0e3;
    return new BigNumber((finalValue)).toFixed(2) + "K";
  }
  else {
      return new BigNumber((value)).toFixed(3);
  }
};
