import express, { Request, Response, NextFunction } from 'express';
import morgan from "morgan";
// import cors from 'cors';

import noteRoutes from "./src/routes/notesRoutes"
import createHttpError, { isHttpError } from 'http-errors';

const app = express();

//Morgan
app.use(morgan("dev"));

//cors
// app.use(cors);

//accept Json bodies
app.use(express.json());

app.use("/api/notes", noteRoutes)

//Middleware
//Catch route error
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Endpoint not found"));
})
//Catch error
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMsg = "An unknow error occurred";
    let statusCode = 500;
    //check error
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMsg = error.message;
    }
    res.status(statusCode).json({ error: errorMsg });
})

export default app;

