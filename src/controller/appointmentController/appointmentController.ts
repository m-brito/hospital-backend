import { Request, Response } from 'express';
import { createAppointmentSchema } from './schema/createAppointmentSchema';
import * as appointmentService from '../../service/appointmentService';

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const data = createAppointmentSchema.parse(req.body);
        if(!req.user) return res.status(400).json({ message: 'User not found' });
        const patientId = req.user.id;

        const appointment = await appointmentService.createAppointment({ ...data, patientId});
        return res.status(201).json(appointment);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getAppointments = async (req: Request, res: Response) => {
    try {
        if(!req.user) return res.status(400).json({ message: 'User not found' });
        const appointments = await appointmentService.getAppointmentsByPatient(req.user);
        return res.status(200).json(appointments);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        if(!req?.params?.id) return res.status(400).json({ message: 'Id not found' });
        if(!req?.user) return res.status(400).json({ message: 'User not found' });
        const appointments = await appointmentService.getAppointmentById(Number(req.params.id));
        return res.status(200).json(appointments);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
