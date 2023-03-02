import "reflect-metadata";

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes/index.routes';

import swaggerFile from './swagger.json';

import "./database";

import './shared/containers';

const app = express();

app.use(express.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);

app.get('/', (req, res) => {
  res.send('<h1>Home</h1>')
})

app.listen(3333, () => {
  console.log('Server is running');
});