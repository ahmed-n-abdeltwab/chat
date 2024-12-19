import { ServerConfig } from '../types/server';

/**
 * Configuration object for the server.
 *
 * @property {number} port - The port number on which the server will listen. Defaults to 3000 if not specified in the environment variables.
 * @property {string} env - The environment in which the server is running. Defaults to 'development' if not specified in the environment variables.
 * @property {object} cors - Configuration for Cross-Origin Resource Sharing (CORS).
 * @property {string} cors.origin - The allowed origin for CORS. Defaults to '*' if not specified in the environment variables.
 * @property {string[]} cors.methods - The allowed HTTP methods for CORS. Defaults to ['GET', 'POST'].
 */
export const serverConfig: ServerConfig = {
  port: Number(process.env.PORT) || 3000,
  env: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
};
