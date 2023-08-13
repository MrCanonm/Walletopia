import { Controller, Post, Body, Get } from '@nestjs/common';
import { GastosService } from '../service/gastos.service';
import { GastosDTO } from '../dto/gastos.dto';

@Controller('gastos')
export class GastosController {
  constructor(private readonly gastosSerivce: GastosService) {}

  @Post()
  async addGastos(@Body() createGastosDTO: GastosDTO) {
    const generateId = await this.gastosSerivce.createGastos(createGastosDTO);

    return { id: generateId };
  }

  @Get()
  async getAllGastos() {
    const gastos = await this.gastosSerivce.getGastos();
    return gastos;
  }
}
