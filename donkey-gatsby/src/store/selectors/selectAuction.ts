import { IStoreState } from "interfaces";
import memoizeOne from "memoize-one";

export const createSelectAuction = () => {
  return memoizeOne((state: IStoreState, address: string) => {
    const auctions = state.auctions.auctionInfo;
    if (auctions.status === "FETCH_SUCCESS") {
      const auctionList = auctions.auctionState;
      return auctionList.find((item) => item.address === address);
    }
    return null;
  });
};

export const selectAuction = createSelectAuction();