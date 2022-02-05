import { isOneOf } from "helpers";
import {  IStoreState } from "interfaces";
import memoizeOne from "memoize-one";

export const createBidSelector = () => {
  return memoizeOne(
    (bids: IStoreState["auctions"]["userBids"], address: string) => {
      if (
        isOneOf(bids.status, ["FETCH_SUCCESS"])
      ) {
        const auctionList = bids.data;
        return auctionList.find((item) => item.auctionAddress === address);
      }
      return null;
    }
  );
};

export const bidSelector = createBidSelector();
