import { User } from '../models/User';

interface DoctorDTO {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'doctor' | 'patient';
}

export const mapDoctorToDTO = (doctor: User): DoctorDTO => {
    const { password, ...doctorDTO } = doctor;
    return doctorDTO;
};