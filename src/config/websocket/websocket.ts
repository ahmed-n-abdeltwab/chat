import { Server } from 'node:http';
import WebSocket from 'ws';
import { MessageService } from '../../services/messageService';
import { WebSocketService } from '../../services/websocketService';
import { withErrorHandler } from '../../utils/asyncHandler';

/**
 * Sets up the WebSocket server and integrates it with the HTTP server.
 *
 * This function performs the following steps:
 * 1. Creates a new WebSocket server instance.
 * 2. Integrates the WebSocket server with the provided HTTP server.
 * 3. Initializes the WebSocket service with the message service.
 * 4. Sets up event handlers for WebSocket connections.
 *
 * @param {Server} server - The HTTP server instance.
 * @param {MessageService} messageService - The message service instance.
 * @returns {Promise<WebSocket.Server>} A promise that resolves to the WebSocket server instance.
 *
 * @example
 * ```typescript
 * setupWebSocket(server, messageService)
 *   .then(wsServer => {
 *     console.log('WebSocket server is running');
 *   })
 *   .catch(error => {
 *     console.error('Failed to set up WebSocket server:', error);
 *   });
 * ```
 */
export function setupWebSocket(
  server: Server,
  messageService: MessageService
): Promise<WebSocket.Server> {
  return withErrorHandler(async () => {
    const wsServer = new WebSocket.Server({ server });

    const webSocketService = new WebSocketService(messageService);

    wsServer.on('connection', (socket: WebSocket) => {
      webSocketService.handleConnection(socket);
    });

    return wsServer;
  }, 'Failed to setup WebSocket server:');
}
