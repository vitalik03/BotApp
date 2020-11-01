import { Controller, Request, UseGuards, Body, Post, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserLogin } from '../user/dto/create-user-dto';
import { UserService } from '../user/user.service';

@Controller()
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UserService
    ) {}

    @Post('login')
    async login(@Body() user: UserLogin) {
       return await this.authService.validate(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        const user = req.user;
        const userOne = this.usersService.findOneByEmail(user.email);
        return userOne;
    }

}
