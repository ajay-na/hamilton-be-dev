import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchBrandByNameDto {
  @ApiProperty({ example: 'bmw' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
