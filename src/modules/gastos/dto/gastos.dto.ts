import { ApiProperty } from '@nestjs/swagger';

export class GastosDTO {
  @ApiProperty()
  id_cuentas: string;
  @ApiProperty()
  tipo_gastos: string;
  @ApiProperty()
  id_categoria: string;
  @ApiProperty()
  concepto: string;
  @ApiProperty()
  monto: number;
  @ApiProperty()
  fecha_de_creacion: string;
}
