import { Application } from 'express';
import { dataSource } from './database.config';
import { setupMiddlewares } from './middlewares.config';
import { setupRoutes } from './routes.config';
import { errorHandler } from '../shared/middlewares';

export class AppConfig {
  constructor(private readonly app: Application) {}

  async configure(): Promise<void> {
    await dataSource.initialize();

    setupMiddlewares(this.app);

    setupRoutes(this.app);

    this.app.use(errorHandler);
  }
}
