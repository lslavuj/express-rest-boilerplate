import User from '../models/User';

import type { DataSource } from 'typeorm';
import type { Seeder } from 'typeorm-extension';

class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    const user = userRepository.create({
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      birthDate: new Date(),
    });

    await userRepository.save(user);
  }
}

export default UserSeeder;
