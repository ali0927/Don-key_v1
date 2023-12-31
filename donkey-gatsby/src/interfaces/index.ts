import { ThunkAction } from "redux-thunk";
import { IAuthState } from "store/reducers/authReducer";
import { IPopupState } from "store/reducers/popupReducer";

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
  };
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
  tokenSymbol: string;
}
export type IInsurance = {
  percent: string;
  protocol: {
    name: string;
    productId: number;
    icon: {
      url: string;
    };
    network: INetwork;
  };
  token: IStrapiToken | null;
};

export type IInsuranceProps = {
  hasInsurance?: boolean | null;
  Insurance?: IInsurance[];
  minAmountForInsurance?: number | null;
};
export interface IFarmerInter extends IInsuranceProps {
  name: string;
  description: string;
  graphUrl: string;
  farmerImage: {
    url: string;
  };
  slug: string;
  status: "active" | "hidden" | "comingsoon";
  guid: string;
  farmerfee: number;
  performancefee: number;
  last_cycle: string;
  active: boolean;
  twitter: string;
  hideInvestButton: boolean | null;
  impermanentLoss: boolean | null;
  telegram: string;
  poolAddress: string;
  poolVersion: number;
  oldPoolVersion: number;
  oldPoolAddress: string;
  network: INetwork;
  strategies: IStrategy[];
  Zone: {
    id: number;
    strapi_component: "component.klima-tokens";
    klima: string;
  }[];
}

export type IStrategy = {
  risk: {
    Title: string;
    image: {
      url: string;
    };
  };
  blacklist: {
    address: string;
  }[];
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
    image: {
      url: string;
    };
  };
};

export type IStrategyPool = {
  poolAddress: string;
  version: number;
  status: "active" | "deprecated";
};

export type CallBackorVal<T> = T | ((val: T) => T);

export type StakeType = "binance" | "ethereum" | "binancenew" | "ethereumnew";

export type ISupportedLP = {
  lpAddress: string;
  symbol: string;
  withdrawAmount?: string;
  lockedAmount?: string;
  price: string;
  strategyName: string;
  strategyImage: string;
  tokenImage: string;
  minCommission: number;

};

export type IAuction = {
  address: string;
  startTime: number;
  endTime: number;
  initialized: boolean;
  tenure: number;
  loanTokenAddress: string;
  overDuePenalty: string;
  maxDebtMap: {
    [TierNumber: number]: string;
  };
  supportedLps: ISupportedLP[];
};

export type IAuctionSuccessState = {
  status: "FETCH_SUCCESS" | "FETCH_BALANCE_SUCCESS";
  currentAuction: IAuction | null;
  auctionState: IAuction[];
  nextAuction: IAuction | null;
  firstAuction: IAuction;
  lastAuction: IAuction;
};

export type ILoan = {
  status: "unpaid" | "paid" | "recovered";
  lpAddress: string;
  lendedAmount: string;
  auctionAddress: string;
  borrowedAmount: string;
  commission: string;
  commissionPercent: string;
  totalAmountTobePaid: string;
  penalty?: string;
  settlementTime: number;
};

export type IBid = {
  auctionAddress: string;
  lpAddress: string;
  lendedAmount: string;
  estimatedBorrowAmount: string;
  borrowedAmount: string;
  // debtRatio: string;
  commission: string;
  commissionPercent: string;
  participationTime: string;
  status: "rejected" | "pending" | "won" | "claimed";
};

export type IPrevWinners = {
  auctionAddress: string;
  announcementDate: string;
  winners: {
    userAddress: string;
    borrowAmount: string;
    commissionpercent: string;
    lpToken: string;
    lendedAmount: string;
    auctionAddress: string;
  }[];
};

export type IStoreState = {
  auth: IAuthState;
  popups: IPopupState;

  auctions: {
    auctionInfo:
      | { status: "INITIAL" | "FETCHING" | "FETCH_FAILED" }
      | IAuctionSuccessState;
    userBids: {
      status: "INITIAL" | "FETCHING" | "FETCH_FAILED" | "FETCH_SUCCESS";
      data: IBid[];
    };
    loans: {
      status: "INITIAL" | "FETCHING" | "FETCH_SUCCESS" | "FETCH_FAILED";
      data: ILoan[];
    };
    prevAuctions: {
      status: "INITIAL" | "FETCHING" | "FETCH_SUCCESS" | "FETCH_FAILED";
      data: IPrevWinners[];
    };
  };
};

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
  subtitle: string;
  description: string;
  boostApy: boolean;
  status: "commingsoon" | "active" | "disabled" | "hidden";
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

export type IStrapiSuggestion = {
  id: string;
  title: string;
  description: string;
  nickName: string;
  telegram: string;
  address: string;
  apy: number;
  riskword: string;
  votes: any;
  risk: any;
  network: any;
  status: string;
  created_at: string;
  customer: any;
  comments: any;
}
