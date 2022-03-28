import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() events: CreateEventDto[]) {
        return this.eventService.create(events);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.eventService.findAll();
    }
}
