import { Event } from '../entities/event.entity';

export type CreateEventDto = Omit<Event, 'id'>;
