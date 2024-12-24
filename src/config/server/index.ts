import express, { Application } from 'express';
import path from 'path';
import { errorHandler } from '../../middleware/error/errorHandler';
import { requestLogger } from '../../middleware/requestLogger';
import { MessageDb } from '../../database/messageDb';
import { MessageService } from '../../services/messageService';
import { createMessageRoutes } from '../../routes/messageRoutes';

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

  // Static files
  app.use(express.static(path.join(__dirname, '../public')));

  // Middleware
  app.use(express.json());
  app.use(requestLogger);

  // Initialize services
  const messageDb = new MessageDb();
  messageService = new MessageService(messageDb);

  // Routes
  app.use('/api/messages', createMessageRoutes(messageService));

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