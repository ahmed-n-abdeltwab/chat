import WebSocket from 'ws';
import { Message, MessageResponse } from '../types/message';
import { MessageService } from './messageService';
import { validateMessage } from '../utils/validation';
import Logger from '../utils/logger';

export class WebSocketService {
  private clients: Set<WebSocket>;

  constructor(private messageService: MessageService) {
    this.clients = new Set();
  }

  public handleConnection(ws: WebSocket): void {
    this.addClient(ws);
    this.sendMessageHistory(ws);
    this.setupMessageHandler(ws);
    this.setupDisconnectHandler(ws);
    this.setupErrorHandler(ws);
  }

  private addClient(ws: WebSocket): void {
    this.clients.add(ws);
    Logger.info(`Client connected. Total clients: ${this.clients.size}`);
  }

  private async sendMessageHistory(ws: WebSocket): Promise<void> {
    try {
      const messages = await this.messageService.getMessages();
      const response: MessageResponse = { type: 'history', messages };
      ws.send(JSON.stringify(response));
    } catch (error) {
      Logger.error('Error sending message history:', error as Error);
    }
  }

  private setupMessageHandler(ws: WebSocket): void {
    ws.on('message', async (data: WebSocket.Data) => {
      try {
        const message: Message = JSON.parse(data.toString());
        const validatedMessage = validateMessage(message);
        const savedMessage =
          await this.messageService.saveMessage(validatedMessage);
        this.broadcastMessage(savedMessage);
      } catch (error) {
        Logger.error('Error handling message:', error as Error);
        this.sendErrorToClient(ws, error as Error);
      }
    });
  }

  private setupDisconnectHandler(ws: WebSocket): void {
    ws.on('close', () => {
      this.clients.delete(ws);
      Logger.info(`Client disconnected. Total clients: ${this.clients.size}`);
    });
  }

  private setupErrorHandler(ws: WebSocket): void {
    ws.on('error', error => {
      Logger.error('WebSocket error:', error);
      this.clients.delete(ws);
    });
  }

  private sendErrorToClient(ws: WebSocket, error: Error): void {
    const errorResponse = {
      type: 'error',
      message: error.message,
    };
    ws.send(JSON.stringify(errorResponse));
  }

  private broadcastMessage(message: Message): void {
    const response: MessageResponse = { type: 'message', message };
    const messageData = JSON.stringify(response);

    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageData);
      }
    });
  }
}
