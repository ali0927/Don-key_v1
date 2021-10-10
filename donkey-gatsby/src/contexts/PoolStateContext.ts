import { IFarmerInter } from "interfaces";
import { createContext } from "react";

export type IPoolState = {
  isLoaded: boolean;
  poolAddress: string;
  status: IFarmerInter["status"];
  tvl: string;
  isInvested: boolean;
  decimals: string;
  investor: {
    last_updated: string;
    currentHoldings: string;
    investedAmountInUSD: string;
    greyAmount: string;
    investedAmount: string;
    profit: string;
    lpTokens: string;
    withdrawRequest: {
      profit: string;
      amount: string;
      created_on: string;
    } | null;
  };
  withdrawTimeFrame: string;
  poolToken: {
    address: string;
    name: string;
    price: string;
  };
  last_updated: string;
};

// const intialPoolState: IPoolState = {};

export const PoolStateContext = createContext({});
