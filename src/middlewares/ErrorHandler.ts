import { TypeORMError } from 'typeorm';
import { ValidationError } from 'yup';

import HttpStatusCode from '../common/enums/HttpStatusCode';
import AppError from '../common/errors/AppError';
import logger from '../common/utils/logger';

import type { NextFunction, Request, Response } from 'express';

const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  _next: NextFunction,
): Response => {
  logger.error(error);

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof TypeORMError) {
    return response
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Database Error!' });
  }

  if (error instanceof ValidationError) {
    let { message: errorMessage } = error;

    if (error.errors.length > 1) {
      errorMessage = `${error.errors.join(', ')}!`;
      errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
    }
    return response.status(HttpStatusCode.BAD_REQUEST).json({ message: errorMessage });
  }

  return response
    .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .json({ message: 'Unhandled Internal Server Error!' });
};

export default errorHandler;
