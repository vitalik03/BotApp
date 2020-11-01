import { IsNotEmpty, IsEmail, IsString, MinLength, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto{
    @MinLength(3)
    @IsNotEmpty()
    @ApiProperty()
    readonly firstName: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty()
    readonly lastName: string;

    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty()
    password: string;
    
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;
}

export class UserLogin {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;
  
    @MinLength(8)
    @IsNotEmpty()
    @ApiProperty()
    readonly password: string;
  
  }