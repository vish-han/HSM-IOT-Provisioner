import express, { Request, Response } from "express";
import { connectDatabase } from "./config/databse";
import { logger } from "./utils/logger";

export const app = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Up and running")
})

const startServer = async () => {

    try {
        await connectDatabase()
        app.listen(port, () => {
            console.log(`Server is running at ${port}`)
        })
    }
    catch (error) {
        logger.error("Error in starting server", error)
    }
}

startServer()

