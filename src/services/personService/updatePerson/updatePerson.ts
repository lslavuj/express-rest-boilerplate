import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import AppError from '../../../common/errors/AppError';
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
    throw new AppError(HttpStatusCode.NOT_FOUND, 'Person does not exist!', {
      data: { personId: id },
    });
  }

  const updatedPerson = await getPerson(id);

  return updatedPerson;
};

export default updatePerson;
