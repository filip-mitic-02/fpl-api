import express from 'express';
import { authRouter, exampleRouter, userRouter } from '../routes';

export const setupRoutes = (app: express.Application) => {
  // #example
  app.use('/api/v1/example', exampleRouter);

  // #authentication
  app.use('/api/v1/auth', authRouter);

  // #user
  app.use('/api/v1/user', userRouter);

  // #health
  app.get('/health', (req, res) => {
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
    });
  });
};
