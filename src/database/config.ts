import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import type { DataSourceOptions } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';

dotenv.config();

const { DATABASE_HOST, DATABASE, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } = process.env;

const config: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
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
