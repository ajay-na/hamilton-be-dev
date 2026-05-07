import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginBody {
  @ApiProperty({
    description: 'username of admin',
  })
  @IsString()
  @IsNotEmpty()
  username!: string;
  @ApiProperty({
    description: 'password of admin',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
