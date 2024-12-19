import express from 'express';
import path from 'path';
import { errorHandler } from '../middleware/errorHandler';
import { requestLogger } from '../middleware/requestLogger';

/**
 * Creates and configures an Express application.
 *
 * This function sets up the Express application with the following:
 * - Serves static files from the `public` directory.
 * - Parses incoming JSON requests.
 * - Uses a custom request logger middleware.
 * - Uses a custom error handler middleware (should be the last middleware).
 *
 * @returns {express.Application} The configured Express application instance.
 */
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
