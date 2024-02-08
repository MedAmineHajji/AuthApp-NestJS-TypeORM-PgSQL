import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
        private jwtService: JwtService,
    ) {}


    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {

        const { name, email, password } = signUpDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.usersRepo.create({
            name,
            email,
            password: hashedPassword
        });

        await this.usersRepo.save(user);

        const token = this.jwtService.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        });

        return { token }
    }

    async logIn(logInDto: LoginDto): Promise <{ token: string }> {

        const { email, password } = logInDto;

        const user = await this.usersRepo.findOne({
            where: {
                email
            }
        });

        if(!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.jwtService.sign({ id: user.id });

        return { token };
    }
}
