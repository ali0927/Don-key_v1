import { IFarmer } from "interfaces";

export interface ILeaderBoardSearchProps {
    suggestions: IFarmer[]; 
    lastSearch: IFarmer[];
}