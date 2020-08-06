import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import routes from '@shared/infra/http/routes/index';
import '@shared/container';
import createConnection from '@shared/infra/typeorm/index';

import globalErrorsHandlerMiddleware from '@shared/infra/http/middlewares/GlobalErrorsHandlerMiddleware';
import multerConfig from '@config/upload';
import rateLimiter from './middlewares/RateLimiterMiddleware';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(multerConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use(globalErrorsHandlerMiddleware);
const server = app.listen(3333, () => {
  console.log('Server started on port 3333');
});

export { app, server };
