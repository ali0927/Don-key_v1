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

export type ICurrency = {
	tokenIcon: string;
	tokenSymbol: string;
	apy_apyOneMonthSample: number;
};
export interface IToken extends ICurrency {
    vaultIcon: string;
    symbol: string;
  }
  