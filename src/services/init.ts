import { MessageDb } from '../database/messageDb';
import { MessageService } from './messageService';
import { DatabaseCollections } from '../database';
import Logger from '../logger';

/**
 * Initializes the message service.
 *
 * @returns The initialized message service.
 * @throws {Error} If the service initialization fails.
 */
export function initializeServices(collections: DatabaseCollections): {
  messageService: MessageService;
} {
  try {
    const messageDb = new MessageDb(collections);
    const messageService = new MessageService(messageDb);
    Logger.info('Services initialized successfully');
    return { messageService };
  } catch (error) {
    Logger.error('Failed to initialize services:', error as Error);
    throw new Error('Service initialization failed');
  }
}
