import express from 'express';
import { exampleRouter } from '../routes';

export const setupRoutes = (app: express.Application) => {
  // #example
  app.use('/api/v1/example', exampleRouter);

  // #health
  app.get('/health', (req, res) => {
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
    });
  });
};
