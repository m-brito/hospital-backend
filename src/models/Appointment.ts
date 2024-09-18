import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Doctor } from './Doctor';
import { Patient } from './Patient';

@Entity()
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @Column()
    time!: string;

    @Column()
    status!: string;

    @ManyToOne(() => Doctor)
    @JoinColumn()
    doctor!: Doctor;

    @ManyToOne(() => Patient)
    @JoinColumn()
    patient!: Patient;
}
