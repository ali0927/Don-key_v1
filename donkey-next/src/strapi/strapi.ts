import axios from "axios";

export const strapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
});

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    validateStatus: (status) => status < 500 && status >= 200,
  });