import { ThunkAction } from "redux-thunk";

export type IFarmer = {
  poolAddress: string;
  picture: string;
  name: string;
  description: string;
  pool_version: number;
  profit24hours: string | null;
  twitter?: string | null;
  risk?: string | null;
  riskDescription?: string | null;
  telegram?: string | null;
  profit7days: string | null;
  profit: string | null;
  GUID: string;
  descriptionTitle: string | null;
  apy?: string;
  network?: {
    chainId: number;
    networkName: string;
    networkSymbol: string;
  }
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
  pool_version: number;
  GUID: string;
  investors?: null | number;
  status: "not_signed_up" | "under_review" | "active" | "inactive";
  name: string;
  last_signin: string;
  description: string;
  descriptionTitle: string | null
  risk?:string;
  riskDescription?: string;
  profit24hours?: string;
  profit7days?: string;
  profit?: string;
  strategy?: {
    apy: string;
    network?: {
      chainId: number;
      networkName: string;
      networkSymbol: string;
    }
    description: string;
    strategyImage: string;
  }
  is_active: boolean;
  walletAddress: string;
  username?: string | null;
  telegram?: string | null;
  twitter?: string | null;
  strategies?: IStrategy[];
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
  entranceFees?: string | null;
  exitFees?: string | null;
  gasLimit?: string | null;
  swapInFees?: string | null;
  swapOutFees?: string | null;
  network?: {
    chainId: number;
    networkName: string;
    networkSymbol: string;
  }
  withdrawGasLimit?: string | null;
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
    hasStaked: null | true | false;
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

export type IStrapiImage = {
  id: number;
  name: string;

  size: number;
  url: string;
};
export type IStrapiRisk = {
  id: number;
  Title: string;
  Description: string;
  image: IStrapiImage;
};

export type IStrapiStrategy = {
  id: 3;
  name: string;
  description: string;
  strategyAddress: null;
  apy: string;
  created_at:string;
  risk: number;
  token: number;
  farmer: number;
  network: number;
  active: boolean;
  swapInFees: string | null;
  swapOutFees: string | null;
  entranceFees: string | null;
  exitFees: string | null;
  strategyImage: IStrapiImage;
};
export type IStrapiToken = {
  id: number;
  name: string;
  symbol: string;
  status: "commingsoon" | "active" | "disabled" | "hidden"
  tokenAddress: string;
  network: {
    id: number;
    name: string;
    symbol: string;
    chainId: number;
  };
  image: IStrapiImage;
  risks: IStrapiRisk[];
  strategies: IStrapiStrategy[];
};
