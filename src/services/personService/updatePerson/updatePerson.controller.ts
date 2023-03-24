import bodySchema from './bodySchema';
import pathSchema from './pathSchema';
import updatePerson from './updatePerson';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import parseBody from '../../../common/parsers/parseBody';
import parsePath from '../../../common/parsers/parsePath';

import type { NextFunction, Request, Response } from 'express';
import type { InferType } from 'yup';

const updatePersonController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = await parsePath<InferType<typeof pathSchema>>(request, pathSchema);
    const personData = await parseBody<InferType<typeof bodySchema>>(request, bodySchema);

    const person = await updatePerson(id, personData);

    response.status(HttpStatusCode.OK).json(person);
  } catch (error: unknown) {
    next(error);
  }
};

export default updatePersonController;
