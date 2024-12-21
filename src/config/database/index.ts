import path from 'path';
import fs from 'fs';

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
const dbDirectory = path.join(process.cwd(), 'data');
try {
  if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory, { recursive: true });
  }
} catch (error) {
  console.error(`Failed to create directory ${dbDirectory}:`, error);
  throw error;
}

export const dbConfig: DbConfig = {
  filename: path.join(dbDirectory, 'chat.db'),
  autoload: true,
};
