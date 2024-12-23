import { LogLevel, LogMessage } from './types';

export function formatLogMessage(level: LogLevel, message: string): LogMessage {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
  };
}

export function formatError(message: LogMessage): string {
  return `[${message.timestamp}] ${message.level}: ${message.message}`;
}
