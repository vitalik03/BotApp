import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { succesfulDeleting } from 'src/constants/bot-responses';
import { BotsService } from './bots.service';
import { CreateBotDto } from './dto/create-bot-dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { IBot } from './interface/bot.interface';
import { ApiConsumes, ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('bots')
@Controller('bots')
export class BotsController {
  constructor(private readonly botService: BotsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createBot: CreateBotDto,@Request() req) {
    createBot.userId = req.user.userId;
    return await this.botService.create(createBot);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getBots(@Request() req): Promise<IBot[]> {
    return this.botService.getBots(req.user.userId);
  };

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getById(@Param('id') id: string): Promise<IBot> {
    return await this.botService.getById(id);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
	@Put(':id')
  async update(@Param('id') id: string, @Body() updateBot: UpdateBotDto, @Request() req): Promise<IBot> {
	  return await this.botService.update(id, updateBot, req.user.userId);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
	@Delete(':id')
	async delete(@Param('id') id:string, @Request() req) {
	  await this.botService.delete(id, req.user.userId);
      return succesfulDeleting;
  }
}
