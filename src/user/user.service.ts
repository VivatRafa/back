import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    async findAll() {
        const users = await this.userRepository.find();

        users.forEach((user) => delete user.password);

        return {
            success: true,
            result: users,
        };
    }

    async createUser(сreateUserDto: CreateUserDto) {
        const newUser = new User();
        newUser.email = сreateUserDto.email;
        newUser.password = сreateUserDto.password;
        newUser.phone = сreateUserDto.phone;

        try {
            const user: User = await this.userRepository.save(newUser);
            return user;
        } catch (e) {
            console.error(e);
        }
    }

    async getPersonalInfo({ userId }) {
        const user = await this.getUserByParams({ where: { id: userId } });
        delete user.role;
        delete user.password;
        return {
            success: true,
            result: user,
        };
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async getUserByParams(params: FindOneOptions<User>) {
        const user = await this.userRepository.findOne(params);
        return user;
    }
}
