// src/service/examService.ts

import { Exam } from '../models/Exam';
import { Appointment } from '../models/Appointment';
import { mapDoctorToDTO } from '../../src/mapper/doctorMapper';
import { mapPatientToDTO } from '../../src/mapper/patientMapper';

interface RegisterExamData {
    appointment_id: number;
    type: string;
    date: string;
}

export const createExam = async ({ appointment_id, type, date }: RegisterExamData) => {

    const appointment = await Appointment.findOne({ where: { id: appointment_id }});

    if(!appointment) throw new Error('Appointment not found');

    if (appointment.status !== 'scheduled') throw new Error('Cannot create exam, appointment is not scheduled');

    const newExam = Exam.create({
        type: type,
        date: date,
        status: 'pending',
        appointment: appointment,
    });

    await newExam.save();

    return {
        id: newExam.id,
        type: newExam.type,
        date: newExam.date,
        status: newExam.status,
        doctor: mapDoctorToDTO(appointment.doctor),
        patient: mapPatientToDTO(appointment.patient),
    };
};
