import express from 'express';

export const setupMiddlewares = (app: express.Application) => {
  // JSON middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Error handling middleware
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal server error',
    });
  });
};