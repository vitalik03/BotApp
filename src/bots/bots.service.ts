import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { botNotAllowed, botNotFound } from 'src/constants/bot-responses';
import { Repository } from 'typeorm';
import { Bot } from './bots.entity';
import { CreateBotDto } from './dto/create-bot-dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { IBot } from './interface/bot.interface';

@Injectable()
export class BotsService {
  constructor(
	  @Inject('BOT_REPOSITORY')
    private readonly botRepository: Repository<Bot>) {}

    async create( bot: CreateBotDto ) {
      const entity = Object.assign(new Bot(), bot);
	    return await this.botRepository.save(entity);
    }
  
    async getBots(id: string): Promise<IBot[]> {
      return await this.botRepository.find({ where: { "userId": id } });
    }

    async getById(id: string): Promise<IBot> {
      const testBot = await this.botRepository.findOne(id);
      if(!testBot){
        throw new HttpException(botNotFound, HttpStatus.NOT_FOUND);
      }
      return testBot;
    }
    
	  async update(id: string, updateBot: UpdateBotDto, userId: number): Promise<IBot> {
      const testBot = await this.botRepository.findOne(id);
      if(!testBot){
        throw new HttpException(botNotFound, HttpStatus.NOT_FOUND);
      }
      if(testBot.userId === userId) {
        return await this.botRepository.save({ ...updateBot, id: Number(id) });
      }
      throw new HttpException(botNotAllowed, HttpStatus.METHOD_NOT_ALLOWED)
    }
    
    async delete(id: string, userId: number) {
      const bot = await this.botRepository.findOne(id);
      if(!bot){
        throw new HttpException(botNotFound, HttpStatus.NOT_FOUND);
      }
      if(bot.userId === userId) {
        return await this.botRepository.delete(id);
      }
      throw new HttpException(botNotAllowed, HttpStatus.METHOD_NOT_ALLOWED)
    }

}
