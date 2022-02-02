import {action} from "typesafe-actions";

export const setAuthToken = (token: string) => {
    return action("SET_AUTH_TOKEN", {token})
}

