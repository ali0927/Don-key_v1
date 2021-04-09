import { makeUseAxios } from "axios-hooks";
import { api } from "services/api";

export const useAxios = makeUseAxios({
  axios: api,
});
