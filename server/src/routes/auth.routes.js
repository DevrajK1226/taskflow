import { Router } from 'express';
import { signup, login, refresh, me } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signupSchema, loginSchema, refreshSchema } from '../validators/auth.validators.js';

const router = Router();

router.post('/signup', validate(signupSchema), asyncHandler(signup));
router.post('/login', validate(loginSchema), asyncHandler(login));
router.post('/refresh', validate(refreshSchema), asyncHandler(refresh));
router.get('/me', requireAuth, asyncHandler(me));

export default router;
