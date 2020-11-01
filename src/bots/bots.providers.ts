import { Connection, Repository } from 'typeorm';
import { Bot } from './bots.entity';

export const botsProviders = [
    {
        provide: 'BOT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Bot),
        inject: ['DATABASE_CONNECTION'],
    },
];