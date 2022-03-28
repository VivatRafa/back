import { Event } from '../../event/entities/event.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEventResult } from '../../event/entities/userEventResult.entity';

@Entity()
export class Circulation {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ type: 'datetime', name: 'end_at', default: null })
    endAt: Date;

    @Column({ name: 'number_participants', default: 0 })
    numberParticipants: number;

    @Column({ name: 'number_winners', default: 0 })
    numberWinners: number;

    @OneToMany(() => Event, (e) => e.circulation)
    events: Event[];

    @OneToMany(() => UserEventResult, (e) => e.circulation)
    userEventsResult: UserEventResult[];
}
