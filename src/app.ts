import * as dotenv from 'dotenv';
import chalk from 'chalk';
import express from 'express';

const app = express();

dotenv.config();

const {
  env: { PORT = 3000 },
} = process;

app.listen(PORT, () => {
  console.log(chalk.green(`Express server listening to port ${PORT}!`));
});
