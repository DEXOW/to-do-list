import express from 'express';
import controller from '../controllers/user.js';
import middleware from '../middleware/auth.js';

const router = express.Router();

// Routes
router.get('/', middleware.isAuthenticatedUser, controller.getUser);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/logout', middleware.isAuthenticatedUser, controller.logout);

export default router;
