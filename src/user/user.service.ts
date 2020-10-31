import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUser } from './interface/user.interface';
import { Repository} from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import {userNotFound, existingEmail} from '../constants/user-responses';

@Injectable()
export class UserService {
    constructor(
		@Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>) {}

    async create( user: CreateUserDto ) {
	  const testUser = await this.userRepository.findOne({ where: [{ "email": user.email }]});
	  if( testUser ){
		throw new HttpException(existingEmail, HttpStatus.FOUND);
	  }
      const entity = Object.assign(new User(), user);
	  return await this.userRepository.save(entity);
   }
  
    async getUsers(): Promise<IUser[]> {
      const users = await this.userRepository.find();
      return users;
    }

    async getById(id:string): Promise<IUser> {
      const testUser = await this.userRepository.findOne(id);
      if(!testUser){
        throw new HttpException(userNotFound, HttpStatus.NOT_FOUND);
      }
      return await this.userRepository.findOne(id);
    }
    
	async update(id: string, updateUser: UpdateUserDto): Promise<IUser> {
      const testUser = await this.userRepository.findOne(id);
      if(!testUser){
        throw new HttpException(userNotFound, HttpStatus.NOT_FOUND);
      }
      return await this.userRepository.save({ ...updateUser, id: Number(id) });
    }
    
    async delete(id: string) {
      const user = await this.userRepository.findOne(id);
      if(!user){
        throw new HttpException(userNotFound, HttpStatus.NOT_FOUND);
      }
      return await this.userRepository.delete(id);
    }

    async findOneByEmail(email: string):Promise<User> {
      const userFind = await this.userRepository.findOne({
        where: [{ "email": email }]});
	  return userFind;
    }
    
}
