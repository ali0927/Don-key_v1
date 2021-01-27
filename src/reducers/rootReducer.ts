import { IStoreState } from "interfaces";
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers<IStoreState>({ auth: authReducer });
