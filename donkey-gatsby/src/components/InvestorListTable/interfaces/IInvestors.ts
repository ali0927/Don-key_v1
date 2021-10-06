export interface IInvestment {
  address: string;
  initialInvestment: string;
  initialInvestmentInUSD: string;
  claimableAmount: string;
  claimableAmountInUSD: string;
  profitLoss: string;
  profitLossInUSD: string;
  duration: string;
}

export interface IInvestorsAPIData {
  id: string;
  from_walletaddress: string;
  to_pooladdress: string;
  date_created: string;
}
