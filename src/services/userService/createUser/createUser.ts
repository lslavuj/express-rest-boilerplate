import { omit } from 'lodash';

import User from '../../../database/models/User';

import type { UserCreateData } from './bodySchema';

const createUser = async (userCreateData: UserCreateData): Promise<Omit<User, 'password'>> => {
  const { firstName, lastName, birthDate, password, email } = userCreateData;

  const user = new User();

  user.firstName = firstName;
  user.lastName = lastName;
  user.birthDate = birthDate;
  user.email = email;
  user.password = password;

  await user.save();

  return omit(user, ['password']);
};

export default createUser;
