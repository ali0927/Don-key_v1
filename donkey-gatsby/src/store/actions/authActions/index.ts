import { ActionType} from "typesafe-actions";
export * from "./authActions";

export type IAuthActions = ActionType<typeof import("./authActions")>;