import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from '../entity/categoria.entity';
import { Model } from 'mongoose';
import { CategoriaDTO } from '../dto/categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectModel('Categoria') readonly categoriaModel: Model<Categoria>,
  ) {}
  async createCategoria(createCategoriaDTO: CategoriaDTO): Promise<Categoria> {
    //consultamos y actualizamos el contador para generar el ID autoincrementable
    const contador = await this.categoriaModel
      .findOneAndUpdate(
        {},
        { $inc: { category_id: 1 } },
        { new: true, upsert: true },
      )
      .select('category_id');
    //creamos una nueva instancia del modelo de la categoría y asignamos el ID generado
    const categoria = new this.categoriaModel({
      ...createCategoriaDTO,
      category_id: contador.category_id,
    });

    return categoria.save();
  }

  async getAllCategoria() {
    const categoria = await this.categoriaModel.find().exec();
    return categoria;
  }
  async deleteCategory(CatId: string) {
    const reulst = await this.categoriaModel.deleteOne({ _id: CatId }).exec();
    if (reulst.deletedCount === 0) {
      throw new NotFoundException('No se encontre la Categoria');
    }
  }
}
