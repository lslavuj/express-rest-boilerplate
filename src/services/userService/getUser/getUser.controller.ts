import getUser from './getUser';
import pathSchema from './pathSchema';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import parsePath from '../../../common/parsers/parsePath';

import type { NextFunction, Request, Response } from 'express';
import type { InferType } from 'yup';

const getUserController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = await parsePath<InferType<typeof pathSchema>>(request, pathSchema);

    const user = await getUser(id);

    response.status(HttpStatusCode.OK).json(user);
  } catch (error: unknown) {
    next(error);
  }
};

export default getUserController;
