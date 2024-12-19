import WebSocket from 'ws';
import { Message, MessageResponse } from '../types/message';
import { MessageService } from './messageService';
import { validateMessage } from '../utils/validation';
import Logger from '../utils/logger';

/**
 * Service to manage WebSocket connections and handle communication between clients.
 */
export class WebSocketService {
  /**
   * Set of connected WebSocket clients.
   */
  private clients: Set<WebSocket>;

  /**
   * Constructs a new WebSocketService.
   * @param messageService - Service to handle message-related operations.
   */
  constructor(private messageService: MessageService) {
    this.clients = new Set();
  }

  /**
   * Handles a new WebSocket connection.
   * @param ws - The WebSocket connection to handle.
   */
  public handleConnection(ws: WebSocket): void {
    this.addClient(ws);
    this.sendMessageHistory(ws);
    this.setupMessageHandler(ws);
    this.setupDisconnectHandler(ws);
    this.setupErrorHandler(ws);
  }

  /**
   * Adds a WebSocket client to the set of connected clients.
   * @param ws - The WebSocket client to add.
   */
  private addClient(ws: WebSocket): void {
    this.clients.add(ws);
    Logger.info(`Client connected. Total clients: ${this.clients.size}`);
  }

  /**
   * Sends the message history to a newly connected WebSocket client.
   * @param ws - The WebSocket client to send the message history to.
   */
  private async sendMessageHistory(ws: WebSocket): Promise<void> {
    try {
      const messages = await this.messageService.getMessages();
      const response: MessageResponse = { type: 'history', messages };
      ws.send(JSON.stringify(response));
    } catch (error) {
      Logger.error('Error sending message history:', error as Error);
    }
  }

  /**
   * Sets up the message handler for a WebSocket client.
   * @param ws - The WebSocket client to set up the message handler for.
   */
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

  /**
   * Sets up the disconnect handler for a WebSocket client.
   * @param ws - The WebSocket client to set up the disconnect handler for.
   */
  private setupDisconnectHandler(ws: WebSocket): void {
    ws.on('close', () => {
      this.clients.delete(ws);
      Logger.info(`Client disconnected. Total clients: ${this.clients.size}`);
    });
  }

  /**
   * Sets up the error handler for a WebSocket client.
   * @param ws - The WebSocket client to set up the error handler for.
   */
  private setupErrorHandler(ws: WebSocket): void {
    ws.on('error', error => {
      Logger.error('WebSocket error:', error);
      this.clients.delete(ws);
    });
  }

  /**
   * Sends an error message to a WebSocket client.
   * @param ws - The WebSocket client to send the error message to.
   * @param error - The error to send.
   */
  private sendErrorToClient(ws: WebSocket, error: Error): void {
    const errorResponse = {
      type: 'error',
      message: error.message,
    };
    ws.send(JSON.stringify(errorResponse));
  }

  /**
   * Broadcasts a message to all connected WebSocket clients.
   * @param message - The message to broadcast.
   */
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
