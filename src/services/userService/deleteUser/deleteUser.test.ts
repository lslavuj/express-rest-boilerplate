import deleteUser from './deleteUser';
import AppDataSource from '../../../database/config';
import User from '../../../database/models/User';

describe('deleteUser function tests', () => {
  test('should delete a user', async () => {
    const user = new User();

    user.firstName = 'mockFirstName';
    user.lastName = 'mockLastName';
    user.birthDate = new Date();
    user.email = 'mockEmail';
    user.password = 'mockPassword';

    const createdUser = await user.save();

    await expect(deleteUser(createdUser.id)).resolves.not.toThrow();

    // checks if user is really deleted from database
    const deletedUser = await AppDataSource.getRepository(User)
      .createQueryBuilder()
      .where({ id: createdUser.id })
      .getOne();

    expect(deletedUser).toBe(null);
  });

  test('should not throw error if trying to delete user that does not exist', async () => {
    await expect(deleteUser(12345)).resolves.not.toThrow();
  });
});
