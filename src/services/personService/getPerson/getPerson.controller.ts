/* eslint-disable @typescript-eslint/ban-ts-comment */
import getTest from './getPerson';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';

import type { NextFunction, Request, Response } from 'express';

const getTestController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { body } = request;

    const test = await getTest();

    response.status(HttpStatusCode.OK).json(test);
  } catch (error: unknown) {
    next(error);
  }
};

export default getTestController;
