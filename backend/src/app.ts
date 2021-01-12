import express from "express";
import morgan from "morgan";
import { Database } from "./database";
import { PORT } from "./env";


const app = express();


app.use(morgan("common"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



async function bootstrap() {
    await Database.connect();
    await app.listen(PORT)
    console.log("Server Listening on Port ", PORT)
}

bootstrap();