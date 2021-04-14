
import dotenv from "dotenv";
dotenv.config();
export const { PORT = 5000, JWT_SECRET = "defaultsecret", API_SECRET, DOMAIN="http://localhost:5000" } = process.env;