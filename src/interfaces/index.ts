import { ThunkAction } from "redux-thunk";

export type IFarmer = {
  poolAddress: string;
  picture: string;
  name: string;
  description: string;
  profit24hours: string | null;
  twitter?: string | null;
  telegram?: string | null;
  profit7days: string | null;
  profit: string | null;
  GUID: string;
  descriptionTitle: string | null;
  apy?: string;
  strategyImage?: string;
  investors?: null | number;
  status:
    | "not_signed_up"
    | "under_review"
    | "active"
    | "inactive"
    | "comingsoon";
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

export interface IFarmerInter {
  poolAddress: string;
  picture: string;
  GUID: string;
  investors?: null | number;
  status: "not_signed_up" | "under_review" | "active" | "inactive";
  name: string;
  last_signin: string;
  description: string;
  is_active: boolean;
  walletAddress: string;
  username?: string | null;
  telegram?: string | null;
  twitter?: string | null;
  strategies?: {apy: string}[]
}
export type IStrategy = {
  createdAt: string;
  is_active: boolean;
  lastRan: string | null;
  updatedAt: string;
  strategyAddress: string | null;
  strategyDescription?: string | null;
  status: string | null;
  profit: string | null;
  strategyName: string;
  apy: string;
  id: number;
};

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

type ITransactions = {
  [id: string]: {
    status: "PENDING" | "SUCCESS" | "ERROR";
    message: string;
  };
};

export interface IStoreState {
  auth: {
    user: IUser | null;
    isLoggedIn: boolean;
  };
  api: API_STATE;
  farmer: IFarmerInter | null;
  transactions: ITransactions;
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
