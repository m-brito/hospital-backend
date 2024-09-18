import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Patient extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    user_id!: number;

    @Column()
    birthdate!: Date;

    @Column()
    address!: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;
}
