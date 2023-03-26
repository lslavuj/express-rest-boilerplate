import User from '../../../database/models/User';

const deleteUser = async (id: number): Promise<void> => {
  await User.delete(id);
};

export default deleteUser;
