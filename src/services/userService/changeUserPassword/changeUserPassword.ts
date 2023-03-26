import bcrypt from 'bcryptjs';

import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import AppError from '../../../common/errors/AppError';
import toBcryptHash from '../../../common/utils/toBcryptHash';
import AppDataSource from '../../../database/config';
import User from '../../../database/models/User';
import getUser from '../getUser/getUser';

import type { ChangeUserPasswordData } from './bodySchema';

const changeUserPassword = async (
  id: number,
  changeUserPasswordData: ChangeUserPasswordData,
): Promise<void> => {
  const { oldPassword, newPassword } = changeUserPasswordData;

  const user = await getUser(id);

  const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

  if (!isOldPasswordValid) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'Old password not valid!');
  }

  const arePasswordsTheSame = await bcrypt.compare(newPassword, user.password);

  if (arePasswordsTheSame) {
    throw new AppError(HttpStatusCode.BAD_REQUEST, 'Old and new password can not be the same!');
  }

  const hashedNewPassword = await toBcryptHash(newPassword);

  const updatedUser = await AppDataSource.createQueryBuilder()
    .update(User)
    .set({ password: hashedNewPassword })
    .where('id = :id', { id })
    .execute();

  if (!updatedUser.affected) {
    throw new AppError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'User password not updated', {
      data: { userId: id },
    });
  }
};

export default changeUserPassword;
