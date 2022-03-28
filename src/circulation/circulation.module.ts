import { forwardRef, Module } from '@nestjs/common';
import { CirculationService } from './circulation.service';
import { CirculationController } from './circulation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Circulation } from './entities/circulation.entity';
import { EventModule } from '../event/event.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
    controllers: [CirculationController],
    imports: [forwardRef(() => AuthModule), forwardRef(() => UserModule), TypeOrmModule.forFeature([Circulation]), forwardRef(() => EventModule)],
    providers: [CirculationService],
    exports: [CirculationService],
})
export class CirculationModule {}
