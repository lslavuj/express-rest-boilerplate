import childProcess from 'child_process';

import logger from '../src/common/utils/logger';

const setup = async (): Promise<void> => {
  console.log('\n\n');
  console.log('Jest Global Setup');
  console.log('\n');

  try {
    childProcess.execSync('docker start testDbContainer', { stdio: 'pipe' });

    console.info('Running migrations...');
    childProcess.execSync('npm run migration:revert && npm run migration:run', { stdio: 'pipe' });

    console.info('Running seeds...');
    childProcess.execSync('npm run seed', { stdio: 'pipe' });
  } catch (error) {
    logger.error('Unable to start test data storage!');
    process.exit(1);
  }
};

export default setup;
