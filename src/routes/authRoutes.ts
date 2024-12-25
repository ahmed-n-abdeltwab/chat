import Loki from 'lokijs';
import { Router } from 'express';
import { AuthService } from '../services';
import { UserDb, initializeCollections } from '../database';
import { dbConfig } from '../config'; // Import dbConfig
import { AuthController } from '../controllers';

export function createAuthRoutes(): Router {
  const router = Router();

  // Initialize the database instance
  const db = new Loki(dbConfig.filename, dbConfig.options);
  const collections = initializeCollections(db);

  // Pass the users collection to UserDb
  const userDb = new UserDb(collections.users);
  const authService = new AuthService(userDb);
  const controller = new AuthController(authService);

  router.post('/login', controller.login);

  router.post('/register', controller.register);

  return router;
}
