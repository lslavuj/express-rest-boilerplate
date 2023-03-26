import bcrypt from 'bcryptjs';

import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import AppError from '../../../common/errors/AppError';
import generateUserAccessToken from '../../../common/utils/generateUserAccessToken';
import AppDataSource from '../../../database/config';
import User from '../../../database/models/User';

import type { LoginData } from './bodySchema';
import type { CreateTokenData } from '../../../common/utils/generateUserAccessToken';

const login = async (loginData: LoginData): Promise<string> => {
  const { email, password, rememberMe } = loginData;

  const unauthorizedMessage = 'Username or password not correct!';

  const user = await AppDataSource.getRepository(User)
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .select(['user.id', 'user.password'])
    .addSelect('user.password')
    .getOne();

  if (!user) {
    throw new AppError(HttpStatusCode.UNAUTHORIZED, unauthorizedMessage);
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    throw new AppError(HttpStatusCode.UNAUTHORIZED, unauthorizedMessage);
  }

  const { id: userId } = user;

  const tokenData: CreateTokenData = {
    userId,
  };

  return generateUserAccessToken(tokenData, rememberMe || false);
};

export default login;
