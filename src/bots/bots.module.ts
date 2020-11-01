import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database.module';
import { BotsController } from './bots.controller';
import { botsProviders } from './bots.providers';
import { BotsService } from './bots.service';

@Module({
    imports: [DatabaseModule],
    providers: [BotsService, ...botsProviders],
    controllers: [BotsController],
    exports: [BotsService]
})
export class BotsModule {}
