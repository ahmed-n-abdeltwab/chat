export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: string;
  error?: Error;
}
