import { mapDoctorToDTO } from '../../src/mapper/doctorMapper';
import { Appointment } from '../models/Appointment';
import { User } from '../models/User';

export const createAppointment = async (data: {
    date: string;
    time: string;
    doctorId: number;
    patientId: number;
}) => {
    const { date, time, doctorId, patientId } = data;

    const patient = await User.findOne({ where: { id: patientId, role: 'patient' }, select: ['id', 'name', 'email'] });
    const doctor = await User.findOne({ where: { id: doctorId, role: 'doctor' }, select: ['id', 'name', 'email'] });

    if (!patient) {
        throw new Error('Patient not found');
    }
    if (!doctor) {
        throw new Error('Doctor not found');
    }

    const appointment = new Appointment();
    appointment.date = new Date(date);
    appointment.time = time;
    appointment.status = 'scheduled';
    appointment.patient = patient;
    appointment.doctor = doctor;

    return await Appointment.save(appointment);
};

export const getAppointmentsByPatient = async (patientId: number) => {
    const appointments = await Appointment.find({
        where: { patient: { id: patientId } },
        relations: ['doctor'],
        select: ['id', 'date', 'time', 'status', 'doctor'],
    });

    return appointments.map(appointment => ({
        ...appointment,
        doctor: mapDoctorToDTO(appointment.doctor),
    }));
};
