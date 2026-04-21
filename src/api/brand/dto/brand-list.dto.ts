import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../../../common/dto/pagination-response.dto';
import { UserMinifiedDto } from '../../../common/dto/user-basic.dto';

class BrandDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: 'Toyota' })
  name!: string;

  @ApiProperty({ example: 'TYT', nullable: true })
  short_form!: string;

  @ApiProperty({ example: 'https://cdn.example.com/logo.png', nullable: true })
  brand_logo!: string;

  @ApiProperty({ example: 'Car', nullable: true })
  type!: string;

  @ApiProperty({ example: 'Main manufacturer', nullable: true })
  note!: string;

  @ApiProperty({ type: UserMinifiedDto })
  created_by!: UserMinifiedDto;

  @ApiProperty({ type: UserMinifiedDto })
  updated_by!: UserMinifiedDto;

  @ApiProperty({ example: '2023-10-27T10:00:00Z' })
  created_at!: Date;

  @ApiProperty({ example: '2023-10-27T10:00:00Z' })
  updated_at!: Date;

  @ApiProperty({ example: true })
  is_active!: boolean;
}

export class GetAllBrandDto {
  @ApiProperty({ example: BrandDto, isArray: true })
  brand!: BrandDto[];
  @ApiProperty({ example: 10 })
  pagination!: PaginationMetaDto;
}
