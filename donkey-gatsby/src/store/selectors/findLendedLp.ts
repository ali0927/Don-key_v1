import { IAuction, IStoreState } from "interfaces";
import memoizeOne from "memoize-one";

export const createFindLendedLp = () => {
  return memoizeOne((state: IStoreState, lpAddress: string) => {
    const auctions = state.auctions.auctionInfo;
    let lpFound: IAuction["supportedLps"][number] | null = null;
    if (auctions.status === "FETCH_SUCCESS") {
      const auctionList = auctions.auctionState;
      auctionList.find(
        (item) =>
          !!item.supportedLps.find((lp) => {
            if (lp.lpAddress === lpAddress) {
              lpFound = lp;
              return true;
            }
          })
      );
    }
    return lpFound;
  });
};

export const findLendedLp = createFindLendedLp();
