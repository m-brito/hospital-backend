import { Entity, PrimaryColumn, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './User';

@Entity()
export class Administrator extends BaseEntity {
    @PrimaryColumn({ name: 'user_id' })
    user_id!: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;
}
