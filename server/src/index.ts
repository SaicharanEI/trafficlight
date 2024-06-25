import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import { trafficRoute } from "./routes/trafficRoute";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/error";
import cors from "cors"
const app: Express = express();

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});

app.use(express.json());
app.use(cors())
export const prismaCilent = new PrismaClient({
    log:['query']
})

app.use("/api/v1", trafficRoute);
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
})