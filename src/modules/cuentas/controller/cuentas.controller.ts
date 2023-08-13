import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { CuentasService } from '../service/cuentas.service';
import { CreateCuentaDTO } from '../dto/cuentas.dto';

@Controller('cuentas')
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}

  @Post()
  async addCuenta(@Body() createCuentaDto: CreateCuentaDTO) {
    const generatedId = await this.cuentasService.createCuenta(createCuentaDto);
    return { id: generatedId };
  }

  @Get()
  async getAllCuentas() {
    const cuentas = await this.cuentasService.getCuenta();
    return cuentas;
  }

  @Get(':id')
  getCuentas(@Param('id') prodId: string) {
    return this.cuentasService.getSingleCuenta(prodId);
  }

  @Patch(':id')
  async updateCuenta(
    @Param('id') accID: string,
    @Body() updateCuentaDto: CreateCuentaDTO,
  ) {
    const {
      acc_name,
      monto_inicial,
      tipo_de_cuenta,
      fecha_de_creacion,
      id_user,
    } = updateCuentaDto;

    await this.cuentasService.updateCuenta(
      accID,
      acc_name,
      monto_inicial,
      tipo_de_cuenta,
      fecha_de_creacion,
      id_user,
    );
    return null;
  }

  @Delete(':id')
  async removeCuenta(@Param('id') prodId: string) {
    await this.cuentasService.deleteCuenta(prodId);
    return null;
  }
}
