import { makeUseAxios } from "axios-hooks";
import { strapi } from "strapi";

export const useStrapi = makeUseAxios({
    axios: strapi,
    cache: false
});