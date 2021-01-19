import { USER_LOGIN, USER_LOGOUT } from "./authActionTypes";

export const doLogin = (user) => {
  return { type: USER_LOGIN, payload: { user } };
};

export const doLogout = () => {
  return { type: USER_LOGOUT };
};
