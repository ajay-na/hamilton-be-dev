import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class ServiceDetailsDto {
  @ApiProperty({ example: '2026-04-22T15:40:11.063+05:30' })
  last_service_date!: string;

  @ApiProperty({
    example: '04:30:00',
    description: 'Postgres Interval as string',
  })
  avrg_service_duration!: string;

  @ApiProperty({
    example: '03:00:00',
    description: 'Postgres Interval as string',
  })
  last_service_duration!: string;
}

export class VehicleResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  nickname!: string;

  @ApiProperty()
  brand_name!: string;

  @ApiProperty()
  image_url!: string;

  @ApiPropertyOptional({ nullable: true })
  note!: string | null;

  @ApiProperty()
  license_plate!: string;

  @ApiProperty()
  manufactured_year!: string;

  @ApiProperty()
  odo_reading!: number;

  @ApiProperty({ format: 'uuid' })
  m_vehicle_id!: string;

  @ApiProperty({ format: 'uuid' })
  t_user_id!: string;

  @ApiProperty({ type: ServiceDetailsDto })
  service_details!: ServiceDetailsDto;

  @ApiProperty({ format: 'uuid' })
  created_by!: string;

  @ApiProperty({ format: 'uuid' })
  updated_by!: string;

  @ApiProperty()
  created_at!: string;

  @ApiProperty()
  updated_at!: string;

  @ApiProperty()
  is_active!: boolean;
}
