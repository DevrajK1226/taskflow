import mongoose from 'mongoose';
import Organization from '../models/Organization.js';
import Membership from '../models/Membership.js';
import { ROLES } from '../constants/roles.js';
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
