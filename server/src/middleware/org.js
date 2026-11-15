import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import Membership from '../models/Membership.js';

const OBJECT_ID = /^[a-f0-9]{24}$/i;

// Must run AFTER requireAuth. Reads the active org from the x-org-id header and
// proves the logged-in user is a member of it.
export const requireOrg = asyncHandler(async (req, _res, next) => {
  const orgId = req.headers['x-org-id'];

  if (!orgId) throw new AppError('x-org-id header is required', 400);
  if (!OBJECT_ID.test(orgId)) throw new AppError('Invalid organization id', 400);

  const membership = await Membership.findOne({ userId: req.user._id, orgId });
  if (!membership) {
    throw new AppError('You do not have access to this organization', 403);
  }

  req.orgId = membership.orgId;
  req.membership = membership;
  next();
});
