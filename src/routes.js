import { Router } from 'express';

// Import Controllers
import SessionController from './app/controllers/SessionController';

// Variables
const routes = new Router();

// ROUTES
// Session
routes.post('/sessions', SessionController.store);

export default routes;
