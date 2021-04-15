import { ThunkAction } from "redux-thunk";

export type IFarmer = {
  rank: number;
  profit24: string;
  profit7: string;
  profitTotal: string;
  picture: string;
  id: number;
  name: string;
  poolAddress: string;
};
export interface IUser {
  walletAddress: string;
  GUID: string;
  uid: string;
  settings?: {
    farmer_strategy?: string | null;
    firstname?: string | null;
    middlename?: string | null;
    lastname?: string | null;
    birthdate?: string | null;
    city?: string | null;
    country?: string | null;
    address?: string | null;
    postalcode?: string | null;
    passportnum?: string | null;
    planned_investments?: string | null;
    exp_crypto?: string | null;
    exp_equities?: string | null;
    exp_leveraged?: string | null;
    farmer_knowledge?: string | null;
    farmer_purpose?: string | null;
    gender?: string | null;
    income_sources?: string | null;
    risk_limit?: string | null;
    streetNo?: string | null;
    birthsameascitizen?: boolean | null;
  };
}

export type CallBackorVal<T> = T | ((val: T) => T);

export type API_STATE = {
  requests: {
    [endpoint: string]: {
      method: string;
      endpoint: string;
      response?: any;
      error?: any;
      status: "PENDING" | "SUCCESS" | "ERROR";
    };
  };
};

export interface IStoreState {
  auth: {
    user: IUser | null;
    isLoggedIn: boolean;
  };
  api: API_STATE;
}

export type AppThunk = ThunkAction<void, IStoreState, unknown, any>;

export type ICurrency = {
  tokenIcon: string;
  tokenSymbol: string;
  apy_apyOneMonthSample: number;
  balance?: number;
};

export type ICurrencyWithAddress = { address: string } & ICurrency;

export type BuruRequest = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  data?: any;
};
