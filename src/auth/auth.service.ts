import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {
        // this.registration({ email: 'super@admin.email', phone: '', password: '1234qweR' });
    }

    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto);
        const accessToken = this.generateToken(user);

        return {
            accessToken,
        };
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByParams({
            where: { email: userDto.email },
        });

        if (candidate) throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({
            ...userDto,
            password: hashPassword,
        });

        const accessToken = this.generateToken(user);

        return {
            accessToken,
        };
    }

    private generateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
        };

        return this.jwtService.sign(payload);
    }

    private async validateUser(userDto: LoginUserDto) {
        try {
            const user = await this.userService.getUserByParams({
                where: { email: userDto.email },
            });

            const isPasswordEquals = await bcrypt.compare(userDto?.password, user.password);

            if (user && isPasswordEquals) {
                return user;
            }
        } catch (error) {
            throw new HttpException({ message: ['Неправильный email или пароль'] }, HttpStatus.BAD_REQUEST);
        }
    }
}
