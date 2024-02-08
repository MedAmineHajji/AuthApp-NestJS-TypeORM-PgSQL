import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { UserDto } from './dto/user.dto';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
    ) {}

    
    async getAllUsers(): Promise<User[]> {

        return await this.usersRepo.find();
    }

    async getUserById(id: number): Promise<User> {
        
        const user = await this.usersRepo.findOne({
            where: {
                id: id,
            },
        });

        if(user){
            return user;
        }
        throw new NotFoundException(`User with the Id:${id} NOT FOUND`);
    }

    async createUser(createUserDto: UserDto): Promise<User> {

        const newUser = await this.usersRepo.create(createUserDto);
        await this.usersRepo.save({
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
        });

        return newUser;
    }

    async deleteUserById(id: number): Promise<User> {

        const user = await this.usersRepo.findOne({
            where: {
                id: id,
            },
        });

        if(!user) {
            throw new NotFoundException(`User with the Id:${id} NOT FOUND`); 
        }

        await this.usersRepo.remove(user);
        return user;
    }

}
 