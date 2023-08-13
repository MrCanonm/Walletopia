import { ApiProperty } from '@nestjs/swagger';

export class CreateCuentaDTO {
  @ApiProperty()
  acc_name: string;
  @ApiProperty()
  monto_inicial: number;
  @ApiProperty()
  tipo_de_cuenta: string;
  @ApiProperty()
  fecha_de_creacion: Date;
  @ApiProperty()
  id_user: string;
}
