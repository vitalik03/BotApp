import { Module } from '@nestjs/common';
import { from } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BotsModule } from './bots/bots.module';

@Module({
  imports: [UserModule, AuthModule, BotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
