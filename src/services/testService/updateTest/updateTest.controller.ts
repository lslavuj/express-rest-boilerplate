/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextFunction, Request, Response } from 'express';

import updateTest from './updateTest';

const updateTestController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { body } = request;

    const test = await updateTest();

    response.status(200).json(test).end();
  } catch (error: unknown) {
    next(error);
  }
};

export default updateTestController;
