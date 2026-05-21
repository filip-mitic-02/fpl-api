import express from 'express';

export const setupMiddlewares = (app: express.Application) => {
  // JSON middleware
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
};
