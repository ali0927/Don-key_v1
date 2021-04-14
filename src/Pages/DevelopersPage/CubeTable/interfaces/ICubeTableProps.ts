import { ICubeTable, IUserVottedCubes } from "../../interfaces";


export interface ICubeTableProps {
    cubes: ICubeTable[];
    uservottedcubes: IUserVottedCubes[];
    onVote: (vote: IUserVottedCubes) => void;
}