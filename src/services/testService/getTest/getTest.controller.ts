/* eslint-disable @typescript-eslint/ban-ts-comment */
import getTest from './getTest';

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

    response.status(200).json(test).end();
  } catch (error: unknown) {
    next(error);
  }
};

export default getTestController;
