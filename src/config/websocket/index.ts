import { Server } from 'node:http';
import { createApp } from '../server';
import { setupWebSocket } from './websocket';
import { serverConfig } from '../';
import { withErrorHandler } from '../../utils/asyncHandler';
import Logger from '../../logger';
import { initializeDatabase } from '../../database';
import { initializeServices } from '../../services';
/**
 * Creates and starts the HTTP server with WebSocket support.
 *
 * This function performs the following steps:
 * 1. Creates the Express application and initializes the message service.
 * 2. Sets up the WebSocket server.
 * 3. Starts the HTTP server on the configured port.
 * 4. Logs a message indicating that the server has started successfully.
 *
 * @returns {Promise<Server>} A promise that resolves to the started server instance.
 *
 * @example
 * ```typescript
 * createServer()
 *   .then(server => {
 *     console.log('Server is running');
 *   })
 *   .catch(error => {
 *     console.error('Failed to start server:', error);
 *   });
 * ```
 */
export async function createServer(): Promise<Server> {
  return withErrorHandler(async () => {
    // Initialize database and collections
    const { collections } = initializeDatabase();

    // Initialize services
    const { messageService } = initializeServices(collections);

    const app = createApp(messageService, collections);
    const server = new Server(app);

    setupWebSocket(server, messageService);

    return new Promise<Server>((resolve, reject) => {
      server
        .listen(serverConfig.port, () => {
          Logger.info(`Server is running on port ${serverConfig.port}`);
          resolve(server);
        })
        .on('error', (error: Error) => {
          Logger.error('Failed to start server:', error);
          reject(error);
        });
    });
  }, 'Failed to create and start the server');
}
