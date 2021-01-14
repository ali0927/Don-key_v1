
import dotenv from "dotenv";
dotenv.config();
export const { PORT = 5000, JWT_SECRET = "defaultsecret" } = process.env;