import produce from "immer";
import { Reducer } from "redux";
import { IAuctionActions } from "store/actions/auctionActions";
import { IAuctionSuccessState, IStoreState } from "interfaces";
import moment from "moment";
import { sortBy } from "lodash";

const INITIAL_AUCTION_STATE: IStoreState["auctions"] = {
  auctionInfo: {
    status: "INITIAL",
  },
  userBids: {
    status: "INITIAL",
    data: [],
  },
  loans: {
    status: "INITIAL",
    data: [],
  },
  prevAuctions: {
    status: "INITIAL",
    data: [],
  },
};

const updateCurrentAuction = (state: IStoreState["auctions"]) => {
  const auctionState = state.auctionInfo;
  if (
    auctionState.status === "FETCH_BALANCE_SUCCESS" ||
    auctionState.status === "FETCH_SUCCESS"
  ) {
    return produce(state, (draft) => {
      const currentTime = moment();
      const auctions = auctionState.auctionState;
      const sortedAuctions = sortBy(auctions, (item) => {
        item.startTime;
      });
      const currentAuction = auctions.filter((item) => {
        const startTime = moment.unix(item.startTime);
        const endTime = moment.unix(item.endTime);

        return currentTime.isAfter(startTime) && currentTime.isBefore(endTime);
      });
      const lastAuction = sortedAuctions[auctions.length - 1];
      const firstAuction = sortedAuctions[0];
      const nextAuctions = auctions.filter((item) => {
        const startTime = moment.unix(item.startTime);

        return currentTime.isBefore(startTime);
      });
      const auctionInfo = draft.auctionInfo as IAuctionSuccessState;
      if (currentAuction.length > 0) {
        // Not Started
        auctionInfo.currentAuction = currentAuction[0];
      } else {
        auctionInfo.currentAuction = null;
      }
      auctionInfo.nextAuction =
        nextAuctions.length > 0 ? nextAuctions[0] : null;
      auctionInfo.firstAuction = firstAuction;
      auctionInfo.lastAuction = lastAuction;
    });
  }
  return state;
};

export const auctionReducer: Reducer<IStoreState["auctions"], IAuctionActions> =
  (state = INITIAL_AUCTION_STATE, action) => {
    switch (action.type) {
      case "FETCH_AUCTIONS": {
        return produce(state, (draft) => {
          draft.auctionInfo.status = "FETCHING";
        });
      }

      case "FETCH_AUCTION_SUCCESS": {
        const { auctions } = action.payload;

        const newState = produce(state, (draft) => {
          draft.auctionInfo.status = "FETCH_SUCCESS";
          if (draft.auctionInfo.status === "FETCH_SUCCESS") {
            draft.auctionInfo.auctionState = auctions;
          }
        });
        return updateCurrentAuction(newState);
      }
      case "UPDATE_CURRENT_AUCTION": {
        return updateCurrentAuction(state);
      }
      case "FETCH_BALANCES_SUCCESS": {
        const { auctions } = action.payload;
        const newState = produce(state, (draft) => {
          draft.auctionInfo.status = "FETCH_BALANCE_SUCCESS";
          if (draft.auctionInfo.status === "FETCH_BALANCE_SUCCESS") {
            draft.auctionInfo.auctionState = auctions;
          }
        });
        return updateCurrentAuction(newState);
      }
      case "FETCHING_BIDS": {
        return produce(state, (draft) => {
          draft.userBids.status = "FETCHING";
        });
      }
      case "FETCH_BIDS_SUCCESS": {
        const { bids } = action.payload;
        return produce(state, (draft) => {
          draft.userBids.status = "FETCH_SUCCESS";
          draft.userBids.data = bids;
        });
      }
      case "FETCH_BIDS_FAIL": {
        return produce(state, (draft) => {
          draft.userBids.status = "FETCH_FAILED";
        });
      }
      case "FETCHING_LOANS": {
        return produce(state, (draft) => {
          draft.loans.status = "FETCHING";
        });
      }
      case "FETCH_LOANS_SUCCESS": {
        const { loans } = action.payload;
        return produce(state, (draft) => {
          draft.loans.status = "FETCH_SUCCESS";
          draft.loans.data = loans;
        });
      }
      case "FETCH_LOANS_FAIL": {
        return produce(state, (draft) => {
          draft.loans.status = "FETCH_FAILED";
        });
      }
      case "BID_REVOKED": {
        const { auctionAddress } = action.payload;

        return produce(state, (draft) => {
          const index = state.userBids.data.findIndex(
            (item) => item.auctionAddress === auctionAddress
          );
          if (index > -1) {
            draft.userBids.data.splice(index, 1);
          }
        });
      }
      case "FETCH_PREV_AUCTION": {
        return produce(state, (draft) => {
          draft.prevAuctions.status = "FETCHING";
        });
      }
      case "FETCH_PREV_AUCTION_SUCCESS": {
        const { prevAuctions } = action.payload;
        return produce(state, (draft) => {
          draft.prevAuctions.status = "FETCH_SUCCESS";
          draft.prevAuctions.data = prevAuctions;
        });
      }
    }

    return state;
  };
