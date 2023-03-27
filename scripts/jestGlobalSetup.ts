import childProcess from 'child_process';

import logger from '../src/common/utils/logger';

const setup = (): void => {
  logger.info('Running Jest Global Setup...');

  try {
    childProcess.execSync('docker start testDbContainer', { stdio: 'pipe' });

    logger.info('Running migrations...');
    childProcess.execSync('npm run migration:run', { stdio: 'pipe' });

    logger.info('Running seeds...');
    childProcess.execSync('npm run seed', { stdio: 'pipe' });
  } catch (error) {
    logger.error('Unable to start test data storage!');
    process.exit(1);
  }
};

export default setup;
