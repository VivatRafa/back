import { Circulation } from '../entities/circulation.entity';

export type CreateCirculationDto = Omit<Circulation, 'id'>;
