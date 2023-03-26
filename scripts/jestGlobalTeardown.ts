import childProcess from 'child_process';

const teardown = async (): Promise<void> => {
  childProcess.exec('docker stop testDbContainer');

  console.log('All tests finished, shutting down test data storage!');
};

export default teardown;
