import { IStoreState } from "interfaces";
import { Reducer } from "redux";


export const transactionReducer: Reducer<IStoreState["transactions"], any> = (state={}, action ) => {
  return state;
}