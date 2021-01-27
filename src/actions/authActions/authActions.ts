import { USER_LOGIN, USER_LOGOUT } from "./authActionTypes";
import { action } from "typesafe-actions";
import { IUser, AppThunk } from "interfaces";
import { api } from "services/api";
import { waitFor } from "helpers/helpers";

export const doLogin = (user: IUser) => {
  return action(USER_LOGIN, { user });
};

export const doLogout = () => {
  return action(USER_LOGOUT);
};

export const doMetaMaskLogin = () => {
  return async () => {};
};

const stopRejection = async <T>(promise: Promise<T>) => {
  try {
    const res = await promise;
    return res;
  }catch(e){
    console.log(e);
    return null
  }
}


export const verifyAuthToken = ({
  onDone,
  onFail,
  token,
}: {
  onDone?: () => void;
  onFail?: () => void;
  token: string;
}): AppThunk => async (dispatch) => {
  try {
    const [res] = await Promise.all([stopRejection(api.post("/api/v1/verifyToken", { token })), waitFor(1000)]);
    if(!res){
      throw new Error("Api Error");
    }
    const response = res.data;
    dispatch(doLogin(response.user));

    onDone && onDone();
  } catch (e) {
    console.log(e);
    onFail && onFail();
  }
};
