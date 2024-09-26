import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	BaseEntity,
	OneToMany,
} from 'typeorm'
import { User } from './User'
import { Doctor } from './Doctor'
import { Patient } from './Patient'
import { Exam } from './Exam'

@Entity()
export class Appointment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	date!: Date

	@Column()
	time!: string

	@Column()
	status!: string

	@ManyToOne(() => Doctor, { eager: true })
	@JoinColumn({name: 'doctor_id'})
	doctor!: Doctor

	@ManyToOne(() => Patient, { eager: true })
	@JoinColumn({name: 'patient_id'})
	patient!: Patient

	@OneToMany(() => Exam, exam => exam.appointment, { eager: true })
	exams!: Exam[];
}
