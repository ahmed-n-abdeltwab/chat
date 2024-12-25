import { Router } from 'express';
import { AuthService } from '../services';
import { UserDb, DatabaseCollections } from '../database';
import { AuthController } from '../controllers';

export function createAuthRoutes(collections: DatabaseCollections): Router {
  const router = Router();

  // Pass the users collection to UserDb
  const userDb = new UserDb(collections.users);
  const authService = new AuthService(userDb);
  const controller = new AuthController(authService);

  router.post('/login', controller.login);

  router.post('/register', controller.register);

  return router;
}
