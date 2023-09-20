import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserCredentailDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  mail: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Length(6, 20)
  password: string;
}
