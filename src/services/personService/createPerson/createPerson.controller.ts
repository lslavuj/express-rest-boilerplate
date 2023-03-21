import createPerson from './createPerson';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';

import type { NextFunction, Request, Response } from 'express';

const createPersonController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { body } = request;

    const person = await createPerson();

    response.status(HttpStatusCode.CREATED).json({ ...body, ...person });
  } catch (error: unknown) {
    next(error);
  }
};

export default createPersonController;
