import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database.module';
import { UserService } from './user.service';
import { usersProviders } from './user.providers';
import { UserController } from './user.controller';

@Module({
    imports: [DatabaseModule],
    providers: [UserService, ...usersProviders],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
