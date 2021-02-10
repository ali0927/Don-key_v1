import axios from "axios";


export const api = axios.create({
    baseURL: "https://api.by.finance",
    headers: {
        "X-Api-Secret": "supersecret"
    }
});

