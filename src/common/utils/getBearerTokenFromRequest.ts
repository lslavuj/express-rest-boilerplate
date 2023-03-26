import HttpStatusCode from '../enums/HttpStatusCode';
import AppError from '../errors/AppError';

import type { Request } from 'express';

const getBearerTokenFromRequest = (request: Request): string => {
  const authorizationHeader = request.header('Authorization');

  if (!authorizationHeader) {
    throw new AppError(HttpStatusCode.UNAUTHORIZED, 'Missing Authentication Token!');
  }

  if (authorizationHeader.split(' ').length === 2) {
    const tokenType = authorizationHeader.split(' ')[0];

    if (tokenType !== 'Bearer') {
      throw new AppError(HttpStatusCode.BAD_REQUEST, 'Invalid token type!');
    }
  } else {
    throw new AppError(HttpStatusCode.BAD_REQUEST, 'Invalid authorization header format!');
  }

  return authorizationHeader.split(' ')[1];
};

export default getBearerTokenFromRequest;
