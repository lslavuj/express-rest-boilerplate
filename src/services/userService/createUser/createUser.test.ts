import { omit } from 'lodash';

import createUser from './createUser';

import type { UserCreateData } from './bodySchema';

describe('createUser function tests', () => {
  test('should create and return user', async () => {
    const mockUserData: UserCreateData = {
      firstName: 'randomFirstName',
      lastName: 'randomLastName',
      birthDate: new Date(),
      email: 'random@email.com',
      password: 'randomPassword',
    };

    const createdUser = await createUser(mockUserData);

    expect(omit(createdUser, ['id', 'birthDate'])).toStrictEqual({
      firstName: 'randomFirstName',
      lastName: 'randomLastName',
      email: 'random@email.com',
    });
  });
});
