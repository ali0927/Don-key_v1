import { Thunk } from "store/types";
import {action} from "typesafe-actions";
import Web3 from "web3";

export const setAuthToken = (token: string) => {
    return action("SET_AUTH_TOKEN", {token})
}

