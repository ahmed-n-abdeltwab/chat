/**
 * Interface representing the configuration for the database.
 */
export interface DbConfig {
  /**
   * The filename of the database.
   */
  filename: string;

  /**
   * A flag indicating whether the database should be autoloaded.
   */
  options?: {
    autoload: boolean;
    autosave: boolean;
    autosaveInterval: number;
    persistenceMethod: 'fs' | 'localStorage' | 'memory' | null | undefined;
  };
}
/**
 * Represents a chat message.
 */
export interface Message {
  /**
   * The username of the person who sent the message.
   */
  username: string;

  /**
   * The content of the message.
   */
  text: string;

  /**
   * The timestamp when the message was sent.
   * Optional.
   */
  timestamp?: Date;

  /**
   * The unique identifier of the message.
   * Optional.
   */
  _id?: string;
}

/**
 * Represents the response containing messages.
 */
export interface MessageResponse {
  /**
   * The type of the response, either a single message or a history of messages.
   */
  type: 'message' | 'history';

  /**
   * A single message.
   * Optional.
   */
  message?: Message;

  /**
   * An array of messages.
   * Optional.
   */
  messages?: Message[];
}
