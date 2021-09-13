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

export interface INetwork {
  name: string;
  chainId: number;
  symbol: string;
}

export interface IFarmerInter {
  name: string
  description: string;
  farmerImage: {
    url: string;
  }
  status: "active" | "hidden" | "comingsoon";
  guid: string;
  farmerfee: number;
  performancefee: number;
  last_cycle: string;
  active: boolean;
  twitter: string;
  telegram: string;
  poolAddress: string;
  poolVersion: number;
  network: INetwork;
  strategies:IStrategy[];
}

export type IStrategy = {
  risk: {
    Title: string;
    image:  {
      url: string;
    }
  }
  created_at: string;
  id: string;
  info: string;
  entranceFees?: string | null;
  exitFees?: string | null;
  swapInFees?: string | null;
  swapOutFees?: string | null;
  name: string;
  apy: string;
  description: string;
  strategyImage: {
    url: string;
  };
  token: {
    boostApy: boolean;
  };
};

export type CallBackorVal<T> = T | ((val: T) => T);



export interface IStoreState {
  auth: {
    user: IUser | null;
    isLoggedIn: boolean;
    hasStaked: null | true | false;
  };
  farmer: IFarmerInter | null;
}

export type AppThunk = ThunkAction<void, IStoreState, unknown, any>;



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
  id: number;
  name: string;
  description: string;
  strategyAddress: null;
  apy: string;
  created_at: string;
  risk: number;
  token: number;
  farmer: { poolAddress: string };
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
  boostApy: boolean;
  status: "commingsoon" | "active" | "disabled" | "hidden"
  tokenAddress: string;
  maxApy: string;
  slug: string;
  network: {
    id: number;
    name: string;
    slug: string;
    symbol: string;
    chainId: number;
    type: string;
    destination: string;
  };
  image: IStrapiImage;
  RiskStrategy: { strategy: IStrapiStrategy }[];
};
