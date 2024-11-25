import * as authService from '../../service/authService';

import { Request, Response } from 'express';
import { loginSchema, patchUserSchema, registerDoctorSchema, registerPatientSchema } from './schema/authSchema';

export const register = async (req: Request, res: Response) => {
    try {
        const data = registerPatientSchema.parse(req.body);
        const user = await authService.createPatient(data);
        return res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const registerDoctor = async (req: Request, res: Response) => {
    const { name, email, password, specialty, crm } = req.body;

    try {
        const data = registerDoctorSchema.parse({ name, email, password, specialty, crm });

        const doctor = await authService.createDoctor(data);
        res.status(201).json(doctor);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: 'Error registering doctor' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const data = loginSchema.parse(req.body);
        const token = await authService.login(data);
        return res.status(200).json({ token });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getLogs = async (req: Request, res: Response) => {
    try {
        const logs = await authService.getLogs();
        return res.status(200).json(logs);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const patchUser = async (req: Request, res: Response) => {
    try {
        const data = patchUserSchema.parse(req.body);
        if(!req.user) return res.status(400).json({ message: 'User not found' });
        const userId = req.user.id;

        const user = await authService.patchUser({...data, userId});
        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        if(!req.user) return res.status(400).json({ message: 'User not found' });
        const userId = req.user.id;

        const user = await authService.getProfile({userId});
        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}