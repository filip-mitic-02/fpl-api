import { logger } from './shared/utils';

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception.', { message: error.message, trace: error.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection.', { reason: String(reason) });
});
