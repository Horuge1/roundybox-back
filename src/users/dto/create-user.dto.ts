import { Exclude } from "class-transformer";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @IsString()    
    username: string;

    @IsString()   
    @IsEmail() 
    email: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string;
}
