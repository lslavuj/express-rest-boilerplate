import childProcess from 'child_process';

const teardown = (): void => {
  childProcess.execSync('docker stop testDbContainer');

  console.log('All tests finished, shutting down test data storage!');
};

export default teardown;
