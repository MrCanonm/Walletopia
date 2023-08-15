import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GastosController } from './controller/gastos.controller';
import { GastosSchema } from './entity/gastos.entity';
import { GastosService } from './service/gastos.service';
import { CuentaSchema } from '../cuentas/entity/cuentas.entity';
import { CategoriaSchema } from '../categoria/entity/categoria.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Gastos', schema: GastosSchema }]),
    MongooseModule.forFeature([{ name: 'Cuenta', schema: CuentaSchema }]),
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
  ],
  controllers: [GastosController],
  providers: [GastosService],
})
export class GastosModule {}
