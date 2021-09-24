import { IFarmerInter } from "interfaces";
import { IPoolAddress } from "components/InvestmentPage/interfaces";

export interface IDonAccordionProps {
  investments: IFarmerInter[];
  poolAddresses: IPoolAddress;
  refresh: boolean;
  donPrice: { isReady: boolean; price: string };
  onWithDrawClick: (
    farmerName: string,
    poolAddress: string,
    pool_version: number
  ) => () => void;
}
