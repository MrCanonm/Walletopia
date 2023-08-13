import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gastos } from '../entity/gastos.entity';
import { GastosDTO } from '../dto/gastos.dto';
import { Cuenta } from '../../cuentas/entity/cuentas.entity';

@Injectable()
export class GastosService {
  constructor(
    @InjectModel('Gastos') readonly gastosModel: Model<Gastos>,
    @InjectModel('Cuenta') readonly cuentaModel: Model<Cuenta>,
  ) {}
  async createGastos(createGastos: GastosDTO): Promise<string> {
    const cuenta = await this.cuentaModel
      .findById(createGastos.id_cuentas)
      .exec();
    if (!cuenta) {
      throw new Error(`La cuenta con id ${createGastos.id_cuentas} no existe.`);
    }
    const newGastos = new this.gastosModel(createGastos);
    const result = await newGastos.save();
    return result.id as string;
  }

  async getGastos() {
    const gastos = await this.gastosModel.find().exec();
    return gastos.map((acc) => ({
      id: acc.id,
      id_cuentas: acc.id_cuentas,
      tipo_gastos: acc.tipo_gastos,
      id_categoria: acc.id_categoria,
      concepto: acc.concepto,
      monto: acc.monto,
      fecha_de_creacion: acc.fecha_de_creacion,
    }));
  }
}
