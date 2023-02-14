import express from 'express';
import * as dotenv from 'dotenv';
import chalk from 'chalk';
import helmet from 'helmet';
import cors from 'cors';
import testRoutes from './services/testService/routes';

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
app.use((request, response) => {
  response.status(404).json('Route not found!');
});

export default app;
