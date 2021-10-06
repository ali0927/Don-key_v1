import { IInvestorsAPIData } from "components/InvestorListTable/interfaces/IInvestors";

export interface IDataTableProps {
  investorsList: IInvestorsAPIData[];
  poolAddress: string;
  chainId: number;
  tokenPrice: string;
  pool: string;
}
