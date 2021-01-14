
import dotenv from "dotenv";
dotenv.config();
export const { PORT = 5000, DATABASE_NAME, DATABASE_HOST,
    DATABASE_USER, DATABASE_PASS } = process.env;