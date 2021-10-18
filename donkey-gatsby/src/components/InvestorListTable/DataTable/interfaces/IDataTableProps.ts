import { IInvestorsFromGraph } from "components/InvestorListTable/interfaces/IInvestors";

export interface IDataTableProps {
  investorsList: IInvestorsFromGraph[];
  poolAddress: string;
  chainId: number;
  tokenPrice: string;
  pool: string;
  poolVersion: number;
}
