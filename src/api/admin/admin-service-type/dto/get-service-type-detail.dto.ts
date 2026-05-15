import { ApiProperty } from '@nestjs/swagger';

export class UserMiniDto {
  @ApiProperty({ type: String, nullable: true, example: null })
  id: string | null;

  @ApiProperty({ type: String, nullable: true, example: null })
  fname: string | null;

  @ApiProperty({ type: String, nullable: true, example: null })
  lname: string | null;
}

export class ServiceTypeDetailDto {
  @ApiProperty({
    description: 'Unique identifier of the service type',
    example: '95c493fc-1e62-41cb-9d00-600d4019c083',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the service',
    example: 'tyre work',
  })
  name: string;

  @ApiProperty({
    description: 'Maximum capacity for this service',
    example: 1,
  })
  capacity: number;

  @ApiProperty({
    description: 'image url of the service',
    example: 'https://avatar.url/image.png',
  })
  image_url: string;

  @ApiProperty({
    description:
      'Approximate time required to complete the service (in hours/minutes depending on your business logic)',
    example: 1,
  })
  approx_service_time: number;

  @ApiProperty({
    description: 'Indicates if the service is currently active and available',
    example: true,
  })
  is_active: boolean;

  @ApiProperty({
    type: String,
    nullable: true,
    description: 'Detailed description of the tyre work',
    example: null,
  })
  description: string | null;

  @ApiProperty({
    type: () => UserMiniDto,
    description: 'Details of the user who created this record',
  })
  created_by: UserMiniDto;

  @ApiProperty({
    type: () => UserMiniDto,
    description: 'Details of the user who last updated this record',
  })
  updated_by: UserMiniDto;

  @ApiProperty({
    description: 'Timestamp when the record was created',
    example: '2026-05-06T17:57:46.587Z',
  })
  created_at: string;

  @ApiProperty({
    description: 'Timestamp when the record was last updated',
    example: '2026-05-06T17:57:46.587Z',
  })
  updated_at: string;
}
