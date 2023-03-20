/* eslint-disable @typescript-eslint/ban-ts-comment */

import chalk from 'chalk';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

import errorHandler from './common/middlewares/ErrorHandler';
import personRoutes from './services/personService/routes';

const app = express();

const envConfig = dotenv.config();

if (envConfig.error) {
  console.log(chalk.red('Missing .env!'));
  process.exit(1);
}
app.use(helmet());
app.use(cors());

// routes
app.use('/api/v1', personRoutes);

// @ts-ignore
app.use((request, response) => {
  response.status(404).json('Route not found!');
});

app.use(errorHandler);

export default app;
