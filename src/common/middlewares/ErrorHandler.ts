/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { Request, Response, NextFunction } from 'express';

import HttpStatusCode from '../enums/HttpStatusCode';
import logger from '../utils/logger';

const errorHandler = (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction,
): Response => {
  logger.error(error);

  response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send('Error');
};

export default errorHandler;
