import chalk from 'chalk';

import normalizePort from './normalizePort';
import app from '../../src/app';
import AppDataSource from '../../src/database/config';

const port = normalizePort(process.env.PORT || '3000');

app.listen(port, async () => {
  console.log(
    chalk.green(`
     ################################################
      #  Server listening on PORT: ${port}, STAGE: ${process.env.NODE_ENV}
     ################################################
    `),
  );
  try {
    await AppDataSource.initialize();
    console.log(
      chalk.green(`
     ################################################
      #  New Data Source initialized!
     ################################################
    `),
    );
  } catch (error: unknown) {
    console.log(error);
    process.exit(1);
  }
});
