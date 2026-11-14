import mongoose from 'mongoose';
import { ROLE_VALUES } from '../constants/roles.js';
import { cleanToJSON } from '../utils/cleanToJSON.js';

const membershipSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    role: { type: String, enum: ROLE_VALUES, required: true },
  },
  { timestamps: true }
);

// One membership per person per organization
membershipSchema.index({ userId: 1, orgId: 1 }, { unique: true });
// Fast "list all members of this org"
membershipSchema.index({ orgId: 1 });

membershipSchema.set('toJSON', { transform: cleanToJSON });

export default mongoose.model('Membership', membershipSchema);
