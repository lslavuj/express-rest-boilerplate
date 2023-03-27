import jwt from 'jsonwebtoken';

import HttpStatusCode from '../../../../common/enums/HttpStatusCode';
import AppError from '../../../../common/errors/AppError';
import AppDataSource from '../../../../database/config';
import LoginSession from '../../../../database/models/LoginSession';
import getLoginSession from '../../loginSession/getLoginSession';

import type Context from '../../../../common/types/Context';
import type { TokenPayload } from '../../../../middlewares/authMiddleware';

const logoutFromOneDevice = async (context: Context, token: string): Promise<void> => {
  const {
    user: { id },
  } = context;

  const { tokenUuid } = jwt.decode(token) as TokenPayload;

  await getLoginSession(tokenUuid);

  const logout = await AppDataSource.createQueryBuilder()
    .update(LoginSession)
    .set({ loggedOutAt: new Date() })
    .where('tokenUuid = :tokenUuid', { tokenUuid })
    .execute();

  if (!logout.affected) {
    throw new AppError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error logging out user!', {
      data: { userId: id },
    });
  }
};

export default logoutFromOneDevice;
