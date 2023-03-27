import { omit } from 'lodash';

import updateUser from './updateUser';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import AppError from '../../../common/errors/AppError';
import AppDataSource from '../../../database/config';
import User from '../../../database/models/User';

describe('updateUser function tests', () => {
  afterEach(async () => {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(User)
      .where('email = :email', { email: 'mockEmail' })
      .execute();
  });

  test('should update user properties', async () => {
    const user = new User();

    user.firstName = 'mockFirstName';
    user.lastName = 'mockLastName';
    user.birthDate = new Date();
    user.email = 'mockEmail';
    user.password = 'mockPassword';

    const createdUser = await user.save();

    const updateUserData = {
      firstName: 'random',
      lastName: 'random',
      birthDate: new Date('2000-06-10'),
      email: 'random@user.com',
    };

    const updatedUser = await updateUser(createdUser.id, updateUserData);

    expect(user.id).toBeDefined();
    expect(omit(updatedUser, ['id'])).toStrictEqual({
      ...updateUserData,
      birthDate: '2000-06-10',
      password: undefined,
    });
  });

  test('should throw error if user does not exist', async () => {
    try {
      await updateUser(12345, {
        firstName: 'random',
        lastName: 'random',
        birthDate: new Date('1990-06-10'),
        email: 'random@user.com',
      });

      expect('Unexpected error').toBe(false);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError<unknown>).message).toBe('User does not exist!');
      expect((error as AppError<unknown>).statusCode).toBe(HttpStatusCode.NOT_FOUND);
      expect((error as AppError<unknown>).data).toStrictEqual({ userId: 12345 });
    }
  });
});
