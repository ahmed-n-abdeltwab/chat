import { Message } from '../types/database';
import { MessageDb } from '../controllers/database/messageDb';
import { withErrorHandler } from '../utils/asyncHandler';

/**
 * Service class for handling message-related operations.
 */
export class MessageService {
  /**
   * Creates an instance of MessageService.
   * @param db - The database instance for message operations.
   */
  constructor(private db: MessageDb) {}

  /**
   * Saves a message to the database.
   * @param message - The message to be saved.
   * @returns A promise that resolves to the saved message.
   * @throws An error if the message could not be saved.
   */
  public async saveMessage(message: Message): Promise<Message> {
    // Implementation here
    return withErrorHandler(
      async () => this.db.saveMessage(message),
      'Error saving message'
    );
  }

  /**
   * Retrieves all messages from the database.
   * @returns A promise that resolves to an array of messages.
   * @throws An error if the messages could not be fetched.
   */
  public async getMessages(): Promise<Message[]> {
    // Implementation here
    return withErrorHandler(
      async () => this.db.getMessages(),
      'Error fetching messages'
    );
  }
}
