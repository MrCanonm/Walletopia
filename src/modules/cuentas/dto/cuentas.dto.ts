import { ApiProperty } from '@nestjs/swagger';

export class CreateCuentaDTO {
  @ApiProperty()
  acc_name: string;
  @ApiProperty()
  monto_inicial: number;
  @ApiProperty()
  id_acc_type: string;
  @ApiProperty()
  fecha_de_creacion: Date;
  @ApiProperty()
  id_user: string;
}
