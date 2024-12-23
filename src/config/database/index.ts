import { DbConfig } from '../../types/database';

export const dbConfig: DbConfig = {
  filename: 'data/chat.db',
  options: {
    autoload: true,
    autosave: true,
    autosaveInterval: 4000,
    persistenceMethod: 'fs',
  },
};
