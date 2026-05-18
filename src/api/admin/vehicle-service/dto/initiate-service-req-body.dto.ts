import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class InitiateServiceReqBodyDto {
  @ApiProperty({
    example: 'c91899ab-20ad-4d29-86d0-123456789012',
    description: 'vehicle id ',
  })
  @IsUUID()
  @IsNotEmpty()
  vehicle: string;

  @ApiProperty({
    example: 'c91899ab-20ad-4d29-86d0-123456789012',
    description: 'user id',
  })
  @IsUUID()
  @IsNotEmpty()
  user: string;

  @ApiPropertyOptional({
    example: 'c91899ab-20ad-4d29-86d0-123456789012',
    description: 'slot id',
  })
  @IsOptional()
  @IsUUID()
  slot: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  odo_reading: number;

  @ApiPropertyOptional({ example: 'note specifically for whole service' })
  @IsString()
  @IsOptional()
  note: string;

  @ApiPropertyOptional({
    example: 'c91899ab-20ad-4d29-86d0-123456789012',
    description: 'advisor user id',
  })
  @IsOptional()
  @IsUUID()
  advisor: string;

  @ApiPropertyOptional({
    example: 'c91899ab-20ad-4d29-86d0-123456789012',
    description: 'technician user id',
  })
  @IsOptional()
  @IsUUID()
  technician: string;

  @ApiPropertyOptional({ example: 'remarks specifically for status change' })
  @IsString()
  @IsOptional()
  remarks: string;
}
