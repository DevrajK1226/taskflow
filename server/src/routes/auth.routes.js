import { Router } from 'express';
import { signup } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signupSchema } from '../validators/auth.validators.js';

const router = Router();

router.post('/signup', validate(signupSchema), asyncHandler(signup));

export default router;
