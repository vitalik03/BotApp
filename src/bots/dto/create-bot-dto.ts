
export class CreateBotDto{
    readonly name: string;

    readonly description: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;

    userId: number;
}