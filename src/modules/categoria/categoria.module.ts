import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './entity/categoria.entity';
import { CategoriaService } from './service/categoria.service';
import { CategoriaController } from './controller/categoria.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule {}
