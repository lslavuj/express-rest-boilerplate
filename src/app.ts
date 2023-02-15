/* eslint-disable @typescript-eslint/ban-ts-comment */

import express from 'express';
import * as dotenv from 'dotenv';
import chalk from 'chalk';
import helmet from 'helmet';
import cors from 'cors';

import testRoutes from './services/testService/routes';
import errorHandler from './common/middlewares/ErrorHandler';

const app = express();

const envConfig = dotenv.config();

if (envConfig.error) {
  console.log(chalk.red('Missing .env!'));
  process.exit(1);
}
app.use(helmet());
app.use(cors());

// routes
app.use('/api/v1', testRoutes);

// @ts-ignore
app.use((request, response) => {
  response.status(404).json('Route not found!');
});

app.use(errorHandler);

export default app;
