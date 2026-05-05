import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class SearchBrandByNameDto {
  @ApiProperty({ example: 'bmw', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'vehicle',
    enum: ['vehicle', 'spare'],
    required: false,
  })
  @IsEnum(['vehicle', 'spare'], {
    message: (args) =>
      `type must be one of the following values: ${Object.values(['vehicle', 'spare']).join(', ')}`,
  })
  @IsOptional()
  type?: ['vehicle', 'spare'];
}
