import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CirculationModule } from '../circulation/circulation.module';
import { Event } from './entities/event.entity';
import { UserEventResult } from './entities/userEventResult.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
    imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Event, UserEventResult]), forwardRef(() => CirculationModule)],
    controllers: [EventController],
    providers: [EventService],
    exports: [EventService],
})
export class EventModule {}
