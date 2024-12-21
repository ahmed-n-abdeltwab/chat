import http from 'http';
import { createApp } from './app';
import { setupWebSocket } from './websocket';
import { serverConfig } from './config';
import { withErrorHandler } from '../../utils/asyncHandler';
import Logger from '../../utils/logger';

export async function createServer(): Promise<http.Server> {
  return withErrorHandler(async () => {
    const app = createApp();
    const server = http.createServer(app);

    // Setup WebSocket
    setupWebSocket(server);

    // Start listening
    server.listen(serverConfig.port);

    Logger.info(`Server is running on port ${serverConfig.port}`);
    Logger.info(`Environment: ${serverConfig.env}`);

    return server;
  }, 'Failed to create server');
}
