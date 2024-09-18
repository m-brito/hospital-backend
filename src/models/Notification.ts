import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	BaseEntity,
} from 'typeorm'
import { User } from './User'

@Entity()
export class Notification extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	type!: string

	@Column()
	datetime!: Date

	@Column('text')
	message!: string

	@ManyToOne(() => User)
	@JoinColumn()
	user!: User
}
