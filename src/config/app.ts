import express from 'express';
import path from 'path';
import { errorHandler } from '../middleware/errorHandler';
import { requestLogger } from '../middleware/requestLogger';

export function createApp(): express.Application {
  const app = express();

  // Static files
  app.use(express.static(path.join(__dirname, '../../public')));

  // Middleware
  app.use(express.json());
  app.use(requestLogger);

  // Error handling - should be last
  app.use(errorHandler);

  return app;
}
