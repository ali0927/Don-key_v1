import { api } from "don-utils";
import { AppThunk, IFarmerInter } from "interfaces";
import { action } from "typesafe-actions";

export const setFarmerDetail = (args: IFarmerInter) => {
  return action("FARMER_DETAIL", args);
};

export const updateFarmerDetails = ({
  name,
  description,
  picture,
}: {
  name?: string;
  description?: string;
  picture?: File | null;
}): AppThunk => {
  return async (dispatch) => {
    const formdata = new FormData();
    if (name) {
      formdata.append("name", name);
    }
    if (description) {
      formdata.append("description", description);
    }
    if (picture) {
      formdata.append("picture", picture);
    }

    const res = await api.put(`/api/v2/farmer/`, formdata);

    dispatch(setFarmerDetail(res.data.data));
  };
};
