import HttpStatusCode from '../common/enums/HttpStatusCode';
import logger from '../common/utils/logger';

import type { NextFunction, Request, Response } from 'express';

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction,
): Response => {
  logger.error(error);

  return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
};

export default errorHandler;
