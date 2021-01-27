import { ThunkAction } from "redux-thunk";

export interface IUser {
    walletAddress: string;
    GUID: string;
    uid: string;
}

export interface IStoreState {
    auth: {
        user: IUser | null;
        isLoggedIn: boolean;
    }
}

export type AppThunk =ThunkAction<
  void,
  IStoreState,
  unknown,
  any
>