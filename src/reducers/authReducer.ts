import { AuthActions, USER_LOGIN, USER_LOGOUT } from "actions/authActions";
import { IStoreState } from "interfaces";
import { Reducer } from "redux";

const INITIAL_STATE = {
  isLoggedIn: false,
  user: null,
};

export const authReducer: Reducer<IStoreState["auth"], AuthActions> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case USER_LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user,
      };
    }

    case USER_LOGOUT: {
      return INITIAL_STATE;
    }

    default: {
      return state;
    }
  }
};
