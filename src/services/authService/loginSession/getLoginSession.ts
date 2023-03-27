import HttpStatusCode from '../../../common/enums/HttpStatusCode';
import AppError from '../../../common/errors/AppError';
import AppDataSource from '../../../database/config';
import LoginSession from '../../../database/models/LoginSession';

const getLoginSession = async (tokenUuid: string): Promise<LoginSession> => {
  const loginSession = await AppDataSource.getRepository(LoginSession).findOne({
    where: { tokenUuid },
  });

  if (!loginSession) {
    throw new AppError(HttpStatusCode.UNAUTHORIZED, 'Login session not found!');
  }

  return loginSession;
};

export default getLoginSession;
