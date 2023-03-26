import User from '../../../database/models/User';

import type { UserCreateData } from './bodySchema';

const createUser = async (userCreateData: UserCreateData): Promise<User> => {
  const { firstName, lastName, birthDate } = userCreateData;

  const user = new User();

  user.firstName = firstName;
  user.lastName = lastName;
  user.birthDate = birthDate;

  await user.save();

  return user;
};

export default createUser;
