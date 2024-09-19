import {
	Entity,
	PrimaryColumn,
	Column,
	OneToOne,
	JoinColumn,
	BaseEntity,
} from 'typeorm'
import { User } from './User'

@Entity()
export class Doctor extends BaseEntity {
	@PrimaryColumn({ name: 'user_id' })
	user_id!: number

	@Column()
	crm!: string

	@Column()
	specialty!: string

	@OneToOne(() => User,  { eager: true })
	@JoinColumn({ name: 'user_id' })
	user!: User
}
