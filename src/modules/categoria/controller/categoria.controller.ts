import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Request,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service';
import { CategoriaDTO } from '../dto/categoria.dto';
import { JwtAuthGuard } from 'src/modules/user/guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('categoria')
@ApiBearerAuth() // Indica que la autenticación JWT es requerida
@UseGuards(JwtAuthGuard) // Aplica el guard de JWT en este controlador
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Post()
  async addCategory(
    @Body() createCategoriaDTO: CategoriaDTO,
    @Request() req,
  ): Promise<CategoriaDTO> {
    const userId = req.user._id;
    console.log(userId);
    return this.categoriaService.createCategoria(createCategoriaDTO, userId);
  }

  @Get()
  async getCategory(@Req() req, @Res() res) {
    const userId = req.user._id; // Suponiendo que puedes acceder al ID del usuario desde el request (por ejemplo, si estás usando autenticación)

    try {
      const categorias = await this.categoriaService.getCategoria(userId);
      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las categorías.' });
    }
  }
  @Get('Icon')
  async getAllIcon() {
    const data = await this.categoriaService.getAllIcon();
    return data;
  }
  @Delete(':id')
  async removeCuenta(@Param('id') prodId: string) {
    await this.categoriaService.deleteCategory(prodId);
    return null;
  }
}
