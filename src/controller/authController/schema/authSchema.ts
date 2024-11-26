import { z } from 'zod';

export const registerPatientSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['admin', 'doctor', 'patient']).optional().default('patient'),
    birthdate: z.string().optional(),
    address: z.string().optional(),
});

export const registerDoctorSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    specialty: z.string(),
    crm: z.string(),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const patchUserSchema = z.object({
    photo: z.string().optional(),
    cep: z.string().optional(),
    neighborhood: z.string().max(100, 'Neighborhood name is too long').optional(),
    street: z.string().max(150, 'Street name is too long').optional(),
    number: z.string().optional(),
});
