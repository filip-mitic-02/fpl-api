import 'reflect-metadata';
import path from 'path';

import { DataSource } from 'typeorm';
import { envConfig } from './env.config';

export const dataSource = new DataSource({
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
});
