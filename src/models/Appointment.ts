import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	BaseEntity,
} from 'typeorm'
import { User } from './User'
import { Doctor } from './Doctor'

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

	@ManyToOne(() => Doctor)
	@JoinColumn({name: 'doctor_id'})
	doctor!: Doctor

	@ManyToOne(() => User)
	@JoinColumn({name: 'patient_id'})
	patient!: User
}
