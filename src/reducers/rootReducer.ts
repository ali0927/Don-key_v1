import { IStoreState } from "interfaces";
import { combineReducers } from "redux";
import { apiReducer } from "./apiReducer";
import { authReducer } from "./authReducer";
import { farmerReducer } from "./farmerReducer";
import { transactionReducer } from "./transactionReducer";

export const rootReducer = combineReducers<IStoreState>({
  auth: authReducer,
  farmer: farmerReducer,
  api: apiReducer,
  transactions: transactionReducer
});
