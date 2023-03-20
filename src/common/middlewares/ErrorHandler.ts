import HttpStatusCode from '../enums/HttpStatusCode';
import logger from '../utils/logger';

import type { NextFunction, Request, Response } from 'express';

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response => {
  logger.error(error);

  return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
};

export default errorHandler;
