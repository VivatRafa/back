import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BalanceModule } from './balance/balance.module';
import { CirculationModule } from './circulation/circulation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BetModule } from './bet/bet.module';
import { EventModule } from './event/event.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            insecureAuth: true,
            synchronize: true, // TODO убрать в продакшене
        }),
        UserModule,
        AuthModule,
        BalanceModule,
        CirculationModule,
        BetModule,
        EventModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
