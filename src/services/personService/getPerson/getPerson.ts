import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import AppError from '../../../common/errors/AppError';
import Person from '../../../database/models/Person';

const getPerson = async (id: number): Promise<Person> => {
  const person = await Person.findOne({ where: { id } });

  if (!person) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'Person does not exist!', {
      data: { personId: id },
    });
  }

  return person;
};

export default getPerson;
