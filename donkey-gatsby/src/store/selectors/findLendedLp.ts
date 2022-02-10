import { isOneOf } from "helpers";
import { IAuctionSuccessState, IStoreState } from "interfaces";
import memoizeOne from "memoize-one";

export const createFindLendedLp = () => {
  return memoizeOne(
    (
      auctions: IStoreState["auctions"]["auctionInfo"],
      lpAddress: string,
      auctionAddress: string
    ) => {
      // console.log("SS",auctions,isOneOf(auctions.status, ["FETCH_SUCCESS", "FETCH_BALANCE_SUCCESS"]))
      // console.trace()
      if (
        isOneOf(auctions.status, ["FETCH_SUCCESS", "FETCH_BALANCE_SUCCESS"])
      ) {
        const auctionList = (auctions as IAuctionSuccessState).auctionState;
        const auction = auctionList.find(
          (item) => item.address === auctionAddress
        );
        if (auction) {
          const supportedLp = auction.supportedLps.find((lp) => {
            return lp.lpAddress === lpAddress;
          });
          if (supportedLp) {
            return supportedLp;
          }
        }
      }
      return null;
    }
  );
};

export const findLendedLp = createFindLendedLp();
