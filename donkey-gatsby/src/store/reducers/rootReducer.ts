import { combineReducers } from "redux";
import { authReducer, IAuthState } from "./authReducer";
import { IPopupState, popupReducer } from "./popupReducer";

export type IStoreState = {
  auth: IAuthState;
  popups: IPopupState;
};

export const rootReducer = combineReducers<IStoreState>({
  auth: authReducer,
  popups: popupReducer,
});
