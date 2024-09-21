import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from './User'

@Entity()
export class Patient extends BaseEntity {
	@PrimaryGeneratedColumn({ name: 'user_id' })
	user_id!: number

	@Column()
	birthdate?: Date

	@Column()
	address?: string

	@OneToOne(() => User, { eager: true })
	@JoinColumn({ name: 'user_id' })
	user!: User
}
