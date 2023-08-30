import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CuentasController } from './controller/cuentas.controller';
import { CuentasService } from './service/cuentas.service';
import { CuentaSchema } from './entity/cuentas.entity';
import { GastosSchema } from '../gastos/entity/gastos.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cuenta', schema: CuentaSchema }]),
    MongooseModule.forFeature([{ name: 'Gastos', schema: GastosSchema }]),
  ],
  controllers: [CuentasController],
  providers: [CuentasService],
})
export class CuentasModule {}
