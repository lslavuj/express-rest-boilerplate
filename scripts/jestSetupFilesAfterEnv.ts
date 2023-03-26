import AppDataSource from '../src/database/config';

global.beforeAll(async () => {
  await AppDataSource.initialize();
});

global.afterAll(async () => {
  await AppDataSource.destroy();
});
