import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import User from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers(): Promise<User[]> {

        const users = await this.usersService.getAllUsers();
        return users;
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {

        const user = await this.usersService.getUserById(Number(id));
        return user;
    }

    @Post()
    async createUser(@Body() createUserDto: UserDto): Promise<User> {
        return await this.usersService.createUser(createUserDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteUserById(@Param('id') id:string): Promise<User> {
        return await this.usersService.deleteUserById(Number(id));
    }
}
