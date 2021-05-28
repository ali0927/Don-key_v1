import axios from "axios";
export const AuthToken = "DonAuthToken";

const baseURL = process.env.REACT_APP_API_URL || 'https://api.don-key.finance';

export const api = axios.create({
  baseURL: baseURL,
  transformRequest: [
    ...(axios.defaults.transformRequest as any),
    (data, headers) => {
      const token = localStorage.getItem(AuthToken);
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      return data;
    },
  ],
});
