import bodySchema from './bodySchema';
import login from './login';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import parseBody from '../../../common/parsers/parseBody';
import createLoginSession from '../loginSession/createLoginSession';

import type { NextFunction, Request, Response } from 'express';
import type { InferType } from 'yup';

const loginController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const loginData = await parseBody<InferType<typeof bodySchema>>(request, bodySchema);

    const token = await login(loginData);

    await createLoginSession(request, token);

    response.status(HttpStatusCode.OK).json(token);
  } catch (error: unknown) {
    next(error);
  }
};

export default loginController;
