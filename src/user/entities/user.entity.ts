import { UserEventResult } from '../../event/entities/userEventResult.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column({ default: 'user' })
    role: string;

    @Column()
    password: string;

    @OneToMany(() => UserEventResult, (userEventResult) => userEventResult.user)
    eventResult: UserEventResult;
}
