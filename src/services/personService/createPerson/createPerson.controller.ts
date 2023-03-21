import bodySchema from './bodySchema';
import createPerson from './createPerson';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import parseBody from '../../../common/parsers/parseBody';

import type { NextFunction, Request, Response } from 'express';
import type { InferType } from 'yup';

const createPersonController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const personData = await parseBody<InferType<typeof bodySchema>>(request, bodySchema);

    const person = await createPerson(personData);

    response.status(HttpStatusCode.CREATED).json(person);
  } catch (error: unknown) {
    next(error);
  }
};

export default createPersonController;
