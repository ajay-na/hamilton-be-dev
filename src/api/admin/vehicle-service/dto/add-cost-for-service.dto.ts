import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum ServiceItemType {
  LABOR = 'labor',
  PART = 'part',
}

export class ServiceItemDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  spare_part_id?: string;

  @ApiProperty()
  @IsString()
  item_name: string;

  @ApiProperty({ enum: ServiceItemType })
  @IsEnum(ServiceItemType, { each: true })
  type: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  unit_price: number;

  @ApiProperty()
  @IsNumber()
  total_price: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}

export class AddCostReqBodyDto {
  @ApiProperty()
  @IsString()
  service_record_id: string;

  @ApiProperty({
    type: () => [ServiceItemDto],
    description: 'Can be a single object or an array of objects',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceItemDto)
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  items: ServiceItemDto[];
}
