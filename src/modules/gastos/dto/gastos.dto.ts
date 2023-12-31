import { ApiProperty } from '@nestjs/swagger';

export class GastosDTO {
  @ApiProperty()
  id_cuenta: string;
  @ApiProperty()
  tipo_gasto: number;
  @ApiProperty()
  id_categoria: string;
  @ApiProperty()
  concepto: string;
  @ApiProperty()
  monto: number;
  @ApiProperty()
  fecha_de_creacion: string;
}
