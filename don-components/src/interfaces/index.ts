
export type ICurrency = {
    tokenIcon: string;
    tokenSymbol: string;
    apy_apyOneMonthSample: number;
    balance?: number;
};

export type ICurrencyWithAddress = { address: string } & ICurrency;

export interface IToken extends ICurrency {
    vaultIcon: string;
    symbol: string;
    tokenAddress: string;
}
