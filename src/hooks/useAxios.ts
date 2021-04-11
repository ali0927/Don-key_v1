import { makeUseAxios } from "axios-hooks";
import { api } from "don-utils";

export const useAxios = makeUseAxios({
  axios: api,
});
