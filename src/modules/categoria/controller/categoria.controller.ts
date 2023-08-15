import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service';
import { CategoriaDTO } from '../dto/categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Post()
  async addCategory(
    @Body() createCategoriaDTO: CategoriaDTO,
  ): Promise<CategoriaDTO> {
    return this.categoriaService.createCategoria(createCategoriaDTO);
  }

  @Get()
  async getCategory() {
    const categoria = await this.categoriaService.getAllCategoria();
    return categoria;
  }
  @Delete(':id')
  async removeCuenta(@Param('id') prodId: string) {
    await this.categoriaService.deleteCategory(prodId);
    return null;
  }
}
