import chalk from 'chalk';

import normalizePort from './normalizePort';
import app from '../../src/app';

const port = normalizePort(process.env.PORT || '3000');

app.listen(port, () => {
  console.log(
    chalk.green(`Express server listening on PORT: ${port}, STAGE: ${process.env.NODE_ENV}!`),
  );
});
