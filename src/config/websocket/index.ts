import http from 'http';
import { createApp } from '../server';
import { setupWebSocket } from './websocket';
import { serverConfig } from '..';
import { withErrorHandler } from '../../utils/asyncHandler';
import Logger from '../../logger';

export async function createServer(): Promise<http.Server> {
  return withErrorHandler(async () => {
    const [app, messageService] = createApp();
    const server = http.createServer(app);

    // Setup WebSocket
    setupWebSocket(server, messageService);

    // Start listening
    server.listen(serverConfig.port);

    Logger.info(`Server is running on port ${serverConfig.port}`);
    Logger.info(`Environment: ${serverConfig.env}`);

    return server;
  }, 'Failed to create server');
}
