import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class VehicleDto {
  @ApiProperty({
    description: 'Unique identifier for the specific vehicle record',
    example: '3828650b-ce35-4a1c-b85a-d7d11ce64c57',
  })
  id: string;

  @ApiProperty({
    description: 'The registration/license plate number of the vehicle',
    example: 'KL-08Masd',
  })
  license_plate: string;

  @ApiProperty({
    description: 'The odometer reading at check-in',
    example: 10001,
  })
  odo_reading: number;
}

class ServiceHistoryDto {
  @ApiProperty({
    description: 'Unique identifier for this specific history milestone log',
    example: '91c8fe4b-6559-45dd-b13a-22b8c60c1965',
  })
  id: string;

  @ApiProperty({
    description: 'The specific event state achieved',
    example: 'VEHICLE_ARRIVED',
  })
  status: string;

  @ApiPropertyOptional({
    description:
      'Additional internal notes or comments regarding this milestone',
    example: null,
    nullable: true,
  })
  remarks: string | null;

  @ApiProperty({
    description: 'Timestamp showing when this milestone was originally logged',
    example: '2026-06-19T22:53:25.508351+05:30',
  })
  created_at: string;

  @ApiProperty({
    description: 'Timestamp showing when this milestone log was last updated',
    example: '2026-06-19T22:53:25.508351+05:30',
  })
  updated_at: string;
}

export class LiveServiceRecordResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the service record',
    example: '59232a69-a16a-4ee5-a1e2-f25433eecdd8',
  })
  id: string;

  @ApiProperty({
    type: () => VehicleDto,
    description: 'Details of the vehicle tied to this service',
  })
  vehicle: VehicleDto;

  @ApiProperty({
    description: 'The timestamp when the vehicle entered the service center',
    example: '2026-06-22T06:41:13.428Z',
  })
  service_in_time: string;

  @ApiPropertyOptional({
    description: 'The timestamp when the service was completed',
    example: null,
    nullable: true,
  })
  service_out_time: string | null;

  @ApiProperty({
    description: 'Current status of the service workflow',
    example: 'in_progress',
  })
  service_status: string;

  @ApiProperty({
    description: 'Total cost incurred for labor',
    example: '0.00',
  })
  total_labor_cost: string;

  @ApiProperty({
    description: 'Total cost incurred for replacement parts',
    example: '0.00',
  })
  total_parts_cost: string;

  @ApiProperty({
    description: 'The total billable amount',
    example: '0.00',
  })
  grand_total: string;

  @ApiProperty({
    type: () => [ServiceHistoryDto],
    description: 'Timeline array tracking status changes for the service',
  })
  service_history: ServiceHistoryDto[];
}
