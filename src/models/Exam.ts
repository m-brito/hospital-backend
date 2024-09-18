import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	BaseEntity,
} from 'typeorm'
import { Appointment } from './Appointment'

@Entity()
export class Exam extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	type!: string

	@Column()
	date!: Date

	@Column()
	result!: string

	@Column()
	status!: string

	@ManyToOne(() => Appointment)
	@JoinColumn()
	appointment!: Appointment
}
