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
    const categoriaExistente = await this.categoriaModel.findById(CatId);

    if (!categoriaExistente) {
      throw new NotFoundException('No se encontró la Categoría');
    }

    // Valida si el category_id de la categoría es mayor a 9
    if (categoriaExistente.category_id <= 9) {
      throw new NotFoundException(
        'No se permite eliminar las Categorias por defecto',
      );
    }

    const result = await this.categoriaModel.deleteOne({ _id: CatId }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('No se encontró la Categoría');
    }
  }
}
