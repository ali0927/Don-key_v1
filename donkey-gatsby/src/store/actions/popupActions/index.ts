import { ActionType } from "typesafe-actions";

export * from "./popupActions";

export type IPopupActions = ActionType<typeof import("./popupActions")>;