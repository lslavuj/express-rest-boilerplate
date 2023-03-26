import { pick } from 'lodash';

import User from '../../../database/models/User';

import type { UserCreateData } from './bodySchema';

type CreateUserOutput = Pick<User, 'id' | 'lastName' | 'birthDate' | 'email'>;

const createUser = async (userCreateData: UserCreateData): Promise<CreateUserOutput> => {
  const { firstName, lastName, birthDate, password, email } = userCreateData;

  const user = new User();

  user.firstName = firstName;
  user.lastName = lastName;
  user.birthDate = birthDate;
  user.email = email;
  user.password = password;

  await user.save();

  return pick(user, ['id', 'firstName', 'lastName', 'birthDate', 'email']);
};

export default createUser;
