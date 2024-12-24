import WebSocket from 'ws';
/**
 * Interface for handling WebSocket connections.
 */
export interface WebSocketHandler {
  handleConnection(ws: WebSocket): void;
  broadcast(data: unknown): void;
}

export interface WebSocketClient {
  id: string;
}
