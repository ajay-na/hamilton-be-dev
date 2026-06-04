import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class ServiceItemDto {
  @ApiProperty({
    description: 'Unique identifier of the service item',
    example: 'b151c334-354b-4b14-9b2d-e9a32a53d0f1',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the item as entered',
    example: 'brake pad',
  })
  item_name: string;

  @ApiProperty({
    description: 'Type classification of the item',
    enum: ['part', 'labour'],
    example: 'part',
  })
  type: 'part' | 'labour';

  @ApiPropertyOptional({
    description: 'Master spare part catalog name',
    example: 'Brake Pad Set',
    nullable: true,
  })
  spare_name: string | null;

  @ApiPropertyOptional({
    description: 'Full name of the manufacturing brand',
    example: 'brembo s.p.a.',
    nullable: true,
  })
  brand_name: string | null;

  @ApiPropertyOptional({
    description: 'Abbreviated or short form brand name',
    example: 'brembo',
    nullable: true,
  })
  brand_short: string | null;

  @ApiProperty({
    description: 'Quantity used',
    example: 1,
  })
  quantity: number;

  @ApiProperty({
    description: 'Price per single unit',
    example: 100,
  })
  unit_price: number;

  @ApiProperty({
    description: 'Total cumulative price (quantity * unit_price)',
    example: 100,
  })
  total_price: number;
}

export class ServiceRecordResponseDto {
  @ApiProperty({
    description: 'The unique ID of the service record',
    example: 'c34f0449-2504-4de6-91e9-e1d52872beed',
  })
  id: string;

  @ApiProperty({
    description: 'Vehicle registration license plate number',
    example: 'KL-08Masd',
  })
  license_plate: string;

  @ApiProperty({
    description: 'Odometer reading at the time of service',
    example: 10001,
  })
  odo_reading: number;

  @ApiProperty({
    description: 'First name of the customer',
    example: 'Ajay',
  })
  firstname: string;

  @ApiProperty({
    description: 'Last name of the customer',
    example: '',
  })
  lastname: string;

  @ApiPropertyOptional({
    description: 'Primary mobile contact number',
    example: null,
    nullable: true,
  })
  mobile_no: string | null;

  @ApiPropertyOptional({
    description: 'WhatsApp notification contact number',
    example: null,
    nullable: true,
  })
  whatsapp_no: string | null;

  @ApiProperty({
    description: 'List of associated parts and labor charges',
    type: [ServiceItemDto],
  })
  items: ServiceItemDto[];

  @ApiProperty({
    description: 'Total cost of parts',
    example: 100,
  })
  total_parts_cost: number;

  @ApiProperty({
    description: 'Total cost of labor',
    example: 100,
  })
  total_labor_cost: number;

  @ApiProperty({
    description: 'Total cost',
    example: 100,
  })
  grand_total: number;

  @ApiProperty({
    description: 'Discount',
    example: 100,
  })
  discount: number;
}
