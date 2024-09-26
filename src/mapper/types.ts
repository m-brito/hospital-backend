export interface DoctorDTO {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'doctor' | 'patient';
    crm: string;
    specialty: string;
}

export interface PatientDTO {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'doctor' | 'patient';
    birthdate?: Date;
    address?: string;
}

export interface ExamDTO {
    id: number;
    appointment_id: number;
    type: string;
    date: Date;
    status: string;
    doctor: DoctorDTO;
    patient: PatientDTO;
}