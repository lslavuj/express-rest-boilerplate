import toBcryptHash from '../../../common/utils/toBcryptHash';
import User from '../../../database/models/User';

import type { UserCreateData } from './bodySchema';

const createUser = async (userCreateData: UserCreateData): Promise<User> => {
  const { firstName, lastName, birthDate, password, email } = userCreateData;

  const user = new User();

  user.firstName = firstName;
  user.lastName = lastName;
  user.birthDate = birthDate;
  user.email = email;
  user.password = await toBcryptHash(password);

  await user.save();

  return user;
};

export default createUser;
