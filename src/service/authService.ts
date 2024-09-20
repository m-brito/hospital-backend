import { Doctor } from '../models/Doctor';
import { Patient } from '../models/Patient';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

interface RegisterPatientParams {
    name: string;
    email: string;
    password: string;
    birthdate?: string;
    address?: string;
}

interface RegisterDoctorParams {
    name: string;
    email: string;
    password: string;
    specialty: string;
    crm: string;
}

export const createPatient = async ({ name, email, password, birthdate, address }: RegisterPatientParams) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOneBy({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.role = 'patient';
    const savedUser = await user.save();

    if (birthdate || address) {
        const patient = new Patient();
        patient.birthdate = birthdate ? new Date(birthdate) : undefined;
        patient.address = address ?? undefined;
        patient.user = savedUser;
        await patient.save();
    }

    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
};

export const createDoctor = async ({ name, email, password, specialty, crm }: RegisterDoctorParams) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOneBy({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const existingDoctor = await Doctor.findOneBy({ crm });
    if (existingDoctor) {
        throw new Error('CRM already in use');
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.role = 'doctor';
    const savedUser = await user.save();

    const doctor = new Doctor();
    doctor.specialty = specialty;
    doctor.crm = crm;
    doctor.user = savedUser;
    await doctor.save();

    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
};

export const login = async ({ email, password }: any) => {
    const user = await User.findOneBy({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
};
