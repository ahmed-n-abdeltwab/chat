import Loki from 'lokijs';
import { Message } from '../types';
import { DatabaseError } from '../errors';
import Logger from '../logger';
import { dbConfig } from '../config';
import { DatabaseCollections, initializeCollections } from './collections';
import { validateMessageForDb } from './validators';

/**
 * Class representing the message database.
 */
export class MessageDb {
  private db: Loki;
  private collections: DatabaseCollections;

  /**
   * Creates an instance of MessageDb.
   * Initializes the database and collections.
   * Logs the initialization status.
   * @throws {DatabaseError} If the database initialization fails.
   */
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

  /**
   * Saves a message to the database.
   * @param message - The message to be saved.
   * @returns A promise that resolves to the saved message.
   * @throws {DatabaseError} If the message could not be saved.
   */
  public async saveMessage(message: Message): Promise<Message> {
    try {
      // Validate message before saving
      const validatedMessage = validateMessageForDb(message);
      const savedMessage = this.collections.messages.insert({
        ...validatedMessage,
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
      throw error instanceof DatabaseError
        ? error
        : new DatabaseError('Failed to save message');
    }
  }

  /**
   * Retrieves all messages from the database.
   * @returns A promise that resolves to an array of messages.
   * @throws {DatabaseError} If the messages could not be fetched.
   */
  public async getMessages(): Promise<Message[]> {
    try {
      return this.collections.messages.chain().simplesort('timestamp').data();
    } catch (error) {
      Logger.error('Failed to fetch messages:', error as Error);
      throw new DatabaseError('Failed to fetch messages');
    }
  }
}
