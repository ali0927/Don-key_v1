import { ActionType } from "typesafe-actions";

export * from "./farmerActions";

export type IFarmerActions = ActionType<typeof import("./farmerActions")>;
