import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class ResetPasswordDTO {
  @IsUUID('4')
  @IsNotEmpty()
  @ApiProperty()
  resetPasswordToken: string;
  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
