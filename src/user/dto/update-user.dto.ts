import { IsEmail, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto{
    @MinLength(3)
    @ApiProperty()
    readonly firstName: string;
    
    @ApiProperty()
    readonly lastName: string;

    @IsEmail()
    @ApiProperty()
    readonly email: string;

    readonly updatedAt: Date;
}