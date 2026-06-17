import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class VehicleServiceDto {
  @ApiProperty({
    description: 'The unique identifier (UUID) of the service record',
    example: 'e0eedfd4-5329-48fa-bea7-8d3e24c55870',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The date when the service was performed (YYYY-MM-DD)',
    example: '2026-05-26',
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  service_date: string;

  @ApiProperty({
    description: 'The total cost of the service formatted as a string decimal',
    example: '0.00',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  grand_total: string;

  @ApiProperty({
    description: 'The unique identifier (UUID) of the vehicle',
    example: '3828650b-ce35-4a1c-b85a-d7d11ce64c57',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  vehicle_id: string;

  @ApiProperty({
    description: 'The odometer reading of the vehicle at the time of service',
    example: 10001,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  odo_reading: number;

  @ApiProperty({
    description: 'The model or name of the vehicle',
    example: 'camry',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  vehicle_name: string;
}
