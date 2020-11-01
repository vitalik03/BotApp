import { ApiProperty } from "@nestjs/swagger";
export class UpdateBotDto{
    
    @ApiProperty()
    readonly name: string;
    
    @ApiProperty()
    readonly description: string;

    readonly updatedAt: Date;

}