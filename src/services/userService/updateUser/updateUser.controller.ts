import bodySchema from './bodySchema';
import pathSchema from './pathSchema';
import updateUser from './updateUser';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import parseBody from '../../../common/parsers/parseBody';
import parsePath from '../../../common/parsers/parsePath';

import type { NextFunction, Request, Response } from 'express';
import type { InferType } from 'yup';

const updateUserController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = await parsePath<InferType<typeof pathSchema>>(request, pathSchema);
    const userData = await parseBody<InferType<typeof bodySchema>>(request, bodySchema);

    const user = await updateUser(id, userData);

    response.status(HttpStatusCode.OK).json(user);
  } catch (error: unknown) {
    next(error);
  }
};

export default updateUserController;
