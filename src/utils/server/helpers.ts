import Logger from '../../logger';

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function safeJsonParse<T>(data: string): T {
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    Logger.error('Failed to parse JSON data:', error as Error);
    throw new Error('Invalid JSON data');
  }
}
