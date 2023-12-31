import { isOneOf } from "helpers";
import { IStoreState } from "interfaces";
import memoizeOne from "memoize-one";

export const createBidSelector = () => {
  return memoizeOne(
    (
      bids: IStoreState["auctions"]["userBids"],
      lpAddress: string,
      auctionAddress: string
    ) => {
      if (isOneOf(bids.status, ["FETCH_SUCCESS"])) {
        const auctionList = bids.data;
        return auctionList.find((item) => {
          // console.log(item, lpAddress);
          return (
            item.lpAddress === lpAddress &&
            item.auctionAddress === auctionAddress
          );
        });
      }
      return null;
    }
  );
};

export const bidSelector = createBidSelector();
