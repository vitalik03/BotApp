import { ApiProperty } from "@nestjs/swagger";

export class CreateBotDto{
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly description: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;

    userId: number;
}