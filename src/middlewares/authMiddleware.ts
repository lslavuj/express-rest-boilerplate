import jwt from 'jsonwebtoken';

import HttpStatusCode from '../common/enums/HttpStatusCode';
import AppError from '../common/errors/AppError';
import getBearerTokenFromRequest from '../common/utils/getBearerTokenFromRequest';
import getEnvironmentVariables from '../common/utils/getEnvironmentVariables';
import getLoginSession from '../services/authService/loginSession/getLoginSession';
import getUser from '../services/userService/getUser/getUser';

import type { CreateTokenData } from '../common/utils/generateUserAccessToken';
import type { Request, Response, NextFunction } from 'express';

export interface TokenPayload extends CreateTokenData, jwt.JwtPayload {
  tokenUuid: string;
}

const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const invalidTokenMessage = 'Invalid Authentication Token!';

    const token = getBearerTokenFromRequest(request);

    const { JWT_SECRET_KEY } = getEnvironmentVariables('JWT_SECRET_KEY');

    let tokenPayload: TokenPayload | null = null;

    try {
      tokenPayload = jwt.verify(token, JWT_SECRET_KEY) as TokenPayload;
    } catch (error: unknown) {
      throw new AppError(HttpStatusCode.UNAUTHORIZED, invalidTokenMessage);
    }

    const { userId, tokenUuid } = tokenPayload;

    const user = await getUser(userId);

    if (!user) {
      throw new AppError(HttpStatusCode.UNAUTHORIZED, invalidTokenMessage);
    }

    request.context = {
      ...request.context,
      user,
    };

    const loginSession = await getLoginSession({ ...request.context }, tokenUuid);
    if (loginSession.loggedOutAt && new Date() > loginSession.loggedOutAt) {
      throw new AppError(
        HttpStatusCode.UNAUTHORIZED,
        'User is logged out from this device. Login and try again!',
      );
    }

    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default authMiddleware;
