import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateSpareDto } from './create-spare.dto';

export class UpdateSpareDto extends PartialType(CreateSpareDto) {
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
