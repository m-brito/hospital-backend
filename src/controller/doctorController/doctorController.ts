import { Request, Response } from 'express';
import * as doctorsService from '../../service/doctorService';

export const getDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await doctorsService.getDoctors();
        return res.status(200).json(doctors);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
