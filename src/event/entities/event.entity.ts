import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Outcomes } from '../../bet/config/constants';
import { Circulation } from '../../circulation/entities/circulation.entity';
import { UserEventResult } from './userEventResult.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    command1: string;

    @Column()
    command2: string;

    @Column({ type: 'datetime', name: 'date_time' })
    dateTime: Date;

    @Column({ default: null })
    outcome: Outcomes;

    @ManyToOne(() => Circulation, (e) => e.events)
    circulation: Circulation;

    @OneToMany(() => UserEventResult, (userEventResult) => userEventResult.user)
    userResult: UserEventResult;
}
