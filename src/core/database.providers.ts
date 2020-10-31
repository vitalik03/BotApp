import { User } from 'src/user/user.entity';
import { createConnection } from 'typeorm';
export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'admin',
            database: 'BotApp',
            entities: [
                User
            ],
            synchronize: true,
        }),
    },
];