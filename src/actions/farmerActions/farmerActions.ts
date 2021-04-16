import { apiRequest } from "actions/apiActions";
import { AppThunk, CallBackorVal, IFarmerUser } from "interfaces";
import { action } from "typesafe-actions";

export const setFarmerDetail = (args: CallBackorVal<IFarmerUser>) => {
  return action("FARMER_DETAIL", args);
};

interface parmsId {
  id?: number | string;
}

export const getFarmerDetails = (param: parmsId): AppThunk => {
  return (dispatch, getState) => {
    dispatch(
      apiRequest({
        method: "GET",
        endpoint: `/api/v1/farmer${param && param.id ? "/" + param.id : ""}`,
        data: "",
        onDone: (res) => {
          if (
            res.data.data !== undefined &&
            res.data.data !== null &&
            res.data.data.poolAddress !== undefined &&
            res.data.data.poolAddress === null
          ) {
            window.location.href = "/dashboard/farmer/signup";
          } else {
            dispatch(setFarmerDetail(res.data.data));
          }
        },
        onFail: (res) => {
          if (res.status === 404 || res.status === 401) {
            window.location.href = "/dashboard/farmer/signup";
          }
        },
      })
    );
  };
};

interface updateFarmerInter {
  name?: string;
  description?: string;
}
export const updateFarmerDetails = (
  farmerInfo: updateFarmerInter
): AppThunk => {
  return (dispatch) => {
    dispatch(
      apiRequest({
        method: "PUT",
        endpoint: `/api/v1/farmer`,
        data: farmerInfo,
        onDone: (res) => {
          dispatch(setFarmerDetail(res.data.data));
        },
        onFail: (res) => {
          if (res.status === 404 || res.status === 401) {
          }
        },
      })
    );
  };
};

interface strategyArr {
  strategyInfo?: any;
}

export const addStrategyDetails = (strategyInfo: strategyArr): AppThunk => {
  return (dispatch) => {
    dispatch(
      apiRequest({
        method: "POST",
        endpoint: `/api/v1/strategy`,
        data: strategyInfo,
        onDone: (res) => {
          dispatch(getFarmerDetails({ id: "me" }));
        },
        onFail: (res) => {
          if (res.status === 404 || res.status === 401) {
          }
        },
      })
    );
  };
};
