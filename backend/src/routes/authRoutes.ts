import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

// POST /auth/register - Register a new user
router.post('/register', (req, res) => authController.register(req, res));

// POST /auth/login - Login user
router.post('/login', (req, res) => authController.login(req, res));

// POST /auth/refresh - Refresh access token
router.post('/refresh', (req, res) => authController.refresh(req, res));

// POST /auth/logout - Logout user
router.post('/logout', (req, res) => authController.logout(req, res));

export default router;
