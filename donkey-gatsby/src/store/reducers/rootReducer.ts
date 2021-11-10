import { combineReducers } from "redux";
import { authReducer, IAuthState } from "./authReducer";


export type IStoreState = {
    auth: IAuthState
}

export const rootReducer = combineReducers<IStoreState>({
    auth: authReducer
})