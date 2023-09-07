import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCuentaDTO {
  @ApiProperty()
  acc_name: string;
  @ApiProperty()
  monto_inicial: number;
  monto_corriente: number;
  @ApiProperty()
  tipo_de_cuenta: string;
  @ApiProperty()
  fecha_de_creacion: string;
  @IsOptional()
  @IsString()
  user_id: string;
}
