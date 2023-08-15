import { ApiProperty } from '@nestjs/swagger';

export class CategoriaDTO {
  @ApiProperty()
  category_name: string;
  @ApiProperty()
  icon_name: string;
  category_id: number;
}
