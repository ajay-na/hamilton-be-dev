import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchUserWithMobNo {
  @ApiProperty({ example: '9202434589' })
  @IsString()
  @IsNotEmpty()
  mob!: string;
}

class VehicleDto {
  @ApiProperty({ description: 'Unique identifier for the vehicle' })
  id!: string;

  @ApiProperty({ description: 'Registration number' })
  registration_no!: string;

  @ApiProperty({ description: 'Model or name of the vehicle' })
  name!: string;
}

export class UserVehicleDetailsResponseDto {
  @ApiProperty({ description: 'Unique identifier for the user' })
  id!: string;

  @ApiProperty({ description: 'Username' })
  username!: string;

  @ApiProperty({ description: 'First name' })
  firstname!: string;

  @ApiPropertyOptional({ description: 'Last name', nullable: true })
  lastname?: string | null;

  @ApiProperty({ description: 'Email address' })
  email!: string;

  @ApiPropertyOptional({ description: 'Gender', nullable: true })
  gender?: string | null;

  @ApiPropertyOptional({ description: 'Physical address', nullable: true })
  address?: string | null;

  @ApiProperty({ description: 'URL of the user profile image' })
  image_url!: string;

  @ApiProperty({ description: 'Role identifier', example: 1 })
  role_id!: number;

  @ApiProperty({ description: 'Active status of the user account' })
  is_active!: boolean;

  @ApiProperty({ description: 'ISO string of record creation date' })
  created_at!: string;

  @ApiProperty({ description: 'ISO string of last update date' })
  updated_at!: string;

  @ApiProperty({
    type: [VehicleDto],
    description: 'List of vehicles associated with the user',
  })
  vehicles!: VehicleDto[];
}
