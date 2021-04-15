import { AuthActions } from "actions/authActions";
import { IFarmerActions } from "actions/farmerActions";
import produce from "immer";
import { IStoreState } from "interfaces";
import { Reducer } from "redux";

const INITIAL_STATE = {
  user: null,
};

export const farmerReducer: Reducer<IStoreState["farmer"], IFarmerActions> = (
  state = null,
  action
) => {
  switch (action.type) {
    case "FARMER_DETAIL": {
      const farmer = action.payload;

      return {
        ...state,
        user: farmer,
      };
    }
    default: {
      return state;
    }
  }
};
