import { ApiProperty } from '@nestjs/swagger';

class SlotTimingDto {
  @ApiProperty({
    example: 'f7d3e709-ca28-4e19-b7ba-1b77322256b0',
    description: 'Unique slot ID',
  })
  id: string;

  @ApiProperty({ example: '08:00', description: 'Scheduled slot time' })
  slot_timing: string;
}

class UserDto {
  @ApiProperty({ example: '02301bd5-ccfa-4fe5-b65c-3bee16a87962' })
  id: string;

  @ApiProperty({ example: 'Ajay' })
  fname: string;

  @ApiProperty({ example: '' })
  lname: string;

  @ApiProperty({ example: null, nullable: true })
  mob_no: string | null;

  @ApiProperty({ example: null, nullable: true })
  whataspp_no: string | null;
}

class VehicleDto {
  @ApiProperty({ example: '3828650b-ce35-4a1c-b85a-d7d11ce64c57' })
  id: string;

  @ApiProperty({
    example: 'KL-08Masd',
    description: 'Vehicle registration number',
  })
  license_plate: string;

  @ApiProperty({
    example: 10001,
    description: 'Odometer reading in kilometers',
  })
  odo_reading: number;
}

class ServiceHistoryDto {
  @ApiProperty({ example: '657246d0-c559-4d4a-b1ec-ede55a0c762d' })
  id: string;

  @ApiProperty({
    example: 'VEHICLE_ARRIVED',
    description: 'Internal lifecycle status',
  })
  status: string;

  @ApiProperty({ example: null, nullable: true })
  remarks: string | null;

  @ApiProperty({ example: '2026-05-16T12:11:13.428652+05:30' })
  created_at: string;

  @ApiProperty({ example: '2026-05-16T12:11:13.428652+05:30' })
  updated_at: string;
}

class ServiceItemDto {
  @ApiProperty({ example: '6dc3586c-d617-42c4-a4f3-b2b5e9c83fc0' })
  id: string;

  @ApiProperty({ example: null, nullable: true })
  note: string | null;

  @ApiProperty({
    example: 'part',
    description: 'Item classification (e.g., part, labor)',
  })
  type: string;

  @ApiProperty({ example: 1 })
  quantity: number;

  @ApiProperty({ example: 'labour charge' })
  item_name: string;

  @ApiProperty({ example: 100 })
  unit_price: number;

  @ApiProperty({ example: 100 })
  total_price: number;
}

export class ServiceRecordResponseDto {
  @ApiProperty({
    example: 'afb68e5d-e5ee-4890-9420-7cf1642fdd56',
    description: 'Booking ID',
  })
  id: string;

  @ApiProperty({ example: '2026-05-11', description: 'Date of the booking' })
  booking_date: string;

  @ApiProperty({ type: () => SlotTimingDto })
  slot_timing: SlotTimingDto;

  @ApiProperty({
    example: 'just normal service',
    description: 'Customer notes or issue description',
  })
  description: string;

  @ApiProperty({ type: () => UserDto })
  user: UserDto;

  @ApiProperty({ type: () => VehicleDto })
  vehicle: VehicleDto;

  @ApiProperty({
    example: 'service_completed',
    description: 'Overall job standing',
  })
  status: string;

  @ApiProperty({
    type: () => [ServiceHistoryDto],
    description: 'Timeline tracking states',
  })
  service_history: ServiceHistoryDto[];

  @ApiProperty({
    type: () => [ServiceItemDto],
    description: 'Line items billed or tracked',
  })
  service_items: ServiceItemDto[];
}
