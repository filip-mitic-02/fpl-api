import 'reflect-metadata';
import express from 'express';

import { AppConfig } from './config/app.config';
import { envConfig } from './config/env.config';

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception: ', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection: ', reason);
});

const bootstrap = async () => {
  try {
    const app = express();

    const appConfig = new AppConfig(app);

    appConfig.configure();

    app.listen(envConfig.PORT);
  } catch {
    console.log('Server startup failed.');
    process.exit(1);
  }
};

bootstrap();
