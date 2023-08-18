import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from '../entity/categoria.entity';
import { Model } from 'mongoose';
import { CategoriaDTO } from '../dto/categoria.dto';
import { Icons } from '../entity/icon.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectModel('Categoria') readonly categoriaModel: Model<Categoria>,
    @InjectModel('Icons') readonly iconModel: Model<Icons>,
  ) {}
  async createCategoria(
    createCategoriaDTO: CategoriaDTO,
    createdBy: string,
  ): Promise<Categoria> {
    let categoria: Categoria;
    await this.categoriaModel.db.transaction(async (session) => {
      // Consulta y actualiza el contador en la misma transacción
      const contador = await this.categoriaModel
        .findOneAndUpdate(
          {},
          { $inc: { category_id: 1 } },
          { new: true, upsert: true, session },
        )
        .select('category_id');

      // Crea una nueva instancia del modelo de la categoría y asigna el ID generado
      categoria = new this.categoriaModel({
        ...createCategoriaDTO,
        createdBy: createdBy,
        category_id: contador.category_id,
      });

      await categoria.save({ session }); // Guarda la categoría en la misma transacción
    });

    return categoria;
  }

  async getAllCategoria() {
    const categoria = await this.categoriaModel.find().exec();
    return categoria;
  }
  async getAllIcon() {
    const data = await this.iconModel.find().exec();
    return data;
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
