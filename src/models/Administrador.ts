import { Entity, PrimaryColumn, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './User';

@Entity()
export class Administrator extends BaseEntity {
    @PrimaryColumn()
    id!: number;

    @OneToOne(() => User)
    @JoinColumn()
    user!: User;
}
