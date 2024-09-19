import { z } from 'zod';

export const createAppointmentSchema = z.object({
    date: z.string().min(1, 'Date is required'),
    time: z.string().min(1, 'Time is required'),
    doctorId: z.number().int().positive('Doctor ID must be a positive integer'),
});
