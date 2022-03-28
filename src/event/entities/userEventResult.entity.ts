import { Circulation } from '../../circulation/entities/circulation.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Outcomes } from '../../bet/config/constants';
import { User } from '../../user/entities/user.entity';
import { Event } from './event.entity';

@Entity()
export class UserEventResult {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.eventResult, { cascade: true })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Event, (event) => event.userResult)
    @JoinColumn()
    event: Event;

    @ManyToOne(() => Circulation, (circulation) => circulation.userEventsResult)
    @JoinColumn()
    circulation: Circulation;

    @Column()
    outcome: Outcomes;

    @Column({ default: false })
    guess: boolean;
}
