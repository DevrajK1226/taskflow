import { z } from 'zod';

export const createOrgSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Organization name must be at least 2 characters')
    .max(60, 'Organization name must be at most 60 characters'),
});
