import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

dotenv.config();

const { DATABASE_HOST, DATABASE, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } = process.env;

const AppDataSource = new DataSource({
  type: 'mysql',
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE,
  entities: ['./src/database/models/**/*.ts'],
  migrations: ['./src/database/migrations/**/*.ts'],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
