import WebSocket from 'ws';
import { WebSocketClient } from '../../types/server/websocket';
/**
 * Manages WebSocket connections.
 */
export class WebSocketManager {
  private clients: Map<string, WebSocket> = new Map();

  public addClient(ws: WebSocket): WebSocketClient {
    const id = this.generateClientId();
    this.clients.set(id, ws);
    return { id };
  }

  public removeClient(id: string): void {
    this.clients.delete(id);
  }

  public broadcast(data: unknown): void {
    const message = JSON.stringify(data);
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  public getClientCount(): number {
    return this.clients.size;
  }
  private generateClientId(): string {
    return Math.random().toString(36).slice(2, 9);
  }
}
