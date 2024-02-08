import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }

    @Post('/login')
    logIn(@Body() logInDto: LoginDto): Promise< { token: string }> {
        return this.authService.logIn(logInDto);
    }

}
