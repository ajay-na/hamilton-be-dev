import { ApiProperty } from '@nestjs/swagger';

class VehicleDto {
  @ApiProperty({
    example: '3828650b-ce35-4a1c-b85a-d7d11ce64c57',
    description: 'Unique identifier of the vehicle',
  })
  id: string;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'Custom name or model given to the vehicle',
  })
  name: string | null;

  @ApiProperty({
    example: 10001,
    description: 'Odometer reading of the vehicle',
  })
  odo_reading: number;

  @ApiProperty({ example: 'KL-08Masd', description: 'License plate number' })
  license_plate: string;
}

class UserDto {
  @ApiProperty({
    example: '02301bd5-ccfa-4fe5-b65c-3bee16a87962',
    description: 'Unique identifier of the user',
  })
  id: string;

  @ApiProperty({ example: 'Ajay', description: 'First name of the user' })
  fname: string;

  @ApiProperty({ example: '', description: 'Last name of the user' })
  lname: string;
}

class ServiceHistoryDto {
  @ApiProperty({
    example: '657246d0-c559-4d4a-b1ec-ede55a0c762d',
    description: 'Unique identifier of the history record',
  })
  id: string;

  @ApiProperty({
    example: 'VEHICLE_ARRIVED',
    description: 'Current status workflow step',
  })
  status: string;

  @ApiProperty({
    example: 'scratches over left fendor',
    nullable: true,
    description: 'Additional inspection notes or remarks',
  })
  remarks: string | null;

  @ApiProperty({
    example: '2026-05-16T12:11:13.428652+05:30',
    description: 'Record creation timestamp',
  })
  created_at: string;

  @ApiProperty({
    example: '2026-05-16T12:11:13.428652+05:30',
    description: 'Record update timestamp',
  })
  updated_at: string;
}

export class ServiceTicketDto {
  @ApiProperty({
    example: 'e0eedfd4-5329-48fa-bea7-8d3e24c55870',
    description: 'Unique identifier of the main service ticket',
  })
  id: string;

  @ApiProperty({
    type: () => VehicleDto,
    description: 'Associated vehicle details',
  })
  vehicle: VehicleDto;

  @ApiProperty({
    type: () => UserDto,
    description: 'Associated customer/user details',
  })
  user: UserDto;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'Assigned service advisor',
  })
  advisor: string | null;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'Assigned technician',
  })
  technician: string | null;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'Overall ticket odometer reading override',
  })
  odo_reading: number | null;

  @ApiProperty({
    type: [ServiceHistoryDto],
    description: 'List of timeline events and status updates',
  })
  service_history: ServiceHistoryDto[];
}
