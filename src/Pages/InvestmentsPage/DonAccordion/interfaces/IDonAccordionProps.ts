import { IFarmerInter } from "interfaces";
import { IPoolAddress } from "Pages/InvestmentsPage/interfaces";

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
