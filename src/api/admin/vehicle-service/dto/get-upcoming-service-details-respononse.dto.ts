import { ApiProperty } from '@nestjs/swagger';

class SlotTimingDto {
  @ApiProperty({
    example: 'f7d3e709-ca28-4e19-b7ba-1b77322256b0',
    description: 'Unique identifier for the slot timing',
  })
  id: string;

  @ApiProperty({
    example: '08:00',
    description: 'The start time of the service slot',
  })
  slot_timing: string;
}

class UserDto {
  @ApiProperty({
    example: '02301bd5-ccfa-4fe5-b65c-3bee16a87962',
    description: 'Unique identifier for the user',
  })
  id: string;

  @ApiProperty({
    example: 'Ajay',
    description: 'First name of the customer',
  })
  fname: string;

  @ApiProperty({
    example: '',
    description: 'Last name of the customer',
    required: false,
  })
  lname: string;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'Mobile number of the user',
    required: false,
  })
  mob_no: string | null;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'WhatsApp contact number',
    required: false,
  })
  whataspp_no: string | null;
}

class VehicleDto {
  @ApiProperty({
    example: '3828650b-ce35-4a1c-b85a-d7d11ce64c57',
    description: 'Unique identifier for the vehicle',
  })
  id: string;

  @ApiProperty({
    example: 'KL-08Masd',
    description: 'License plate or registration number of the vehicle',
  })
  license_plate: string;

  @ApiProperty({
    example: 10001,
    description: 'Odometer reading at the time of booking',
  })
  odo_reading: number;
}

export class UpcomingServiceResponseDto {
  @ApiProperty({
    example: '6e76f0b8-cc00-4bcb-a0fa-21571c28c822',
    description: 'Unique identifier for the booking',
  })
  id: string;

  @ApiProperty({
    example: '2026-05-11',
    description: 'Date scheduled for the booking (YYYY-MM-DD)',
  })
  booking_date: string;

  @ApiProperty({
    type: () => SlotTimingDto,
    description: 'Details about the chosen time slot',
  })
  slot_timing: SlotTimingDto;

  @ApiProperty({
    example: 'just normal service',
    description: 'Customer notes or descriptions about the service needed',
  })
  description: string;

  @ApiProperty({
    type: () => UserDto,
    description: 'Information about the user who made the booking',
  })
  user: UserDto;

  @ApiProperty({
    type: () => VehicleDto,
    description: 'Details of the vehicle tied to the booking',
  })
  vehicle: VehicleDto;

  @ApiProperty({
    example: 'confirmed',
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    description: 'Current operational status of the booking',
  })
  status: string;
}
