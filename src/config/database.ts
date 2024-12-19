import path from 'path';

export interface DbConfig {
  filename: string;
  autoload: boolean;
}

export const dbConfig: DbConfig = {
  filename: path.join(process.cwd(), 'data', 'chat.db'),
  autoload: true,
};
