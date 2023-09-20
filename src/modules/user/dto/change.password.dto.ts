import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordDTO {
  @ApiProperty()
  @Length(6, 20)
  @IsNotEmpty()
  oldPassword: string;
  @ApiProperty()
  @Length(6, 20)
  @IsNotEmpty()
  newPassword: string;
}
