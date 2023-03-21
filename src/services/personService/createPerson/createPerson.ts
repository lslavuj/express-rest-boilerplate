import Person from '../../../database/models/Person';

import type { PersonCreateData } from './bodySchema';

const createPerson = async (personCreateData: PersonCreateData): Promise<Person> => {
  const { firstName, lastName, birthDate } = personCreateData;

  const user = new Person();

  user.firstName = firstName;
  user.lastName = lastName;
  user.birthDate = birthDate;

  const createdUser = await user.save();

  return createdUser;
};

export default createPerson;
