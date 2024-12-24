import WebSocket from 'ws';
import { Message, MessageResponse } from '../types/database';
import { WebSocketHandler } from '../types/server/websocket';
import { MessageService } from './messageService';
import { WebSocketManager } from '../utils/server/websocket';
import { validateMessage } from '../utils/validation';
import { safeJsonParse } from '../utils/server/helpers';
import { withErrorHandler } from '../utils/asyncHandler';
import Logger from '../logger';

/**
 * Service to manage WebSocket connections and handle communication between clients.
 */
export class WebSocketService implements WebSocketHandler {
  private wsManager: WebSocketManager;

  constructor(private messageService: MessageService) {
    this.wsManager = new WebSocketManager();
  }

  public handleConnection(ws: WebSocket): void {
    const client = this.wsManager.addClient(ws);
    Logger.info(
      `Client connected. Total clients: ${this.wsManager.getClientCount()}`
    );

    this.sendMessageHistory(ws);
    this.setupMessageHandler(ws);
    this.setupDisconnectHandler(ws, client.id);
  }

  public broadcast(data: unknown): void {
    this.wsManager.broadcast(data);
  }

  private async sendMessageHistory(ws: WebSocket): Promise<void> {
    await withErrorHandler(async () => {
      const messages = await this.messageService.getMessages();
      const response: MessageResponse = { type: 'history', messages };
      ws.send(JSON.stringify(response));
    }, 'Error sending message history');
  }

  private setupMessageHandler(ws: WebSocket): void {
    ws.on('message', async (data: WebSocket.Data) => {
      await withErrorHandler(async () => {
        const message = safeJsonParse<Message>(data.toString());
        const validatedMessage = validateMessage(message);
        const savedMessage =
          await this.messageService.saveMessage(validatedMessage);
        this.broadcast({ type: 'message', message: savedMessage });
      }, 'Error handling message');
    });
  }

  private setupDisconnectHandler(ws: WebSocket, clientId: string): void {
    ws.on('close', () => {
      this.wsManager.removeClient(clientId);
      Logger.info(
        `Client disconnected. Total clients: ${this.wsManager.getClientCount()}`
      );
    });
  }
}
