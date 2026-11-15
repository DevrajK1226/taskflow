import mongoose from 'mongoose';
import Organization from '../models/Organization.js';
import Membership from '../models/Membership.js';
import { ROLES } from '../constants/roles.js';
import { AppError } from '../utils/AppError.js';
import { makeSlug } from '../utils/slug.js';

export async function createOrganization(req, res) {
  const { name } = req.body;
  let organization;

  const session = await mongoose.startSession();
  try {
    // All or nothing: the org and the owner membership are saved together
    await session.withTransaction(async () => {
      [organization] = await Organization.create(
        [{ name, slug: makeSlug(name), createdBy: req.user._id }],
        { session }
      );
      await Membership.create(
        [{ userId: req.user._id, orgId: organization._id, role: ROLES.OWNER }],
        { session }
      );
    });
  } finally {
    await session.endSession();
  }

  res.status(201).json({ organization, role: ROLES.OWNER });
}

// Only the organizations the logged-in user belongs to
export async function listMyOrganizations(req, res) {
  const memberships = await Membership.find({ userId: req.user._id })
    .populate('orgId')
    .sort({ createdAt: 1 });

  const organizations = memberships
    .filter((m) => m.orgId)
    .map((m) => ({ organization: m.orgId, role: m.role }));

  res.json({ organizations });
}

// The active organization (chosen by the x-org-id header, checked by requireOrg)
export async function getCurrentOrganization(req, res) {
  const organization = await Organization.findById(req.orgId);
  if (!organization) throw new AppError('Organization not found', 404);

  res.json({ organization, role: req.membership.role });
}
