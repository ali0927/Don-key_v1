import { IStoreState } from "interfaces";
import { combineReducers } from "redux";
import { auctionReducer } from "./auctionReducer";
import { authReducer } from "./authReducer";
import { popupReducer } from "./popupReducer";



export const rootReducer = combineReducers<IStoreState>({
  auth: authReducer,
  popups: popupReducer,
  auctions: auctionReducer,
});
