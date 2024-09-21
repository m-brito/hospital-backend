import { Exam } from '../models/Exam';
import { Appointment } from '../models/Appointment';
import { mapDoctorToDTO } from '../../src/mapper/doctorMapper';
import { mapPatientToDTO } from '../../src/mapper/patientMapper';
import { User } from '../../src/models/User';

interface RegisterExamData {
    appointment_id: number;
    type: string;
    date: string;
}

interface UpdateExamData {
    type?: string;
    date?: string;
    status?: string;
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

export const updateExam = async (examId: number, data: UpdateExamData) => {
    const exam = await Exam.findOne({
        where: { id: examId },
        relations: ['appointment', 'appointment.doctor', 'appointment.patient'],
    });

    if (!exam) throw new Error('Exam not found');

    const appointment = await Appointment.findOne({ where: { id: exam.appointment.id } });
    if (!appointment) throw new Error('Appointment not found');

    Object.assign(exam, data);

    await exam.save();

    return {
        id: exam.id,
        type: exam.type,
        date: new Date(exam.date),
        result: exam.result,
        status: exam.status,
        doctor: mapDoctorToDTO(appointment.doctor),
        patient: mapPatientToDTO(appointment.patient),
    };
};

export const getExams = async (user: User) => {
    let exams;
    if(user.role === 'doctor') {
        exams = await Exam.find({
            relations: ['appointment', 'appointment.doctor', 'appointment.patient'],
            where: { appointment: { doctor: { user_id: user.id }  } },
        });
    } else if(user.role == 'patient') {
        exams = await Exam.find({
            relations: ['appointment', 'appointment.doctor', 'appointment.patient'],
            where: { appointment: { patient: { user_id: user.id }  } },
        });
    } else {
        exams = await Exam.find({
            relations: ['appointment', 'appointment.doctor', 'appointment.patient'],
        });
    }

    if (!exams) throw new Error('Exams not found');

    return exams.map((exam) => ({
        id: exam.id,
        type: exam.type,
        date: exam.date,
        status: exam.status,
        doctor: mapDoctorToDTO(exam.appointment.doctor),
        patient: mapPatientToDTO(exam.appointment.patient),
    }));
};