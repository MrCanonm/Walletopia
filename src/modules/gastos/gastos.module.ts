import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GastosController } from './controller/gastos.controller';
import { GastosSchema } from './entity/gastos.entity';
import { GastosService } from './service/gastos.service';
import { CuentaSchema } from '../cuentas/entity/cuentas.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Gastos', schema: GastosSchema }]),
    MongooseModule.forFeature([{ name: 'Cuenta', schema: CuentaSchema }]),
  ],
  controllers: [GastosController],
  providers: [GastosService],
})
export class GastosModule {}
