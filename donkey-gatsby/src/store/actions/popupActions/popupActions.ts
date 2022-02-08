import { IInsurance } from "interfaces";
import { action } from "typesafe-actions";

export type IInsurancePopup = {
  type: "INSURANCE_POPUP";
  data: { value: string; poolAddress: string; poolChainId: number; Insurance: IInsurance[]; minAmountForInsurance: number };
};

export type IPopups = IInsurancePopup | { type: "ACCELERATED_APY_POPUP" };

export const openPopup = (popupObject: IPopups) => {
  return action("OPEN_POPUP", popupObject);
};

export const closePopup = (type: IPopups["type"]) => {
  return action("CLOSE_POPUP", {
    type,
  });
};
