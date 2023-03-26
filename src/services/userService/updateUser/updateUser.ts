import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import AppError from '../../../common/errors/AppError';
import AppDataSource from '../../../database/config';
import User from '../../../database/models/User';
import getUser from '../getUser/getUser';

import type { UserUpdateData } from './bodySchema';

const updateUser = async (id: number, userUpdateData: UserUpdateData): Promise<any> => {
  const user = await AppDataSource.createQueryBuilder()
    .update(User)
    .set(userUpdateData)
    .where('id = :id', { id })
    .execute();

  if (!user.affected) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'User does not exist!', {
      data: { userId: id },
    });
  }

  const updatedUser = await getUser(id);

  return updatedUser;
};

export default updateUser;
