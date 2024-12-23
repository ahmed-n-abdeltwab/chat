import Loki from 'lokijs';
import { Message } from '../types/database';
import { DatabaseError } from '../errors';
import Logger from '../logger';
import { dbConfig } from '../config/database';
import { DatabaseCollections, initializeCollections } from './collections';

export class MessageDb {
  private db: Loki;
  private collections: DatabaseCollections;

  constructor() {
    try {
      this.db = new Loki(dbConfig.filename, dbConfig.options);
      this.collections = initializeCollections(this.db);
      Logger.info('Message database initialized successfully');
    } catch (error) {
      Logger.error('Failed to initialize database:', error as Error);
      throw new DatabaseError('Database initialization failed');
    }
  }

  public async saveMessage(message: Message): Promise<Message> {
    try {
      const savedMessage = this.collections.messages.insert({
        ...message,
        timestamp: new Date(),
      });

      if (!savedMessage) {
        throw new DatabaseError(
          'Failed to save message - no document returned'
        );
      }

      return savedMessage;
    } catch (error) {
      Logger.error('Failed to save message:', error as Error);
      throw new DatabaseError('Failed to save message');
    }
  }

  public async getMessages(): Promise<Message[]> {
    try {
      return this.collections.messages.chain().simplesort('timestamp').data();
    } catch (error) {
      Logger.error('Failed to fetch messages:', error as Error);
      throw new DatabaseError('Failed to fetch messages');
    }
  }
}
