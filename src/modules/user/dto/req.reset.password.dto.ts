import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ReqResetPasswordDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
