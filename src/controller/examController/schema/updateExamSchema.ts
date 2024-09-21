import { z } from 'zod';

export const updateExamSchema = z.object({
    type: z.string({ message: 'Type is required' }).min(3, 'Type is required').optional(),
    date: z.string().optional(),
    result: z.string().optional(),
    status: z.string().optional(),
});
