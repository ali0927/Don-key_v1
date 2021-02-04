import { USER_LOGIN, USER_LOGOUT } from "./authActionTypes";
import { action } from "typesafe-actions";
import { IUser } from "interfaces";

export const doLogin = (user: IUser) => {
  return action(USER_LOGIN, { user });
};

export const doLogout = () => {
  return action(USER_LOGOUT);
};

export const doMetaMaskLogin = () => {
  return async () => {};
};

