import { IsNotEmpty, IsEmail, IsString, MinLength, IsOptional } from "class-validator";

export class CreateUserDto{
    @MinLength(3)
    @IsNotEmpty()
    readonly firstName: string;
    
    @IsString()
    @IsOptional()
    readonly lastName: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
    
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;
}

export class UserLogin {

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
  
    @MinLength(8)
    @IsNotEmpty()
    readonly password: string;
  
  }