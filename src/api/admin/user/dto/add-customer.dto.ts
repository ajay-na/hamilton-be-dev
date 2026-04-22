import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddUserDto {
  @ApiPropertyOptional({ example: 'Hamilton' })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiPropertyOptional({ example: 'Hamilton' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'abc@gmail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'Dev' })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiPropertyOptional({ example: 'male', enum: ['male', 'female', 'others'] })
  @IsOptional()
  @IsEnum(['male', 'female', 'others'])
  gender?: string;

  @ApiPropertyOptional({ example: '1998-01-01' })
  @IsOptional()
  @IsDateString()
  dob?: string;

  @ApiPropertyOptional({ example: 'https://avatar.url/image.png' })
  @IsOptional()
  @IsUrl()
  image_url?: string;

  @ApiPropertyOptional({ example: '973642687687' })
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(10)
  @IsString()
  mobile_no!: string;

  @ApiPropertyOptional({ example: '973642687687' })
  @IsOptional()
  @MaxLength(12)
  @MinLength(10)
  @IsString()
  whatsapp_no?: string;

  @ApiPropertyOptional({ example: 'admin', enum: ['admin', 'staff', 'user'] })
  @IsOptional()
  @IsEnum(['admin', 'staff', 'user'])
  role_id?: string;

  @ApiPropertyOptional({ example: 'any specific details' })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({
    example: '123, MG Road, Thrissur, Kerala, 680001, India',
    description: 'Full address of the user',
  })
  @IsOptional()
  @IsString()
  address?: string;
}
