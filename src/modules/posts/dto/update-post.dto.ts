import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class UpdatePostDto {
    @ApiProperty({ example: 'Mensaje a editar' })
    @IsString()
    @MinLength(1)
    message: string;
}
