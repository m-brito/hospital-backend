import { Exam } from '../../src/models/Exam';
import { Doctor } from '../../src/models/Doctor';
import { User } from '../models/User';
import { DoctorDTO, ExamDTO } from './types';
import { mapDoctorToDTO } from './doctorMapper';
import { mapPatientToDTO } from './patientMapper';

export const mapExamToDTO = (exam: Exam): ExamDTO => {
    const { appointment } = exam;

    const { doctor, patient, ...appointmentDTO } = appointment;

    return {
        id: exam.id,
        type: exam.type,
        appointment_id: appointment.id,
        date: exam.date.toString(),
        status: exam.status,
        doctor: mapDoctorToDTO(appointment.doctor),
        patient: mapPatientToDTO(appointment.patient),
    };
};