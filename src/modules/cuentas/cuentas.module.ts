import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CuentasController } from './controller/cuentas.controller';
import { CuentasService } from './service/cuentas.service';
import { CuentaSchema } from './entity/cuentas.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cuenta', schema: CuentaSchema }]),
  ],
  controllers: [CuentasController],
  providers: [CuentasService],
})
export class CuentasModule {}
