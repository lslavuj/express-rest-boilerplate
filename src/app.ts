import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

import errorHandler from './middlewares/errorHandler';
import loginRoutes from './services/authService/routes';
import userRoutes from './services/userService/routes';

const app = express();

const envConfig = dotenv.config();

if (envConfig.error) {
  throw new Error('Missing .env!');
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', loginRoutes);

app.use((_request, response) => {
  response.status(404).json('Route not found!');
});

// error handling middleware
app.use(errorHandler);

export default app;
