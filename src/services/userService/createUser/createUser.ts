import { pick } from 'lodash';

import toBcryptHash from '../../../common/utils/toBcryptHash';
import User from '../../../database/models/User';

import type { UserCreateData } from './bodySchema';

const createUser = async (userCreateData: UserCreateData): Promise<unknown> => {
  const { firstName, lastName, birthDate, password, email } = userCreateData;

  const user = new User();

  user.firstName = firstName;
  user.lastName = lastName;
  user.birthDate = birthDate;
  user.email = email;
  user.password = await toBcryptHash(password);

  await user.save();

  return pick(user, ['id', 'lastName', 'birthDate', 'email']);
};

export default createUser;
