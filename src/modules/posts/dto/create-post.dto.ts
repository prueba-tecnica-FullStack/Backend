import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Mi primer post' })
  @IsString()
  @MinLength(1)
  message: string;
}
