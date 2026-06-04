import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { DateParamDto } from '../../../../common/dto/date-param.dto';

export class GetCompletedServiceQueryDto extends DateParamDto {
  @ApiProperty({
    example: true,
    description:
      'Filter by invoice generated status, default value is true which fetches data with invoice generated and if false then only fetch data without invoice generated',
  })
  @IsOptional()
  isInvoiceGenerated: boolean = true;
}
