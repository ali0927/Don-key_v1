import { IInvestment } from "components/InvestorListTable/interfaces/IInvestors";

export interface IDataTableRowProps {
  investment: IInvestment;
  chainId: number;
  poolAddress: string;
  poolVersion: number;
}
