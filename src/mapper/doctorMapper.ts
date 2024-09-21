import { Doctor } from '../../src/models/Doctor';
import { User } from '../models/User';
import { DoctorDTO } from './types';

export const mapDoctorToDTO = (doctor: Doctor): DoctorDTO => {
    const { user } = doctor;

    const { password, ...userDTO } = user;

    return {
        ...userDTO,
        crm: doctor.crm,
        specialty: doctor.specialty,
    };
};