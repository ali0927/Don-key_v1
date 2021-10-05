import {  IInvestorsAPIData } from "components/InvestorListTable/interfaces/IInvestors";


export interface IInvestorAccordionProps {
    investorsList: IInvestorsAPIData[];
    poolAddress: string;
    chainId: number;
    tokenPrice: string;
    pool: string;
}