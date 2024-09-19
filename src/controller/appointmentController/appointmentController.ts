import { Request, Response } from 'express';
import { createAppointmentSchema } from './schema/createAppointmentSchema';
import * as appointmentService from '../../service/appointmentService';

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const data = createAppointmentSchema.parse(req.body);
        const patientId = req.user?.id as number;

        const appointment = await appointmentService.createAppointment({ ...data, patientId});
        return res.status(201).json(appointment);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
