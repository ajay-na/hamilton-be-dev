import { ApiProperty } from '@nestjs/swagger';

class VehicleDetailsDto {
  @ApiProperty({ example: '3828650b-ce35-4a1c-b85a-d7d11ce64c57' })
  id: string;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'Model or display name of the vehicle',
  })
  name: string | null;

  @ApiProperty({ example: 10001 })
  odo_reading: number;

  @ApiProperty({ example: 'KL-08Masd' })
  license_plate: string;
}

class UserDetailsDto {
  @ApiProperty({ example: '02301bd5-ccfa-4fe5-b65c-3bee16a87962' })
  id: string;

  @ApiProperty({ example: 'Ajay' })
  fname: string;

  @ApiProperty({ example: '' })
  lname: string;
}

class ServiceTimelineDto {
  @ApiProperty({ example: '657246d0-c559-4d4a-b1ec-ede55a0c762d' })
  id: string;

  @ApiProperty({ example: 'VEHICLE_ARRIVED' })
  status: string;

  @ApiProperty({ example: 'scratches over left fendor', nullable: true })
  remarks: string | null;

  @ApiProperty({ example: '2026-05-16T12:11:13.428652+05:30' })
  created_at: string;

  @ApiProperty({ example: '2026-05-16T12:11:13.428652+05:30' })
  updated_at: string;
}

class ServiceLineItemDto {
  @ApiProperty({ example: '6dc3586c-d617-42c4-a4f3-b2b5e9c83fc0' })
  id: string;

  @ApiProperty({ example: null, nullable: true })
  note: string | null;

  @ApiProperty({
    example: 'part',
    description: 'Item type: e.g., part or labor',
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

export class ServiceRecordDetailResponseDto {
  @ApiProperty({
    example: 'e0eedfd4-5329-48fa-bea7-8d3e24c55870',
    description: 'Service Record ID',
  })
  id: string;

  @ApiProperty({ type: () => VehicleDetailsDto })
  vehicle: VehicleDetailsDto;

  @ApiProperty({ type: () => UserDetailsDto })
  user: UserDetailsDto;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'Assigned service advisor details',
  })
  advisor: any | null;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'Assigned technician details',
  })
  technician: any | null;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'Odometer reading at job opening',
  })
  odo_reading: number | null;

  @ApiProperty({ type: () => [ServiceTimelineDto] })
  service_history: ServiceTimelineDto[];

  @ApiProperty({ type: () => [ServiceLineItemDto] })
  service_items: ServiceLineItemDto[];
}
