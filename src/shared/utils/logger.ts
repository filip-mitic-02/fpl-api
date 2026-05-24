import winston from 'winston';
import { envConfig } from '../../config';

const level = envConfig.NODE_ENV === 'development' ? 'debug' : 'http';
const format =
  envConfig.NODE_ENV === 'development'
    ? winston.format.combine(winston.format.colorize(), winston.format.simple())
    : winston.format.combine(winston.format.timestamp(), winston.format.json());

export const logger = winston.createLogger({
  level,
  format,
  transports: [new winston.transports.Console()],
});
