import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CuentasModule } from './modules/cuentas/cuentas.module';
import { GastosModule } from './modules/gastos/gastos.module';

@Module({
  imports: [
    GastosModule,
    CuentasModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.syymq2o.mongodb.net/Itopia?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}