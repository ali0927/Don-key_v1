import { IStaking } from "components/StackingLPTokens/interfaces";

export interface IStakingCardProps {
  networkData: {
    chainId: number;
    networkName: string;
    tokenSymbol: string;
    buttons: {label: string; imageSrc: string;}[];
  } & IStaking;
  buyLink: string;
}
