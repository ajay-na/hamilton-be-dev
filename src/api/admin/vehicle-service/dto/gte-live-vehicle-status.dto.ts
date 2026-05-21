import { ApiProperty } from '@nestjs/swagger';

class VehicleDto {
  @ApiProperty({
    example: '3828650b-ce35-4a1c-b85a-d7d11ce64c57',
    description: 'The unique identifier of the vehicle',
  })
  id: string;

  @ApiProperty({
    example: 'KL-08Masd',
    description: 'The vehicle registration/license plate number',
  })
  license_plate: string;

  @ApiProperty({
    example: 10001,
    description: 'Current odometer reading in kilometers or miles',
  })
  odo_reading: number;
}

class UserDto {
  @ApiProperty({
    example: '02301bd5-ccfa-4fe5-b65c-3bee16a87962',
    description: 'The unique identifier of the user',
  })
  id: string;

  @ApiProperty({
    example: 'Ajay',
    description: 'First name of the user',
  })
  fname: string;

  @ApiProperty({
    example: '',
    description: 'Last name of the user',
    required: false,
  })
  lname: string;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'Mobile number of the user',
  })
  mob_no: string | null;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'WhatsApp number of the user',
  })
  whataspp_no: string | null;
}

class ServiceHistoryDto {
  @ApiProperty({
    example: '657246d0-c559-4d4a-b1ec-ede55a0c762d',
    description: 'Unique identifier for this history log entry',
  })
  id: string;

  @ApiProperty({
    example: 'VEHICLE_ARRIVED',
    enum: [
      'VEHICLE_ARRIVED',
      'JOB_CARD_CREATED',
      'RAMP_ALLOCATED',
      'IN_SERVICE',
      'WORK_COMPLETED',
      'COMPLETED',
    ],
    description: 'Current status step in the service lifecycle',
  })
  status: string;

  @ApiProperty({
    example: 'scratches over left fendor',
    nullable: true,
    description: 'Additional notes or remarks regarding the service step',
  })
  remarks: string | null;

  @ApiProperty({
    example: '2026-05-16T12:11:13.428652+05:30',
    description: 'Timestamp when the status was logged',
  })
  created_at: string;

  @ApiProperty({
    example: '2026-05-16T12:11:13.428652+05:30',
    description: 'Timestamp when the status was last updated',
  })
  updated_at: string;
}

export class ServiceRecordResponseDto {
  @ApiProperty({
    example: 'e0eedfd4-5329-48fa-bea7-8d3e24c55870',
    description: 'The unique identifier of the main service record',
  })
  id: string;

  @ApiProperty({
    type: () => VehicleDto,
    description: 'Details of the vehicle tied to the service',
  })
  vehicle: VehicleDto;

  @ApiProperty({
    type: () => UserDto,
    description: 'Details of the customer/user',
  })
  user: UserDto;

  @ApiProperty({
    type: () => ServiceHistoryDto,
    isArray: true,
    description: 'Timeline logs of the service history statuses',
  })
  service_history: ServiceHistoryDto[];
}
