import dotenv from 'dotenv';
import { EnvConfig } from '../shared';

// #load env
dotenv.config();

const defaults: EnvConfig = {
  NODE_ENV: 'development',
  PORT: 3000,
  DATABASE_HOST: 'localhost',
  DATABASE_PORT: 5432,
  DATABASE_NAME: 'fpl_db',
  DATABASE_USER: 'postgres',
  DATABASE_PASSWORD: 'postgres',
  LOG_LEVEL: 'debug',
  JWT_SECRET: 'default_secret',
  GEMINI_API_KEY: '',
};

export const envConfig: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || defaults.NODE_ENV,
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : defaults.PORT,
  DATABASE_HOST: process.env.DATABASE_HOST || defaults.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : defaults.DATABASE_PORT,
  DATABASE_NAME: process.env.DATABASE_NAME || defaults.DATABASE_NAME,
  DATABASE_USER: process.env.DATABASE_USER || defaults.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || defaults.DATABASE_PASSWORD,
  LOG_LEVEL: process.env.LOG_LEVEL || defaults.LOG_LEVEL,
  JWT_SECRET: process.env.JWT_SECRET || defaults.JWT_SECRET,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || defaults.GEMINI_API_KEY,
};
