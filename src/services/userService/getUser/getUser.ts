import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import AppError from '../../../common/errors/AppError';
import User from '../../../database/models/User';

const getUser = async (id: number): Promise<User> => {
  const user = await User.findOne({ where: { id } });

  if (!user) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'User does not exist!', {
      data: { userId: id },
    });
  }

  return user;
};

export default getUser;
