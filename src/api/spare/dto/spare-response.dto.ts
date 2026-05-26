import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SpareBrandDto {
  @ApiProperty({ example: '18e27405-d9cb-4fa1-bc62-3928a50f16d3' })
  id: string;

  @ApiProperty({ example: 'brembo s.p.a.' })
  name: string;

  @ApiPropertyOptional({ example: 'https://example.com/logos/brembo.png' })
  image_url: string | null;
}

export class SpareResponseDto {
  @ApiProperty({ example: 'e94fc980-5d18-48e4-a74a-e4c1c193a235' })
  id: string;

  @ApiProperty({ example: 'front ball bearing' })
  name: string;

  @ApiPropertyOptional({ example: null, nullable: true })
  image_url: string | null;

  @ApiPropertyOptional({ example: null, nullable: true })
  price: number | null;

  @ApiPropertyOptional({ example: null, nullable: true })
  note: string | null;

  @ApiProperty({ type: () => SpareBrandDto })
  m_brand: SpareBrandDto;

  @ApiProperty({ example: '0b8ccaa4-3ea3-4b60-b97e-4274c9124069' })
  created_by: string;

  @ApiProperty({ example: '0b8ccaa4-3ea3-4b60-b97e-4274c9124069' })
  updated_by: string;

  @ApiProperty({ example: '2026-05-25T05:18:22.065Z' })
  created_at: Date;

  @ApiProperty({ example: '2026-05-25T05:18:22.065Z' })
  updated_at: Date;
}
