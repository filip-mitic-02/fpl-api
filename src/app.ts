import 'reflect-metadata';
import express from 'express';

import { AppConfig } from './config/app.config';
import { envConfig } from './config/env.config';

import './config/processHandlers.config';

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
