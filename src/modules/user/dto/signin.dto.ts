import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserCredentailDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  mail: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
