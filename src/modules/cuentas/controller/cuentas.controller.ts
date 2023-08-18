import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CuentasService } from '../service/cuentas.service';
import { CreateCuentaDTO } from '../dto/cuentas.dto';
import { JwtAuthGuard } from 'src/modules/user/guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('cuentas')
@ApiBearerAuth() // Indica que la autenticación JWT es requerida
@UseGuards(JwtAuthGuard)
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}

  @Post()
  async addCuenta(
    @Body() createCuentaDto: CreateCuentaDTO,
    @Request() req,
  ): Promise<CreateCuentaDTO> {
    const userId = req.user._id;
    console.log(userId);
    return this.cuentasService.createCuenta(createCuentaDto, userId);
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
    const { acc_name, monto_inicial, tipo_de_cuenta, fecha_de_creacion } =
      updateCuentaDto;

    await this.cuentasService.updateCuenta(
      accID,
      acc_name,
      monto_inicial,
      tipo_de_cuenta,
      fecha_de_creacion,
    );
    return null;
  }

  @Delete(':id')
  async removeCuenta(@Param('id') prodId: string) {
    await this.cuentasService.deleteCuenta(prodId);
    return null;
  }
}
