import { Server } from 'node:http';
import WebSocket from 'ws';
import { MessageService } from '../../services/messageService';
import { WebSocketService } from '../../services/websocketService';
import { withErrorHandler } from '../../utils/asyncHandler';

export function setupWebSocket(
  server: Server,
  messageService: MessageService
): Promise<WebSocket.Server> {
  return withErrorHandler(async () => {
    const wss = new WebSocket.Server({ server });
    const websocketService = new WebSocketService(messageService);

    wss.on('connection', (ws: WebSocket) => {
      websocketService.handleConnection(ws);
    });
    return wss;
  }, 'Failed to setup WebSocket server:');
}
