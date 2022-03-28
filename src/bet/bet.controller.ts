import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthRequest } from '../common/api/types/AuthRequest';
import { extractUserIdAndBody } from '../common/api/utils';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BetService } from './bet.service';

@Controller('bet')
export class BetController {
    constructor(private readonly betService: BetService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Req() request: AuthRequest) {
        return this.betService.create(extractUserIdAndBody(request));
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.betService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.betService.findOne(+id);
    }
}
