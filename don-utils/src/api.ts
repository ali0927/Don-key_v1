import axios from "axios"
export const AuthToken = "DonAuthToken";
export const api = axios.create({
    baseURL:  "https://api.don-key.finance",
    transformRequest: [...axios.defaults.transformRequest as any, (data,headers) => {
      const token = localStorage.getItem(AuthToken)
      if(token){
        headers["Authorization"] = `Bearer ${token}`
      }
      return data
    }]
  });