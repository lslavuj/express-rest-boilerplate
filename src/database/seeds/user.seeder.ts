import User from '../models/User';

import type { UserType } from '../models/User';
import type { DataSource } from 'typeorm';
import type { Seeder } from 'typeorm-extension';

export const initialUser: UserType = {
  id: 1,
  firstName: 'Test',
  lastName: 'User',
  birthDate: new Date('1990-06-10'),
  email: 'test@user.com',
  password: 'Test12345!',
};

class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const userExists = await userRepository.findOne({ where: { id: 1 } });

    if (!userExists) {
      const user = userRepository.create(initialUser);

      await userRepository.save(user);
    }
  }
}

export default UserSeeder;
