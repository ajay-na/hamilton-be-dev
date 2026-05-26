import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-params.dto';

export class GetAllBrandQueryDTO extends PaginationQueryDto {
  @ApiProperty({ example: 'spare or vehicle', required: false })
  @IsEnum(['vehicle', 'spare'])
  @IsOptional()
  type: string;
}
