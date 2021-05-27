
export interface IMyInvestments {
    name: string;
    picture: string;
    poolAddress: string;
    GUID: string;
    strategies: {strategyAddress: string}[];
}