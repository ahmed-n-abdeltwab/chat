import WebSocket from 'ws';
import { WebSocketClient } from '../../types/server/websocket';
import { generateId } from './helpers';

export class WebSocketManager {
  private clients: Map<string, WebSocketClient> = new Map();

  public addClient(ws: WebSocket): WebSocketClient {
    const client = { ws, id: generateId() };
    this.clients.set(client.id, client);
    return client;
  }

  public removeClient(id: string): void {
    this.clients.delete(id);
  }

  public broadcast(data: unknown): void {
    const message = JSON.stringify(data);
    this.clients.forEach(client => {
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(message);
      }
    });
  }

  public getClientCount(): number {
    return this.clients.size;
  }
}
