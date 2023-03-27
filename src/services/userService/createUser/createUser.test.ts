import { omit } from 'lodash';

import createUser from './createUser';
import AppDataSource from '../../../database/config';
import User from '../../../database/models/User';

import type { UserCreateData } from './bodySchema';

afterEach(async () => {
  await AppDataSource.createQueryBuilder()
    .delete()
    .from(User)
    .where('email = :email', { email: 'andom@email.com' })
    .execute();
});

describe('createUser function tests', () => {
  test('should create and return user', async () => {
    const mockBirthDate = new Date('1990-06-10');

    const mockUserData: UserCreateData = {
      firstName: 'randomFirstName',
      lastName: 'randomLastName',
      birthDate: mockBirthDate,
      email: 'random@email.com',
      password: 'randomPassword',
    };

    const createdUser = await createUser(mockUserData);

    expect(createdUser.id).toBeDefined();
    expect(omit(createdUser, ['id'])).toStrictEqual(omit(mockUserData, ['password']));
  });
});
