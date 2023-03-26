import bodySchema from './bodySchema';
import changeUserPassword from './changeUserPassword';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import parseBody from '../../../common/parsers/parseBody';

import type { NextFunction, Request, Response } from 'express';
import type { InferType } from 'yup';

const updateUserController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      context: {
        user: { id },
      },
    } = request;

    const userData = await parseBody<InferType<typeof bodySchema>>(request, bodySchema);

    await changeUserPassword(id, userData);

    response.status(HttpStatusCode.OK).json();
  } catch (error: unknown) {
    next(error);
  }
};

export default updateUserController;
