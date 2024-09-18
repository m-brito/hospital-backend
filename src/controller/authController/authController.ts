import * as authService from '../../service/authService/authService';

import { Request, Response } from 'express';
import { loginSchema, registerSchema } from './schema/authSchema';

export const register = async (req: Request, res: Response) => {
    try {
        const data = registerSchema.parse(req.body);
        const user = await authService.register(data);
        return res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
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
