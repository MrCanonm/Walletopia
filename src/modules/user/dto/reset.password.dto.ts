import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ResetPasswordDTO {
  @IsUUID('4')
  @IsNotEmpty()
  @ApiProperty()
  resetPasswordToken: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
