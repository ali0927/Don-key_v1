import axios from "axios";


export const strapi = axios.create({
    baseURL: 'https://don-strapi-g36tg.ondigitalocean.app'
})