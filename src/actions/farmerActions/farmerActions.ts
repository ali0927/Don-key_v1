import { apiRequest } from "actions/apiActions";
import { AppThunk, CallBackorVal, IFarmerUser } from "interfaces";
import { action } from "typesafe-actions";

export const setFarmerDetail = (args: CallBackorVal<IFarmerUser>) => {
  return action("FARMER_DETAIL", args);
};

interface parmsId {
  id?: number;
}

export const getFarmerDetails = (param: parmsId): AppThunk => {
  return (dispatch, getState) => {
    dispatch(
      apiRequest({
        method: "GET",
        endpoint: `/api/v1/farmer${param && param.id ? "/" + param.id : ""}`,
        data: "",
        onDone: (res) => {
          dispatch(setFarmerDetail(res.data.data));
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
