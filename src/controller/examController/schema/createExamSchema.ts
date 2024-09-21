import { z } from 'zod';

export const createExamSchema = z.object({
    type: z.string({ message: 'Type is required' }).min(3, 'Type is required'),
    date: z.string().optional(),
    appointment_id: z.number({ message: 'Appointment ID is required' }),
});