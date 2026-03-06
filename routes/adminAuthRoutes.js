import express from 'express';
import { registerUser, loginUser } from '../controller/adminAuthController.js';

const router = express.Router();

// Route for user registration: POST /auth/register
router.post('/register', registerUser);

// Route for user login: POST /auth/login
router.post('/login', loginUser);

export default router;