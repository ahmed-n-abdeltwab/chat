import express from 'express';
import path from 'path';
import { errorHandler } from '../../middleware/error/errorHandler';
import { requestLogger } from '../../middleware/logger';
import { MessageDb } from '../../database/messageDb';
import { MessageService } from '../../services/messageService';
import { createMessageRoutes } from '../../routes/messageRoutes';

/**
 * Creates and configures an Express application.
 *
 * This function sets up the Express application with the following:
 * - Serves static files from the `public` directory.
 * - Parses incoming JSON requests.
 * - Uses a custom request logger middleware.
 * - Uses a custom error handler middleware (should be the last middleware).
 *
 * @returns {express.Application, MessageService} The configured Express application instance.
 */
export function createApp(): [express.Application, MessageService] {
  const app = express();

  // Static files
  const publicDir = path.join(__dirname, '../../../public');
  app.use(express.static(publicDir));

  // Middleware
  app.use(express.json());
  app.use(requestLogger);
  // Initialize services
  const messageDb = new MessageDb();
  const messageService = new MessageService(messageDb);

  // Routes
  app.get('/', (_req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });
  app.use('/api/messages', createMessageRoutes(messageService));
  // Error handling - should be last
  app.use(errorHandler);

  return [app, messageService];
}
