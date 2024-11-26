import { Log } from '../../src/models/Log'
import { Doctor } from '../models/Doctor'
import { Patient } from '../models/Patient'
import { User } from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || '1234567890'

interface RegisterPatientParams {
	name: string
	email: string
	password: string
	birthdate?: string
	address?: string
}

interface RegisterDoctorParams {
	name: string
	email: string
	password: string
	specialty: string
	crm: string
}

export const createPatient = async ({
	name,
	email,
	password,
	birthdate,
	address,
}: RegisterPatientParams) => {
	const hashedPassword = await bcrypt.hash(password, 10)

	const existingUser = await User.findOneBy({ email })
	if (existingUser) {
		throw new Error('Email already in use')
	}

	const user = new User()
	user.name = name
	user.email = email
	user.password = hashedPassword
	user.role = 'patient'
	const savedUser = await user.save()

	if (birthdate || address) {
		const patient = new Patient()
		patient.birthdate = birthdate ? new Date(birthdate) : undefined
		patient.address = address ?? undefined
		patient.user = savedUser
		await patient.save()
	}

	const { password: _, ...userWithoutPassword } = savedUser
	return userWithoutPassword
}

export const createDoctor = async ({
	name,
	email,
	password,
	specialty,
	crm,
}: RegisterDoctorParams) => {
	const hashedPassword = await bcrypt.hash(password, 10)

	const existingUser = await User.findOneBy({ email })
	if (existingUser) {
		throw new Error('Email already in use')
	}

	const existingDoctor = await Doctor.findOneBy({ crm })
	if (existingDoctor) {
		throw new Error('CRM already in use')
	}

	const user = new User()
	user.name = name
	user.email = email
	user.password = hashedPassword
	user.role = 'doctor'
	const savedUser = await user.save()

	const doctor = new Doctor()
	doctor.specialty = specialty
	doctor.crm = crm
	doctor.user = savedUser
	await doctor.save()

	const { password: _, ...userWithoutPassword } = savedUser
	return userWithoutPassword
}

export const login = async ({ email, password }: any) => {
	const user = await User.findOneBy({ email })
	if (!user) {
		throw new Error('User or password incorrect')
	}

	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		throw new Error('User or password incorrect')
	}

	const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
		expiresIn: '24h',
	})

	const log = new Log()
	log.date = new Date()
	log.time = new Date().toLocaleTimeString()
	log.name = user.name
	log.role = user.role
	log.email = user.email
	const respLog = await log.save()

	return token
}

export const getLogs = async () => {
    const logs = await Log.find({
        order: {
            date: 'DESC',
            time: 'DESC',
        }
    });

    return logs;
};

export const patchUser = async (data: {
	photo?: string
	cep?: string
	neighborhood?: string
	street?: string
	number?: string
	userId: number
}) => {
	const { photo, cep, neighborhood, street, number, userId } = data

	const user = await User.findOne({
		where: { id: userId },
		select: ['id', 'name', 'email', 'cep', 'neighborhood', 'street', 'number', 'photo'],
	})

	if (user) {
		console.log(cep != null)
		if (photo != null) user.photo = photo
		if (cep != null) user.cep = cep
		if (neighborhood != null) user.neighborhood = neighborhood
		if (street != null) user.street = street
		if (number != null) user.number = number
		const newUser = await User.save(user)
	} else {
		throw new Error('User not found')
	}

	return {
		...user,
	}
}

export const getProfile = async (data: {
	userId: number
}) => {
	const { userId } = data

	const user = await User.findOne({
		where: { id: userId },
		select: ['id', 'name', 'email', 'cep', 'neighborhood', 'street', 'number', 'photo'],
	})

	if (!user) {
		throw new Error('User not found')
	}

	return {
		...user,
	}
}