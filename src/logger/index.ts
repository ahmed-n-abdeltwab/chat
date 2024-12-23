import { LogLevel } from './types';
import { formatLogMessage, formatError } from './formatters';

class Logger {
  public static info(message: string): void {
    console.log(formatError(formatLogMessage(LogLevel.INFO, message)));
  }

  public static warn(message: string): void {
    console.warn(formatError(formatLogMessage(LogLevel.WARN, message)));
  }

  public static error(message: string, error?: Error): void {
    console.error(formatError(formatLogMessage(LogLevel.ERROR, message)));
    if (error) {
      console.error(error);
    }
  }

  public static debug(message: string): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(formatError(formatLogMessage(LogLevel.DEBUG, message)));
    }
  }
}

export default Logger;
