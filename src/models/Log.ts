import {
	Entity,
	PrimaryColumn,
	BaseEntity,
	Column,
} from 'typeorm'

@Entity()
export class Log extends BaseEntity {
	@PrimaryColumn({ name: 'id' })
	id!: number

	@Column()
	date!: Date

	@Column()
	time!: string;

	@Column()
	name!: string

	@Column()
	role!: string

	@Column()
	email!: string
}
