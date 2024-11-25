import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	name!: string

	@Column({ unique: true })
	email!: string

	@Column()
	password!: string

	@Column()
	role!: 'admin' | 'doctor' | 'patient'

	@Column({ nullable: true })
	cep?: string

	@Column({ nullable: true })
	neighborhood?: string

	@Column({ nullable: true })
	street?: string

	@Column({ nullable: true })
	number?: string

	@Column({ nullable: true })
	photo?: string
}
