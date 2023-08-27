import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gastos } from '../entity/gastos.entity';
import { GastosDTO } from '../dto/gastos.dto';
import { Cuenta } from '../../cuentas/entity/cuentas.entity';
import { Categoria } from 'src/modules/categoria/entity/categoria.entity';

@Injectable()
export class GastosService {
  constructor(
    @InjectModel('Gastos') readonly gastosModel: Model<Gastos>,
    @InjectModel('Cuenta') readonly cuentaModel: Model<Cuenta>,
    @InjectModel('Categoria') readonly categoriaModel: Model<Categoria>,
  ) {}
  async createGastos(createGastos: GastosDTO, userId: string): Promise<string> {
    //Validar si la cuenta existe by id
    const cuenta = await this.cuentaModel
      .findById(createGastos.id_cuentas)
      .exec();
    if (!cuenta) {
      throw new Error(`La cuenta con id ${createGastos.id_cuentas} no existe.`);
    }
    //Validar si la categoria existe by id
    const categoria = await this.categoriaModel
      .findById(createGastos.id_categoria)
      .exec();
    if (!categoria) {
      throw new Error(
        `La Categoria con id ${createGastos.id_cuentas} no existe.`,
      );
    }
    //Si la cuenta y la categoria existen, se creara el gasto
    const newGastos = new this.gastosModel(createGastos);
    newGastos.id_cuentas = userId;
    const result = await newGastos.save();
    return result.id as string;
  }

  async getGastos(req) {
    const cuentaID = req.user._id;
    const gastos = await this.gastosModel.find({ id_cuentas: cuentaID }).exec();
    return gastos;
  }
}
