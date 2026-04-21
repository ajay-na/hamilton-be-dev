import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class SearchVehicleReqParamDto {
  @ApiProperty({ example: '4a2afb37-2f38-4e93-87d3-5131a1197814' })
  @IsUUID()
  @IsOptional()
  brandId?: string;

  @ApiProperty({ example: 'M5' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
