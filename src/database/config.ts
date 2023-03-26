import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import Environment from '../common/enums/Environment';

import type { DataSourceOptions } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';

dotenv.config();

const {
  DATABASE_HOST,
  DATABASE,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
  NODE_ENV,
  TEST_DATABASE_PORT,
} = process.env;

const config: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: DATABASE_HOST,
  port: NODE_ENV === Environment.Test ? Number(TEST_DATABASE_PORT) : Number(DATABASE_PORT),
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE,
  entities: ['./src/database/models/**/*.ts'],
  migrations: ['./src/database/migrations/**/*.ts'],
  seeds: ['./src/database/seeds/**/*.ts'],
  synchronize: true,
  logging: false,
};

const AppDataSource = new DataSource(config);

export default AppDataSource;
