import Person from '../../../database/models/Person';

import type { PersonCreateData } from './bodySchema';

const createPerson = async (personCreateData: PersonCreateData): Promise<Person> => {
  const { firstName, lastName, birthDate } = personCreateData;

  const person = new Person();

  person.firstName = firstName;
  person.lastName = lastName;
  person.birthDate = birthDate;

  await person.save();

  return person;
};

export default createPerson;
