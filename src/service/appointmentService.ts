import { Request, Response } from 'express'

import { Doctor } from '../../src/models/Doctor'
import { mapDoctorToDTO } from '../../src/mapper/doctorMapper'
import { Appointment } from '../models/Appointment'
import { User } from '../models/User'
import { Patient } from '../../src/models/Patient'
import { mapPatientToDTO } from '../../src/mapper/patientMapper'

export const createAppointment = async (data: {
	date: string
	time: string
	doctorId: number
	patientId: number
}) => {
	const { date, time, doctorId, patientId } = data

	const user = await User.findOne({
		where: { id: patientId, role: 'patient' },
		select: ['id', 'name', 'email'],
	})
	const userDoctor = await User.findOne({
		where: { id: doctorId, role: 'doctor' },
		select: ['id', 'name', 'email'],
	})
	const doctor = await Doctor.findOne({ where: { user: userDoctor! } })
	const patient = await Patient.findOne({ where: { user: user! } })

	if (!patient) {
		throw new Error('Patient not found')
	}
	if (!doctor) {
		throw new Error('Doctor not found')
	}

	const appointment = new Appointment()
	appointment.date = new Date(date)
	appointment.time = time
	appointment.status = 'scheduled'
	appointment.patient = patient
	appointment.doctor = doctor

	const appointmentSaved = await Appointment.save(appointment)

	return {
		...appointment,
		doctor: mapDoctorToDTO(appointment.doctor),
	}
}

export const getAppointmentsByPatient = async (user: User) => {
	let appointments
	if (user.role === 'patient') {
		appointments = await Appointment.find({
			where: { patient: { user_id: user.id } },
			relations: ['doctor'],
			select: ['id', 'date', 'time', 'status', 'doctor'],
		})
	} else if (user.role === 'doctor') {
		appointments = await Appointment.find({
			where: { doctor: { user_id: user.id } },
			relations: ['patient'],
			select: ['id', 'date', 'time', 'status', 'patient'],
		})
	} else {
		appointments = await Appointment.find()
	}

	return appointments.map((appointment) => ({
		...appointment,
		doctor: mapDoctorToDTO(appointment.doctor),
		patient: mapPatientToDTO(appointment.patient),
	}))
}

export const getAppointmentById = async (id: number) => {
	if (!id) return null

	try {
		const appointment = await Appointment.findOne({
			where: {
				id: Number(id),
			},
		})

		if (!appointment) {
			return null
		}

		return {
			id: appointment.id,
			date: appointment.date,
			time: appointment.time,
			status: appointment.status,
            doctor: mapDoctorToDTO(appointment.doctor),
            patient: mapPatientToDTO(appointment.patient),
			exams: appointment.exams.map((exam) => ({
				id: exam.id,
                type: exam.type,
                appointment_id: appointment.id,
                date: exam.date,
                status: exam.status,
			})),
		};
	} catch (error) {
		console.error(error)
		return null
	}
}
