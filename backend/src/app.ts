import express from "express";
import morgan from "morgan";
import { Database } from "./database";
import { PORT } from "./env";
import { apiRoutes } from "./routes/apiRoutes";


const app = express();


app.use(morgan("common"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/api/v1", apiRoutes);



async function bootstrap() {
    
    await Database.connect();
    await app.listen(PORT)
    console.log("Server Listening on Port ", PORT)
}

bootstrap();