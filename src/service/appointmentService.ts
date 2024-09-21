import { Doctor } from '../../src/models/Doctor';
import { mapDoctorToDTO } from '../../src/mapper/doctorMapper';
import { Appointment } from '../models/Appointment';
import { User } from '../models/User';
import { Patient } from '../../src/models/Patient';
import { mapPatientToDTO } from '../../src/mapper/patientMapper';

export const createAppointment = async (data: {
    date: string;
    time: string;
    doctorId: number;
    patientId: number;
}) => {
    const { date, time, doctorId, patientId } = data;

    const user = await User.findOne({ where: { id: patientId, role: 'patient' }, select: ['id', 'name', 'email'] });
    const userDoctor = await User.findOne({ where: { id: doctorId, role: 'doctor' }, select: ['id', 'name', 'email'] });
    const doctor = await Doctor.findOne({ where: { user: userDoctor!}});
    const patient = await Patient.findOne({ where: { user: user!}});

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

    const appointmentSaved = await Appointment.save(appointment);

    return {
        ...appointment,
        doctor: mapDoctorToDTO(appointment.doctor),
    }
};

export const getAppointmentsByPatient = async (user: User) => {
    const appointments = await Appointment.find({
        where: { patient: { user_id: user.id } },
        relations: ['doctor'],
        select: ['id', 'date', 'time', 'status', 'doctor'],
    });

    return appointments.map(appointment => ({
        ...appointment,
        doctor: mapDoctorToDTO(appointment.doctor),
        patient: mapPatientToDTO(appointment.patient),
    }));
};
