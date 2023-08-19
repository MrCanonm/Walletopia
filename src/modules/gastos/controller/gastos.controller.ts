import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GastosService } from '../service/gastos.service';
import { GastosDTO } from '../dto/gastos.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/user/guard/jwt-auth.guard';

@Controller('gastos')
@ApiBearerAuth() // Indica que la autenticación JWT es requerida
@UseGuards(JwtAuthGuard) // Aplica el guard de JWT en este controlador
export class GastosController {
  constructor(private readonly gastosSerivce: GastosService) {}

  @Post()
  async addGastos(
    @Body() createGastosDTO: GastosDTO,
    @Req() req,
  ): Promise<string> {
    const userId = req.user._id;
    return this.gastosSerivce.createGastos(createGastosDTO, userId);
  }

  @Get()
  async getGastos(@Req() req) {
    const gastos = await this.gastosSerivce.getGastos(req);
    return gastos;
  }
}
