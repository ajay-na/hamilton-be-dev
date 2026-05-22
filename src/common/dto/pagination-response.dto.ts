import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({
    description:
      'The total number of items available across all pages matching the query filter.',
    example: 150,
  })
  total_items!: number;

  @ApiProperty({
    description: 'The maximum number of items requested per page.',
    example: 10,
  })
  limit!: number;

  @ApiProperty({
    description:
      'The number of items to skip before starting to return rows (usually calculated as: page * limit).',
    example: 0,
  })
  offset!: number;
}
