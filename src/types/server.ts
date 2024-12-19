import { Server as HttpServer } from 'http';
import { Server as WebSocketServer } from 'ws';

export interface ServerInstance {
  httpServer: HttpServer;
  wsServer: WebSocketServer;
}

export interface ServerConfig {
  port: number;
  env: string;
  cors: {
    origin: string;
    methods: string[];
  };
}
