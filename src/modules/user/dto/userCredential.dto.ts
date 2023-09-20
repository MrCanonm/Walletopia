import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  mail: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;
}
