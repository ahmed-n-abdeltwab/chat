import Datastore from 'nedb';
import { dbConfig } from '../config/database';
import { Message } from '../types/database';
import { DatabaseError } from '../errors';
import Logger from '../logger';

/**
 * The MessageDb class provides methods to interact with the message database.
 * It allows saving and retrieving messages with timestamp indexing.
 */
export class MessageDb {
  /**
   * The database instance used for storing and retrieving messages.
   */
  private db: Datastore;

  /**
   * Initializes a new instance of the MessageDb class.
   * Sets up the database and ensures indexes are created.
   */
  constructor() {
    this.db = new Datastore(dbConfig);
    this.setupIndexes();
  }

  /**
   * Sets up the necessary indexes for the database.
   * Ensures that the 'timestamp' field is indexed for efficient querying.
   */
  private setupIndexes(): void {
    this.db.ensureIndex({ fieldName: 'timestamp' });
    Logger.info('Database indexes setup completed');
  }

  /**
   * Saves a message to the database.
   * Adds a timestamp to the message before saving.
   *
   * @param message - The message object to be saved.
   * @returns A promise that resolves to the saved message object.
   * @throws {DatabaseError} If there is an error while saving the message.
   */
  public async saveMessage(message: Message): Promise<Message> {
    try {
      const messageWithTimestamp: Message = {
        ...message,
        timestamp: new Date(),
      };

      return await new Promise((resolve, reject) => {
        this.db.insert(
          messageWithTimestamp,
          (err: Error | null, doc: Message) => {
            if (err) reject(new DatabaseError('Failed to save message'));
            else resolve(doc);
          }
        );
      });
    } catch (error) {
      Logger.error('Database error while saving message:', error as Error);
      throw error;
    }
  }

  /**
   * Retrieves all messages from the database.
   * Messages are sorted by their timestamp in ascending order.
   *
   * @returns A promise that resolves to an array of message objects.
   * @throws {DatabaseError} If there is an error while fetching the messages.
   */
  public async getMessages(): Promise<Message[]> {
    try {
      return await new Promise((resolve, reject) => {
        this.db
          .find({})
          .sort({ timestamp: 1 })
          .exec((err: Error | null, docs: Message[]) => {
            if (err) reject(new DatabaseError('Failed to fetch messages'));
            else resolve(docs);
          });
      });
    } catch (error) {
      Logger.error('Database error while fetching messages:', error as Error);
      throw error;
    }
  }
}
