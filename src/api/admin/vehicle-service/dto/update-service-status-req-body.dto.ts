import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

const SERVICE_HISTORY_STATUS_ENUM = [
  'VEHICLE_ARRIVED',
  'JOB_CARD_CREATED',
  'RAMP_ALLOCATED',
  'IN_SERVICE',
  'WORK_COMPLETED',
  'COMPLETED',
];
export class UpdateServiceStatusReqBodyDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'service id of vehicle(UUID)',
  })
  @IsUUID()
  @IsNotEmpty()
  service_record_id: string;

  @ApiProperty({
    example: 'JOB_CARD_CREATED',
    description:
      'status of service (VEHICLE_ARRIVED, JOB_CARD_CREATED, RAMP_ALLOCATED, IN_SERVICE, WORK_COMPLETED, COMPLETED)',
  })
  @IsNotEmpty()
  @IsIn(SERVICE_HISTORY_STATUS_ENUM)
  status: string;

  @ApiPropertyOptional({
    example: 'service completed',
    description: 'specific description to the stage of service',
  })
  @IsString()
  @IsOptional()
  remarks?: string;
}
