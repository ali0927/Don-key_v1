import axios from "axios";


export const strapi = axios.create({
    baseURL: 'https://cms.don-key.finance'
})