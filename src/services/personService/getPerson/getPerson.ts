import Person from '../../../database/models/Person';

const getPerson = async (id: number): Promise<Person> => {
  const person = await Person.findOne({ where: { id } });

  if (!person) {
    throw new Error('Person not found!');
  }

  return person;
};

export default getPerson;
