import { Server } from 'node:http';
import { createServer } from './config/websocket';
import { setupProcessHandlers } from './utils/server/processHandlers';
import Logger from './logger';

/**
 * Starts the server and sets up necessary process handlers.
 *
 * This function performs the following steps:
 * 1. Sets up process handlers for graceful shutdown and error handling.
 * 2. Creates and starts the server using the `createServer` function.
 * 3. Logs a message indicating that the server has started successfully.
 *
 * @returns {Promise<Server>} A promise that resolves to the started server instance.
 *
 * @example
 * ```typescript
 * startServer()
 *   .then(server => {
 *     console.log('Server is running');
 *   })
 *   .catch(error => {
 *     console.error('Failed to start server:', error);
 *   });
 * ```
 */
async function startServer(): Promise<Server> {
  try {
    setupProcessHandlers();
    const server = await createServer();
    Logger.info(`Server started successfully`);
    return server;
  } catch (error) {
    Logger.error('Failed to start server:', error as Error);
    throw error;
  }
}

export { startServer };
