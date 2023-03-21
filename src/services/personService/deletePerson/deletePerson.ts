import Person from '../../../database/models/Person';

const deletePerson = async (id: number): Promise<void> => {
  await Person.delete(id);
};

export default deletePerson;
