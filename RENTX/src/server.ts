import "reflect-metadata";

import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import swaggerUi from 'swagger-ui-express';
import { router } from './routes/index.routes';

import swaggerFile from './swagger.json';

import "./database";

import './shared/containers';
import { AppError } from './errors/AppError';

const app = express();

app.use(express.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message
    }) 
  }

  return res.status(500).json({
    status: "error",
    message: `internal server error - ${err.message}` 
  })

})

app.listen(3333, () => {
  console.log('Server is running');
});
