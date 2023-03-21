import getPerson from './getPerson';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';

import type { NextFunction, Request, Response } from 'express';

const getPersonController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const person = await getPerson();

    response.status(HttpStatusCode.OK).json({ person });
  } catch (error: unknown) {
    next(error);
  }
};

export default getPersonController;
