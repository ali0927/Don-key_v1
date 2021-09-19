import { makeUseAxios } from "axios-hooks";
import { api } from "strapi";


export const useAxios = makeUseAxios({
  axios: api,
  defaultOptions: {useCache: false}
});
