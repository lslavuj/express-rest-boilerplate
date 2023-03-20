/* eslint-disable @typescript-eslint/ban-ts-comment */
import deleteTest from './deletePerson';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';

import type { NextFunction, Request, Response } from 'express';

const deleteTestController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { body } = request;

    const test = await deleteTest();

    response.status(HttpStatusCode.OK).json(test);
  } catch (error: unknown) {
    next(error);
  }
};

export default deleteTestController;
