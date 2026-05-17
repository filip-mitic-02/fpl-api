import express from 'express';
import { responseHandler } from '../shared/middlewares';

export const setupMiddlewares = (app: express.Application) => {
  // JSON middleware
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  // Response middleware
  app.use(responseHandler);

  // Error handling middleware
};
