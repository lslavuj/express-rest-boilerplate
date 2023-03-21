import updatePerson from './updatePerson';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';

import type { NextFunction, Request, Response } from 'express';

const updatePersonController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { body } = request;

    const person = await updatePerson();

    response.status(HttpStatusCode.OK).json({ ...body, ...person });
  } catch (error: unknown) {
    next(error);
  }
};

export default updatePersonController;
