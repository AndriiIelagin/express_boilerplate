import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { authRateLimiter } from '../middlewares/rateLimit.middleware.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', authRateLimiter, validate(registerSchema), register);
router.post('/login', authRateLimiter, validate(loginSchema), login);

export default router;