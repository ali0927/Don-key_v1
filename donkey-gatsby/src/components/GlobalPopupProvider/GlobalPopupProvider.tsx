import { InsurancePopup } from "components/InvestmentPopup/InsurancePopup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, IPopups } from "store/actions";
import { IStoreState } from "store/reducers/rootReducer";

const renderPopup = <T extends IPopups["type"]>(
  obj: IStoreState["popups"] | undefined,
  key: T,
  func: (arg: Extract<IPopups, { type: T }>) => React.ReactNode
) => {
  if (obj && obj[key]) {
    const PopupObject = obj[key];
    if (PopupObject) {
      return func(PopupObject as any);
    }
  }
  return null;
};


export const GlobalPopupProvider: React.FC = ({ children }) => {
  const popups = useSelector((state: IStoreState) => state.popups);
  const dispatch = useDispatch();

  return (
    <>
      {children}
      {renderPopup(popups, "INSURANCE_POPUP", (popupObj) => {
        return (
          <InsurancePopup
            value={popupObj.data.value}
            Insurance={popupObj.data.Insurance}
            open
            poolAddress={popupObj.data.poolAddress}
            poolChainId={popupObj.data.poolChainId}
            minAmountForInsurance={popupObj.data.minAmountForInsurance}
            onClose={() => {
              dispatch(closePopup("INSURANCE_POPUP"));
            }}
          />
        );
      })}
    </>
  );
};
