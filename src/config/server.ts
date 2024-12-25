import express, { Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { errorHandler, requestLogger, checkToken } from '../middleware';
import { createMessageRoutes, createAuthRoutes } from '../routes';
import { MessageService } from '../services';
import { DatabaseCollections } from '../database';
/**
 * Creates and configures an Express application.
 *
 * This function sets up the Express application with the following:
 * - Serves static files from the `public` directory.
 * - Parses incoming JSON requests.
 * - Uses a custom request logger middleware.
 * - Uses a custom error handler middleware (should be the last middleware).
 *
 * @returns {Application} The configured Express application instance.
 */
export function createApp(
  messageService: MessageService,
  collections: DatabaseCollections
): Application {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cookieParser()); // Add cookie parser middleware
  app.use(requestLogger);

  // Serve static files
  app.use(express.static(path.join(__dirname, '../../public')));

  // Routes
  app.use('/api/messages', checkToken, createMessageRoutes(messageService));
  app.use('/api/auth', createAuthRoutes(collections)); // Pass collections to createAuthRoutes

  // Middleware to check for token on the root route
  app.use(checkToken);

  // Serve the main HTML file for the root route
  app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  // Error handling - should be last
  app.use(errorHandler);

  return app;
}
