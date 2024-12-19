import path from 'path';

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
  autoload: boolean;
}

/**
 * The configuration object for the database.
 *
 * @property {string} filename - The path to the database file.
 * @property {boolean} autoload - Whether to autoload the database.
 */
export const dbConfig: DbConfig = {
  filename: path.join(process.cwd(), 'data', 'chat.db'),
  autoload: true,
};
