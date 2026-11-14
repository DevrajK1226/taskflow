import mongoose from 'mongoose';
import { cleanToJSON } from '../utils/cleanToJSON.js';

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

organizationSchema.set('toJSON', { transform: cleanToJSON });

export default mongoose.model('Organization', organizationSchema);
