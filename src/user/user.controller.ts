import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { succesfulDeleting } from '../constants/user-responses'
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
  	async create(@Body() createUser: CreateUserDto) {
      return await this.userService.create(createUser);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getById(@Request() req): Promise<IUser> {
      return await this.userService.getById(req.user.userId);
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
	  @Put()
  	async update(@Request() req, @Body() updateUser: UpdateUserDto): Promise<IUser> {
	  return await this.userService.update(req.user.userId, updateUser);
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
	  @Delete()
	  async delete(@Request() req) {
	  await this.userService.delete(req.user.userId);
      return succesfulDeleting;
    }
}
