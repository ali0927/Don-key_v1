import produce from "immer";
import { Reducer } from "redux";
import { IPopupActions, IPopups } from "store/actions";

export type IPopupState = {
  [k in IPopups["type"]]?: IPopups;
};

export const popupReducer: Reducer<IPopupState, IPopupActions> = (
  state = {},
  actions
) => {
  switch (actions.type) {
    case "OPEN_POPUP": {
      return produce(state, (draft) => {
        draft[actions.payload.type] = actions.payload;
      });
    }
    case "CLOSE_POPUP": {
      return produce(state, (draft) => {
        delete draft[actions.payload.type];
      });
    }
  }
  return state;

};
