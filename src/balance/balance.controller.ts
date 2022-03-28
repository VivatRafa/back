import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';

@Controller('balance')
export class BalanceController {
    constructor(private readonly balanceService: BalanceService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createBalanceDto: CreateBalanceDto) {
        return this.balanceService.create(createBalanceDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.balanceService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.balanceService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateBalanceDto: UpdateBalanceDto) {
        return this.balanceService.update(+id, updateBalanceDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.balanceService.remove(+id);
    }
}
