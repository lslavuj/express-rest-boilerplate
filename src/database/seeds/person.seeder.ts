import Person from '../models/Person';

import type { DataSource } from 'typeorm';
import type { Seeder } from 'typeorm-extension';

class PersonSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const personRepository = dataSource.getRepository(Person);

    const person = personRepository.create({
      id: 1,
      firstName: 'Test',
      lastName: 'Person',
      birthDate: new Date(),
    });

    await personRepository.save(person);
  }
}

export default PersonSeeder;
