import { Injectable } from '@nestjs/common';

@Injectable()
export class BetService {
    create(createBetDto) {
        // Принимать бет со сверкой по времени
        return 'This action adds a new bet';
    }

    findAll() {
        return `This action returns all bet`;
    }

    findOne(id: number) {
        return `This action returns a #${id} bet`;
    }

    update(id: number, updateBetDto) {
        return `This action updates a #${id} bet`;
    }

    remove(id: number) {
        return `This action removes a #${id} bet`;
    }
}
