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
    };
}

export type AppThunk = ThunkAction<void, IStoreState, unknown, any>;

export type ICurrency = {
    tokenIcon: string;
    tokenSymbol: string;
    apy_apyOneMonthSample: number;
    balance?: number;
};

export type ICurrencyWithAddress = {address: string} & ICurrency;

export interface IToken extends ICurrency {
    vaultIcon: string;
    symbol: string;
    tokenAddress: string;
}

export type IProtocol = {
    id: number;
    name: string;
    website: string;
    toolbarImageURL: string;
    showOnToolbar: "1" | "0";
    edgeColor: string;
    description: string;
    vertexImageURL: string;
    base64: string;
};

export type IProtocolCell = {
    protocolId: string,
    protocol: string,
    lastProtocol?: string,
    x: number
    y: number;
    w: number;
    h: number;
    isAction: boolean,
    buru: boolean,
    vertex: any | null,
}

export type IActionCell = {
    vertex: any | null,
    prevProtocolCellId: string,
    nextProtocolCellId: string,
    imageUrl: string;
    y: number,
    isAction: boolean,
    x: number,
    label: string;
}

export type IStrategy = {
    id?: string;
    protocolCells: IProtocolCell[];
    actionCells: IActionCell[]
}