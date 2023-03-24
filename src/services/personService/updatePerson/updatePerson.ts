import AppDataSource from '../../../database/config';
import Person from '../../../database/models/Person';
import getPerson from '../getPerson/getPerson';

import type { PersonUpdateData } from './bodySchema';

const updatePerson = async (id: number, personUpdateData: PersonUpdateData): Promise<any> => {
  const person = await AppDataSource.createQueryBuilder()
    .update(Person)
    .set(personUpdateData)
    .where('id = :id', { id: 1 })
    .execute();

  if (!person.affected) {
    throw new Error('Person not found!');
  }

  const updatedPerson = await getPerson(id);

  return updatedPerson;
};

export default updatePerson;
