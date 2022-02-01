import { ActionType} from "typesafe-actions";
export * from "./auctionActions";

export type IAuctionActions = ActionType<typeof import("./auctionActions")>;