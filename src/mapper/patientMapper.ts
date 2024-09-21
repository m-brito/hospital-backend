import { PatientDTO } from './types'
import { Patient } from '../../src/models/Patient'

export const mapPatientToDTO = (patient: Patient): PatientDTO => {
	const { user } = patient

	const { password, ...userDTO } = user

	return {
		...userDTO,
		birthdate: patient.birthdate,
		address: patient.address,
	}
}
