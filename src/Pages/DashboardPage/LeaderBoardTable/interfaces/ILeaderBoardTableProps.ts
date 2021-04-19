import { IFarmer } from "interfaces";
import { ILeader } from "./ILeader";

export interface ILeaderBoardTableProps {
    leaders: ILeader[];
    isReady?: boolean;
}