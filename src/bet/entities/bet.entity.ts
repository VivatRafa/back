import { Event } from '../../event/entities/event.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Outcomes } from '../config/constants';

@Entity()
export class Bet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'outcome_id' })
    outcomeId: Outcomes;

    @OneToOne(() => Event)
    event: Event;

    @OneToOne(() => User)
    user: User;
}
