import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class UserVehicleResponseDto {
  @ApiProperty({ example: '64f1c2af-ff9b-4996-8aaa-67d542edd9bb' })
  @IsUUID()
  id!: string;

  @ApiProperty({ example: 'Golf', description: 'Model name from master table' })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'Weekend Cruiser',
    description: 'User-defined nickname',
  })
  @IsString()
  nickname!: string;

  @ApiProperty({ example: 'Volkswagen Group' })
  @IsString()
  brand_name!: string;

  @ApiProperty({
    example: 'https://example.com/images/car2.jpg',
    nullable: true,
  })
  @IsOptional()
  @IsUrl()
  image_url!: string | null;

  @ApiProperty({ example: 'Used for highway trips.', nullable: true })
  @IsOptional()
  @IsString()
  note!: string | null;

  @ApiProperty({ example: 'kl07a111' })
  @IsString()
  license_plate!: string;

  @ApiProperty({ example: '2017' })
  @IsString()
  manufactured_year!: string;

  @ApiProperty({ example: 20222 })
  @IsNumber()
  odo_reading!: number;

  @ApiProperty({ example: '7637790d-a95a-4da2-8ebb-64cf31bec934' })
  @IsUUID()
  m_vehicle_id!: string;

  @ApiProperty({ example: '5a76f1ee-bc45-4132-8c9b-25cffb3b8eec' })
  @IsUUID()
  t_user_id!: string;

  @ApiProperty({ example: '5a76f1ee-bc45-4132-8c9b-25cffb3b8eec' })
  @IsUUID()
  created_by!: string;

  @ApiProperty({ example: '5a76f1ee-bc45-4132-8c9b-25cffb3b8eec' })
  @IsUUID()
  updated_by!: string;

  @ApiProperty({ example: '2026-04-08T18:12:46.928Z' })
  @IsISO8601()
  created_at!: string;

  @ApiProperty({ example: '2026-04-08T18:12:46.928Z' })
  @IsISO8601()
  updated_at!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_active!: boolean;
}
