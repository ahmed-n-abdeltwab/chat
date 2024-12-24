import { Router } from 'express';
import { AuthService } from '../services';
import { UserDb, initializeCollections } from '../database';
import { asyncRouteHandler } from '../utils';
import Loki from 'lokijs';
import { dbConfig } from '../config'; // Import dbConfig

export function createAuthRoutes(): Router {
  const router = Router();

  // Initialize the database instance
  const db = new Loki(dbConfig.filename, dbConfig.options);
  const collections = initializeCollections(db);

  // Pass the users collection to UserDb
  const userDb = new UserDb(collections.users);
  const authService = new AuthService(userDb);

  router.post(
    '/login',
    asyncRouteHandler(async (req, res) => {
      const { email, password } = req.body;
      const response = await authService.login({ email, password });
      res.json(response);
    })
  );

  router.post(
    '/register',
    asyncRouteHandler(async (req, res) => {
      const { email, password } = req.body;
      const response = await authService.register({ email, password });
      res.json(response);
    })
  );

  return router;
}
