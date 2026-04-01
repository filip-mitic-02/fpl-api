import 'reflect-metadata';
import express from "express";

import { setupRoutes,setupMiddlewares, setupContainer, envConfig, AppDataSource } from "./config";


const app = express();

setupContainer();

setupMiddlewares(app);
setupRoutes(app);


AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');

    app.listen(envConfig.PORT, () => {
      console.log(`Server running on http://localhost:${envConfig.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });
