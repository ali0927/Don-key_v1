import produce from "immer";
import { Reducer } from "redux";
import { IAuctionActions } from "store/actions/auctionActions";
import { IStoreState } from "interfaces";
import moment from "moment";

const INITIAL_AUCTION_STATE: IStoreState["auctions"] = {
  status: "INITIAL",
};

export const auctionReducer: Reducer<IStoreState["auctions"], IAuctionActions> =
  (state = INITIAL_AUCTION_STATE, action) => {
    switch (action.type) {
      case "FETCH_AUCTIONS": {
        return produce(state, (draft) => {
          draft.status = "FETCHING";
        });
      }

      case "FETCH_AUCTION_SUCCESS": {
        const { auctions } = action.payload;
        return produce(state, (draft) => {
          draft.status = "FETCH_SUCCESS";
          if (draft.status === "FETCH_SUCCESS") {
            draft.auctionState = { auctions };
            const currentAuction = auctions.filter((item) => {
              const startTime = moment.unix(item.startTime);
              const endTime = moment.unix(item.endTime);
              const currentTime = moment();
              return (
                currentTime.isAfter(startTime) && currentTime.isBefore(endTime)
              );
            });
            draft.currentAuction =
              currentAuction.length > 0 ? currentAuction[0] : auctions[0];
          }
        });
      }
      case "FETCH_BALANCES_SUCCESS": {
        const { auctions } = action.payload;
        return produce(state, (draft) => {
          draft.status = "FETCH_BALANCE_SUCCESS";
          if (draft.status === "FETCH_BALANCE_SUCCESS") {
            draft.auctionState = { auctions };
            const currentAuction = auctions.filter((item) => {
              const startTime = moment.unix(item.startTime);
              const endTime = moment.unix(item.endTime);
              const currentTime = moment();
              return (
                currentTime.isAfter(startTime) && currentTime.isBefore(endTime)
              );
            });
            draft.currentAuction =
              currentAuction.length > 0 ? currentAuction[0] : auctions[0];
          }
        });
      }
    }

    return state;
  };
