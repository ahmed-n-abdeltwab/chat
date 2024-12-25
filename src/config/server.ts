import express, { Application } from 'express';
import Loki from 'lokijs';
import path from 'path';
import cookieParser from 'cookie-parser';
import { errorHandler, requestLogger, checkToken } from '../middleware';
import { MessageDb, initializeCollections } from '../database';
import { MessageService } from '../services';
import { createMessageRoutes, createAuthRoutes } from '../routes';
import { dbConfig } from '../config'; // Import dbConfig

let messageService: MessageService;

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
export function createApp(): Application {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cookieParser()); // Add cookie parser middleware
  app.use(requestLogger);

  // Serve static files
  app.use(express.static(path.join(__dirname, '../../public')));

  // Middleware to check for token on protected routes
  app.use('/api/messages', checkToken);
  app.use('/', checkToken);

  // Initialize database and collections
  const db = new Loki(dbConfig.filename, dbConfig.options);
  const collections = initializeCollections(db);

  // Initialize services
  const messageDb = new MessageDb();
  messageService = new MessageService(messageDb);

  // Routes
  app.use('/api/messages', createMessageRoutes(messageService));
  app.use('/api/auth', createAuthRoutes()); // Add auth routes

  // Serve the main HTML file for the root route
  app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  // Error handling - should be last
  app.use(errorHandler);

  return app;
}

/**
 * Gets the initialized message service.
 *
 * @returns {MessageService} The message service instance.
 * @throws {Error} If the message service has not been initialized.
 */
export function getMessageService(): MessageService {
  if (!messageService) {
    throw new Error('MessageService has not been initialized');
  }
  return messageService;
}
