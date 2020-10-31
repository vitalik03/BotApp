import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { succesfulDeleting } from '../constants/user-responses'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
	async create(@Body() createUser: CreateUserDto) {
      return await this.userService.create(createUser);
    }
    
    @Get()
    async getUsers(): Promise<IUser[]> {
      return this.userService.getUsers();
    };

    @Get(':id')
    async getById(@Param('id') id: string): Promise<IUser> {
      return await this.userService.getById(id);
    }
    
	@Put(':id')
	async update(@Param('id') id: string, @Body() updateUser: UpdateUserDto): Promise<IUser> {
	  return await this.userService.update(id, updateUser);
    }
    
	@Delete(':id')
	async delete(@Param('id') id:string) {
	  await this.userService.delete(id);
      return succesfulDeleting;
    }
}
