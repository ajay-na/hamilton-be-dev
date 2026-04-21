import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class BrandIdDto {
  @ApiProperty({ example: '4a2afb37-2f38-4e93-87d3-5131a1197814' })
  @IsUUID()
  @IsNotEmpty()
  brandId!: string;
}

export class GetVehicleByBrandSuccessDTO {
  @ApiProperty({ example: '4a2afb37-2f38-4e93-87d3-5131a1197814' })
  id!: string;
  @ApiProperty({ example: 'BMW M5' })
  name!: string;
}
