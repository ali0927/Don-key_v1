import { isOneOf } from "helpers";
import {  IStoreState } from "interfaces";
import memoizeOne from "memoize-one";

export const createLoanSelector = () => {
  return memoizeOne(
    (bids: IStoreState["auctions"]["loans"], lpAddress: string) => {
      if (
        isOneOf(bids.status, ["FETCH_SUCCESS"])
      ) {
        const auctionList = bids.data;
        return auctionList.find((item) => item.lpAddress === lpAddress);
      }
      return null;
    }
  );
};

export const loanSelector = createLoanSelector();
