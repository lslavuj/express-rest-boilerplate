import jwt from 'jsonwebtoken';

import HttpStatusCode from '../../../../common/enums/HttpStatusCode';
import AppError from '../../../../common/errors/AppError';
import AppDataSource from '../../../../database/config';
import LoginSession from '../../../../database/models/LoginSession';

import type { TokenPayload } from '../../../../middlewares/authMiddleware';

const logoutFromAllDevices = async (userId: number, excludeToken?: string): Promise<void> => {
  let excludedTokenUuid: string | null = null;

  if (excludeToken) {
    const { tokenUuid } = jwt.decode(excludeToken) as TokenPayload;
    excludedTokenUuid = tokenUuid;
  }

  const update = await AppDataSource.createQueryBuilder()
    .update(LoginSession)
    .set({ loggedOutAt: new Date() })
    .where(
      `(loggedOutAt > :now OR loggedOutAt IS NULL) AND (tokenExpirationDate > :now OR tokenExpirationDate IS NULL) AND tokenUuid != :excludedTokenUuid AND userId = :userId`,
      {
        now: new Date(),
        excludedTokenUuid,
        userId,
      },
    )
    .execute();

  if (!update.affected) {
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      'Error logging out user from all devices!',
      {
        data: { userId },
      },
    );
  }
};

export default logoutFromAllDevices;
