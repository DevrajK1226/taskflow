import { Router } from 'express';
import {
  createOrganization,
  listMyOrganizations,
  getCurrentOrganization,
} from '../controllers/org.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { requireOrg } from '../middleware/org.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createOrgSchema } from '../validators/org.validators.js';

const router = Router();

router.get('/', requireAuth, asyncHandler(listMyOrganizations));
router.post('/', requireAuth, validate(createOrgSchema), asyncHandler(createOrganization));
router.get('/current', requireAuth, requireOrg, asyncHandler(getCurrentOrganization));

export default router;
