import { Reducer } from "redux";
import { IAuthActions } from "store/actions";

export type IAuthState = {
    token?: string;
    last_updated?: number;
}

export const authReducer: Reducer<IAuthState, IAuthActions> = (state = {}, action) => {
    switch(action.type){
        case "SET_AUTH_TOKEN": {
            return {
                token: action.payload.token,
                last_updated: Date.now()
            }
        }
        case "LOGOUT_USER": {
            return {}
        }
    }
    return state;
}