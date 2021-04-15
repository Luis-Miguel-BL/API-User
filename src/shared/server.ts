/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import { QueryFailedError } from 'typeorm';

import AppError from './errors/AppError';

import routes from './infra/routes';

const APP_PORT = process.env.APP_PORT || 3105;

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.use(errors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.error(err);
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else if (err instanceof QueryFailedError) {
    return response.status(500).json({
      status: 'Query failed error',
      message: `Unexpected error: ${err.message}`,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(APP_PORT, () => {
  console.log(`▶️ Server started on port ${APP_PORT} !`);
});
