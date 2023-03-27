import { omit } from 'lodash';

import getUser from './getUser';
import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import AppError from '../../../common/errors/AppError';
import { initialUser } from '../../../database/seeds/user.seeder';

describe('getUser function tests', () => {
  test('should get a user', async () => {
    const user = await getUser(initialUser.id);

    expect(omit(user, ['password'])).toStrictEqual(
      omit({ ...initialUser, birthDate: '1990-06-10' }, ['password']),
    );
  });

  test('should throw error ih user does not exist', async () => {
    try {
      await getUser(12345);

      expect('Unexpected error').toBe(false);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError<unknown>).message).toBe('User does not exist!');
      expect((error as AppError<unknown>).statusCode).toBe(HttpStatusCode.NOT_FOUND);
      expect((error as AppError<unknown>).data).toStrictEqual({ userId: 12345 });
    }
  });
});
