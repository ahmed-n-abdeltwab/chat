import { Server } from 'node:http';
import { Server as WebSocketServer } from 'ws';
import Logger from '../../logger';

export async function closeServer(
  httpServer: Server,
  wsServer: WebSocketServer
): Promise<void> {
  await Promise.all([
    closeHttpServer(httpServer),
    closeWebSocketServer(wsServer),
  ]);
}

async function closeHttpServer(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) reject(err);
      else {
        Logger.info('HTTP server closed');
        resolve();
      }
    });
  });
}

async function closeWebSocketServer(server: WebSocketServer): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) reject(err);
      else {
        Logger.info('WebSocket server closed');
        resolve();
      }
    });
  });
}
