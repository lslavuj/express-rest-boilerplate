import deletePerson from './deletePerson';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';

import type { NextFunction, Request, Response } from 'express';

const deletePersonController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const person = await deletePerson();

    response.status(HttpStatusCode.OK).json(person);
  } catch (error: unknown) {
    next(error);
  }
};

export default deletePersonController;
