
export interface IMyInvestments {
    name: string;
    picture: string;
    poolAddress: string;
    strategies: {strategyAddress: string}[];
}