import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './entity/categoria.entity';
import { CategoriaService } from './service/categoria.service';
import { CategoriaController } from './controller/categoria.controller';
import { IconSchema } from './entity/icon.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
    MongooseModule.forFeature([{ name: 'Icons', schema: IconSchema }]),
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule {}
