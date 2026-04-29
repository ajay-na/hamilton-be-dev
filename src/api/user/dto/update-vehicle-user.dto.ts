import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { AtLeastOne } from '../../../common/decorators/at-least-one.decorator';

@AtLeastOne()
export class UpdateUserVehicleDto {
  @ApiPropertyOptional({
    example: 'Weekend Cruiser',
    description: 'User-defined nickname for the vehicle',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '7637790d-a95a-4da2-8ebb-64cf31bec934',
    description: 'The master vehicle ID from the m_vehicle table',
  })
  @IsUUID()
  @IsOptional()
  vehicle_id?: string;

  @ApiProperty({ example: 'KL-07-AB-1234' })
  @IsString()
  @IsOptional()
  license_plate?: string;

  @ApiPropertyOptional({
    example: 20222,
    description: 'Current odometer reading',
  })
  @IsNumber()
  @IsOptional()
  odo_reading?: number;

  @ApiPropertyOptional({ example: 'Main bike for weekend trips' })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({ example: 2017 })
  @IsNumber()
  @IsOptional()
  manufactured_year?: number;
}
