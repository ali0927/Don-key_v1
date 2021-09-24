import axios from "axios";
import { AuthToken } from "don-utils";

export const strapi = axios.create({
  baseURL: process.env.GATSBY_STRAPI_URL,
});

export const api = axios.create({
  baseURL: process.env.GATSBY_API_URL,
  validateStatus: (status) => status < 500 && status >= 200,
  transformRequest: [
    ...(axios.defaults.transformRequest as any),
    (data, headers) => {
      if(typeof window !== "undefined"){
        const token = localStorage.getItem(AuthToken);
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
      }
      return data;
    },
  ],
});
