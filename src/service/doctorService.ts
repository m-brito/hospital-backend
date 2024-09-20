import { Doctor } from '../../src/models/Doctor';
import { mapDoctorToDTO } from '../../src/mapper/doctorMapper';

export const getDoctors = async () => {
    const doctors = await Doctor.find();

    return doctors.map(doctor => mapDoctorToDTO(doctor));
};
