import { isOneOf } from "helpers";
import { IAuctionSuccessState, IStoreState } from "interfaces";
import memoizeOne from "memoize-one";

export const createSelectAuction = () => {
  return memoizeOne(
    (auctions: IStoreState["auctions"]["auctionInfo"], address: string) => {
      if (
        isOneOf(auctions.status, ["FETCH_BALANCE_SUCCESS", "FETCH_SUCCESS"])
      ) {
        const auctionList = (auctions as IAuctionSuccessState).auctionState;
        return auctionList.find((item) => item.address === address);
      }
      return null;
    }
  );
};

export const selectAuction = createSelectAuction();
