import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CirculationService } from '../circulation/circulation.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { UserEventResult } from './entities/userEventResult.entity';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
        @InjectRepository(UserEventResult)
        private readonly userEventResultRepository: Repository<UserEventResult>,
        @Inject(forwardRef(() => CirculationService))
        private circulationService: CirculationService,
    ) {}

    async save(events: CreateEventDto[]) {
        return await this.eventRepository.save(events);
    }

    async create(newEvents: CreateEventDto[]) {
        return {};
    }

    async findAll() {
        return await this.eventRepository.find();
    }

    saveUserEventResult(entities: UserEventResult[]) {
        return this.userEventResultRepository.save(entities);
    }

    findUserEventResult(params: FindOneOptions<UserEventResult>) {
        return this.userEventResultRepository.find(params);
    }

    findByIds(ids: any[], options?: FindManyOptions<Event>) {
        return this.eventRepository.findByIds(ids, options);
    }

    findOne(id: number) {
        return `This action returns a #${id} event`;
    }
}
