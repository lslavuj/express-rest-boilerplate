import express from 'express';
import * as dotenv from 'dotenv';
import chalk from 'chalk';
import testRoutes from './services/testService/routes';

const app = express();

const envConfig = dotenv.config();

if (envConfig.error) {
  console.log(chalk.red('Missing .env!'));
  process.exit(1);
}

// routes
app.use('/api/v1', testRoutes);

export default app;
