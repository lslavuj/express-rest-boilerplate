import childProcess from 'child_process';

import logger from '../src/common/utils/logger';
import AppDataSource from '../src/database/config';

const teardown = async (): Promise<void> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  await AppDataSource.dropDatabase();

  childProcess.execSync('docker stop testDbContainer');

  logger.info('All tests finished, dropping test database and stopping docker container!');
};

export default teardown;
