import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AtLeastOne } from '../../../../common/decorators/at-least-one.decorator';
import { ServiceItemType } from './add-cost-for-service.dto';

@AtLeastOne()
export class UpdateCostReqBodyDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  spare_part_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  item_name?: string;

  @ApiPropertyOptional({ enum: ServiceItemType })
  @IsOptional()
  @IsEnum(ServiceItemType)
  type?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  unit_price?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  total_price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}
