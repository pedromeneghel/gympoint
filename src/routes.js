import { Router } from 'express';

// Impor middlewares
import authMiddleware from './app/middlewares/auth';

// Import Controllers
import PlansController from './app/controllers/PlansController';
import StudentsController from './app/controllers/StudentsController';
import SessionController from './app/controllers/SessionController';

// Variables
const routes = new Router();

// ROUTES
// Session
routes.post('/sessions', SessionController.store);

// Middleware Global
routes.use(authMiddleware);

// Students
routes.get('/students', StudentsController.index);
routes.get('/students/:idStudent', StudentsController.show);
routes.post('/students', StudentsController.store);
routes.put('/students/:idStudent', StudentsController.update);

// Plans
routes.get('/plans', PlansController.index);
routes.get('/plans/:idPlan', PlansController.show);
routes.post('/plans', PlansController.store);
routes.put('/plans/:idPlan', PlansController.update);

export default routes;
