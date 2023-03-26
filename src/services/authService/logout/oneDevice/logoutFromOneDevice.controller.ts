import logoutFromOneDevice from './logoutFromOneDevice';
import HttpStatusCode from '../../../../common/enums/HttpStatusCode';
import getBearerTokenFromRequest from '../../../../common/utils/getBearerTokenFromRequest';

import type { NextFunction, Request, Response } from 'express';

const logoutFromOneDeviceController = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { context } = request;

    await logoutFromOneDevice(context, getBearerTokenFromRequest(request));

    response.status(HttpStatusCode.OK).json();
  } catch (error: unknown) {
    next(error);
  }
};

export default logoutFromOneDeviceController;
