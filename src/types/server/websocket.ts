import WebSocket from 'ws';

export interface WebSocketHandler {
  handleConnection(ws: WebSocket): void;
  broadcast(data: unknown): void;
}

export interface WebSocketClient {
  ws: WebSocket;
  id: string;
}
