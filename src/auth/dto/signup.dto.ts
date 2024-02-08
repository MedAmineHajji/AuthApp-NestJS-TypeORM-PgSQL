import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "Please Enter Correct Email" })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    password: string;

}