import { Router } from 'express';
import { createOrganization } from '../controllers/org.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createOrgSchema } from '../validators/org.validators.js';

const router = Router();

router.post('/', requireAuth, validate(createOrgSchema), asyncHandler(createOrganization));

export default router;
