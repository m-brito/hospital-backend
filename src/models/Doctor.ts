import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './User';

@Entity()
export class Doctor extends BaseEntity {
    @PrimaryColumn()
    id!: number;

    @Column()
    crm!: string;

    @Column()
    specialty!: string;

    @OneToOne(() => User)
    @JoinColumn()
    user!: User;
}
