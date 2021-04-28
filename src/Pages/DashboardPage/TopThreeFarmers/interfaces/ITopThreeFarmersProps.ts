import { IFarmer } from "interfaces";

export interface ITopThreeFarmerProps {
    leaders: IFarmer[];
    isReady?: boolean;
}