import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthRequest } from '../common/api/types/AuthRequest';
import { extractUserIdAndBody } from '../common/api/utils';
import { CreateEventDto } from '../event/dto/create-event.dto';
import { CirculationService } from './circulation.service';

@Controller('circulation')
export class CirculationController {
    constructor(private readonly circulationService: CirculationService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createCirculationDto: CreateEventDto[]) {
        return this.circulationService.create(createCirculationDto);
    }

    @Post('save')
    @UseGuards(JwtAuthGuard)
    saveUserResult(@Req() req: AuthRequest) {
        return this.circulationService.saveUserResult(extractUserIdAndBody(req));
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.circulationService.findAll();
    }

    @Get('current')
    @UseGuards(JwtAuthGuard)
    getCurrent() {
        return this.circulationService.getCurrent();
    }

    @Get('personal')
    @UseGuards(JwtAuthGuard)
    findOne(@Req() req: AuthRequest) {
        return this.circulationService.getPersonal(extractUserIdAndBody(req));
    }
}
