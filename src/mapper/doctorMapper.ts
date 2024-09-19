import { Doctor } from '../../src/models/Doctor';
import { User } from '../models/User';

interface DoctorDTO {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'doctor' | 'patient';
    crm: string;
    specialty: string;
}

export const mapDoctorToDTO = (doctor: Doctor): DoctorDTO => {
    const { user } = doctor;

    const { password, ...userDTO } = user;

    return {
        ...userDTO,
        crm: doctor.crm,
        specialty: doctor.specialty,
    };
};