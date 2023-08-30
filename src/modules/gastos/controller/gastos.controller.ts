import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { GastosService } from '../service/gastos.service';
import { GastosDTO } from '../dto/gastos.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/user/guard/jwt-auth.guard';
import { Gastos } from '../entity/gastos.entity';

@Controller('gastos')
@ApiBearerAuth() // Indica que la autenticación JWT es requerida
@UseGuards(JwtAuthGuard) // Aplica el guard de JWT en este controlador
export class GastosController {
  constructor(private readonly gastosSerivce: GastosService) {}
  @Post()
  async addGastos(@Body() createGastosDTO: GastosDTO): Promise<string> {
    const gastoId = await this.gastosSerivce.createGastos(createGastosDTO);
    return gastoId;
  }

  @Get()
  async getGastos(@Req() req): Promise<Gastos[]> {
    const gastos = await this.gastosSerivce.getGastos(req);
    return gastos;
  }
  @Get('cuenta/:cuentaId')
  async getGastosByCuentaId(
    @Param('cuentaId') cuentaId: string,
  ): Promise<Gastos[]> {
    const gastos = await this.gastosSerivce.getGastosById(cuentaId);
    return gastos;
  }
  @Patch(':id')
  async updateGastos(
    @Param('id') gastosID: string,
    @Body() updateGastosDto: GastosDTO,
  ) {
    const { tipo_gastos, id_categoria, concepto, monto } = updateGastosDto;

    await this.gastosSerivce.updateGastos(
      gastosID,
      tipo_gastos,
      id_categoria,
      concepto,
      monto,
    );
    return null;
  }
  @Delete(':id')
  async deleteGastos(@Param('id') idGatos: string) {
    await this.gastosSerivce.deleteGastos(idGatos);
    return 'Gasto Eliminado ' + idGatos;
  }
}
