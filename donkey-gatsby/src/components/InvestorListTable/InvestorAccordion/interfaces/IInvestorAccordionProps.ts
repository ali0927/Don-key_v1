import {   IInvestorsFromGraph } from "components/InvestorListTable/interfaces/IInvestors";


export interface IInvestorAccordionProps {
    investorsList: IInvestorsFromGraph[];
    poolAddress: string;
    chainId: number;
    tokenPrice: string;
    pool: string;
    poolVersion: number;
}