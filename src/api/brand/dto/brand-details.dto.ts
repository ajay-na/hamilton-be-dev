import { ApiProperty } from '@nestjs/swagger';
import { UserMinifiedDto } from '../../../common/dto/user-basic.dto';

class RelatedItemDto {
  @ApiProperty({ example: '4a2afb37-2f38-4e93-87d3-5131a1197814' })
  id!: string;

  @ApiProperty({ example: 'Innova' })
  name!: string;

  @ApiProperty({
    example: 'https://images.unsplash.com/...',
    nullable: true,
  })
  image_url!: string;
}

export class BrandDetailResponseDto {
  @ApiProperty({ example: '4729f632-8e1d-4c5a-b924-f7b822d6316a' })
  id!: string;

  @ApiProperty({ example: 'Toyota Motor Corp' })
  name!: string;

  @ApiProperty({ example: 'TOYOTA' })
  short_form!: string;

  @ApiProperty({ example: 'https://example.com/logos/toyota.png' })
  brand_logo!: string;

  @ApiProperty({ example: 'Leading Japanese automobile manufacturer.' })
  note!: string;

  @ApiProperty({ example: true })
  is_active!: boolean;

  @ApiProperty({ example: 'vehicle', enum: ['vehicle', 'spare'] })
  type!: string;

  @ApiProperty({ type: [RelatedItemDto] })
  related_items!: RelatedItemDto[];

  @ApiProperty({ type: UserMinifiedDto })
  created_by!: UserMinifiedDto;

  @ApiProperty({ type: UserMinifiedDto })
  updated_by!: UserMinifiedDto;

  @ApiProperty({ example: '2026-04-07T06:57:05.422Z' })
  created_at!: Date;

  @ApiProperty({ example: '2026-04-07T06:57:05.422Z' })
  updated_at!: Date;
}

export class BrandDetailResponseDBDto {
  @ApiProperty({ example: '4729f632-8e1d-4c5a-b924-f7b822d6316a' })
  id!: string;

  total_count!: string;

  @ApiProperty({ example: 'Toyota Motor Corp' })
  name!: string;

  @ApiProperty({ example: 'TOYOTA' })
  short_form!: string;

  @ApiProperty({ example: 'https://example.com/logos/toyota.png' })
  brand_logo!: string;

  @ApiProperty({ example: 'Leading Japanese automobile manufacturer.' })
  note!: string;

  @ApiProperty({ example: true })
  is_active!: boolean;

  @ApiProperty({ example: 'vehicle', enum: ['vehicle', 'spare'] })
  type!: string;

  @ApiProperty({ type: [RelatedItemDto] })
  related_items!: RelatedItemDto[];

  @ApiProperty({ type: UserMinifiedDto })
  created_by!: UserMinifiedDto;

  @ApiProperty({ type: UserMinifiedDto })
  updated_by!: UserMinifiedDto;

  @ApiProperty({ example: '2026-04-07T06:57:05.422Z' })
  created_at!: Date;

  @ApiProperty({ example: '2026-04-07T06:57:05.422Z' })
  updated_at!: Date;
}
