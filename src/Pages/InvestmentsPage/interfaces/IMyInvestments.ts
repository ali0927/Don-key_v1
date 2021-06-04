
export interface IMyInvestments {
    name: string;
    picture: string;
    poolAddress: string;
    pool_version?: number;
    GUID: string;
    strategies: {strategyAddress: string}[];
}