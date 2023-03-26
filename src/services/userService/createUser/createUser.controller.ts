import bodySchema from './bodySchema';
import createUser from './createUser';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import parseBody from '../../../common/parsers/parseBody';

import type { NextFunction, Request, Response } from 'express';
import type { InferType } from 'yup';

const createUserController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userData = await parseBody<InferType<typeof bodySchema>>(request, bodySchema);

    const user = await createUser(userData);

    response.status(HttpStatusCode.CREATED).json(user);
  } catch (error: unknown) {
    next(error);
  }
};

export default createUserController;
