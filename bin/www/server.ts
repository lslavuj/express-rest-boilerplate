import chalk from 'chalk';
import app from '../../src/app';

const normalizePort = (val: number | string): number | string | boolean => {
  const port: number = typeof val === 'string' ? parseInt(val, 10) : val;

  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || '3000');

app.listen(port, () => {
  console.log(
    chalk.green(`Express server listening to port ${port}, stage: ${process.env.NODE_ENV}!`),
  );
});
