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
    const newCategoria = {
      ...createCategoriaDTO,
      createdBy: createdBy,
      isDefault: false,
    };
    const createCategory = await this.categoriaModel.create(newCategoria);
    return createCategory;
  }

  async getCategoria(userId) {
    const defaultCategories = await this.categoriaModel
      .find({ isDefault: true })
      .exec();
    const userCategories = await this.categoriaModel
      .find({ createdBy: userId, isDefault: false })
      .exec();
    const combinedCategories = [...defaultCategories, ...userCategories];
    return combinedCategories;
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

    // Valida si la categoria es por defecto
    if (categoriaExistente.isDefault === true) {
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
