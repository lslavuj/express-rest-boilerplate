import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import getEnvironmentVariables from './getEnvironmentVariables';

export interface CreateTokenData {
  userId: number;
}

const generateUserAccessToken = (createTokenData: CreateTokenData, rememberMe: boolean): string => {
  const { JWT_SECRET_KEY } = getEnvironmentVariables('JWT_SECRET_KEY');

  const tokenPayload = { ...createTokenData, tokenUuid: uuidv4() };

  if (rememberMe) {
    return jwt.sign(tokenPayload, JWT_SECRET_KEY, {
      expiresIn: '30d',
    });
  }

  return jwt.sign(tokenPayload, JWT_SECRET_KEY, {
    expiresIn: '1d',
  });
};

export default generateUserAccessToken;
