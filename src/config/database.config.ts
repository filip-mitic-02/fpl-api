import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';
import {envConfig} from './env.config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: envConfig.DATABASE_HOST,
  port: envConfig.DATABASE_PORT,
  username: envConfig.DATABASE_USER,
  password: envConfig.DATABASE_PASSWORD,
  database: envConfig.DATABASE_NAME,
  synchronize: false,
  logging: envConfig.NODE_ENV === 'development',
  entities: [path.join(__dirname, '../entities/*.{ts,js}')],
  migrations: [path.join(__dirname, '../migrations/*.{ts,js}')],
  migrationsTableName: 'migrations',
});

export { AppDataSource };