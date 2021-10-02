import { IFarmerInter } from "interfaces";
import { IPoolAddress } from "components/InvestmentPage/interfaces";

export interface IDonAccordionProps {
  accordionId: string;
  investments: IFarmerInter[];
  poolAddresses: IPoolAddress;
  refresh: boolean;
  investedAmountInfo?: React.ReactNode;
  profitInfo?: React.ReactNode;
  lastCycleInfo?: React.ReactNode;
  donRewardInfo?: React.ReactNode;
  showLastCycle?: boolean;
  donPrice: { isReady: boolean; price: string };
  onWithDrawClick: (
    farmerName: string,
    poolAddress: string,
    pool_version: number
  ) => () => void;
}
