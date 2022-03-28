import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from '../event/dto/create-event.dto';
import { Repository } from 'typeorm';
import { EventService } from '../event/event.service';
import { Circulation } from './entities/circulation.entity';
import { UserService } from '../user/user.service';
import { UserEventResult } from '../event/entities/userEventResult.entity';
import { Event } from '../event/entities/event.entity';

@Injectable()
export class CirculationService {
    constructor(
        @InjectRepository(Circulation)
        private readonly сirculationRepository: Repository<Circulation>,
        private eventService: EventService,
        private userService: UserService,
    ) {}
    // Создаем из админки
    async save(circulation: Circulation) {
        const savedCirculation = await this.сirculationRepository.save(circulation);
        return savedCirculation;
    }

    async create(newEvents: CreateEventDto[]) {
        const events = await this.eventService.save(newEvents);

        const newCirculation = new Circulation();
        newCirculation.events = events;

        const circulation = await this.save(newCirculation);

        return { success: true, result: circulation };
    }

    async findAll() {
        const circulations = await this.сirculationRepository.find({ relations: ['events'] });

        return {
            success: true,
            result: circulations,
        };
    }

    // Устанавливаем результат из админки
    setResult(circulation: Circulation[]) {
        return '';
    }

    async saveUserResult({ userId, body }) {
        try {
            const { outcomes: userOutcomes, circulationId } = body;
            const user = await this.userService.getUserByParams({ where: { id: userId } });
            const eventIds = Object.keys(userOutcomes);
            const events = await this.eventService.findByIds(eventIds);
            const circulation = await this.findOne(circulationId);

            const userEventResultsPromised = events.map(async (event: Event) => {
                const [prevUserEventResult] = await this.eventService.findUserEventResult({ where: { user, event } });
                const outcome = userOutcomes[event.id];

                if (prevUserEventResult) {
                    prevUserEventResult.outcome = outcome;

                    return prevUserEventResult;
                }

                const userEventResult = new UserEventResult();
                userEventResult.event = event;
                userEventResult.user = user;
                userEventResult.circulation = circulation;
                userEventResult.outcome = outcome;

                return userEventResult;
            });

            const userEventResults = await Promise.all(userEventResultsPromised);

            await this.eventService.saveUserEventResult(userEventResults);

            return {
                success: true,
            };
        } catch (e) {
            return {
                success: false,
            };
        }
    }

    async getPersonal({ userId }) {
        const circulations = await this.сirculationRepository.find({ relations: ['userEventsResult'] });

        return {
            success: true,
            result: circulations,
        };
    }

    async getCurrent() {
        const circulation = await this.сirculationRepository.findOne({
            relations: ['events'],
            order: { id: 'DESC' },
        });

        return {
            success: true,
            result: circulation,
        };
    }

    async findOne(id?: string | number) {
        const circulation = await this.сirculationRepository.findOne(id);

        return circulation;
    }

    remove(id: number) {
        return '';
    }
}
