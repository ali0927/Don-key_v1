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
      const firstStart = moment.unix(firstAuction.startTime);
      const lastEnd = moment.unix(lastAuction.endTime);
      const auctionInfo = draft.auctionInfo as IAuctionSuccessState;
      if (currentTime.isBetween(firstStart, lastEnd)) {
        // Not Started
        auctionInfo.currentAuction = currentAuction[0];
      } else {
        auctionInfo.currentAuction = null;
      }
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
    }

    return state;
  };
