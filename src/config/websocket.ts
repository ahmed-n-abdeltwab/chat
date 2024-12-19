import http from 'http';
import WebSocket from 'ws';
import { MessageDb } from '../database/messageDb';
import { MessageService } from '../services/messageService';
import { WebSocketService } from '../services/websocketService';
import Logger from '../utils/logger';

export function setupWebSocket(server: http.Server): WebSocket.Server {
  try {
    const wss = new WebSocket.Server({ server });
    const messageDb = new MessageDb();
    const messageService = new MessageService(messageDb);
    const websocketService = new WebSocketService(messageService);

    wss.on('connection', (ws: WebSocket) => {
      websocketService.handleConnection(ws);
    });

    return wss;
  } catch (error) {
    Logger.error('Failed to setup WebSocket server:', error as Error);
    throw error;
  }
}
