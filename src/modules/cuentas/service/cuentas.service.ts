import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cuenta } from '../entity/cuentas.entity';
import { CreateCuentaDTO } from '../dto/cuentas.dto';

@Injectable()
export class CuentasService {
  constructor(
    @InjectModel('Cuenta')
    private readonly cuentasModel: Model<Cuenta>,
  ) {}

  async createCuenta(
    createCuentaDto: CreateCuentaDTO,
    user_id: string,
  ): Promise<Cuenta> {
    const newCuenta = new this.cuentasModel({
      ...createCuentaDto,
      user_id: user_id,
    });
    return newCuenta.save();
  }
  async getCuenta() {
    const cuentas = await this.cuentasModel.find().exec();
    return cuentas.map((acc) => ({
      id: acc.id,
      acc_name: acc.acc_name,
      monto_inicial: acc.monto_inicial,
      id_acc_type: acc.tipo_de_cuenta,
      fecha_de_cracion: acc.fecha_de_creacion,
      user_id: acc.user_id,
    }));
  }

  async getSingleCuenta(cuentaId: string) {
    const cuenta = await this.findCuenta(cuentaId);
    return {
      id: cuenta.id,
      acc_name: cuenta.acc_name,
      monto_inicial: cuenta.monto_inicial,
      tipo_de_cuenta: cuenta.tipo_de_cuenta,
      fecha_de_cracion: cuenta.fecha_de_creacion,
      user_id: cuenta.user_id,
    };
  }

  async updateCuenta(
    cuentatId: string,
    acc_name: string,
    monto_inicial: number,
    tipo_de_cuenta: string,
    fecha_de_cracion: Date,
  ) {
    const updatedCuenta = await this.findCuenta(cuentatId);
    if (acc_name) {
      updatedCuenta.acc_name = acc_name;
    }
    if (monto_inicial) {
      updatedCuenta.monto_inicial = monto_inicial;
    }
    if (tipo_de_cuenta) {
      updatedCuenta.tipo_de_cuenta = tipo_de_cuenta;
    }
    if (fecha_de_cracion) {
      updatedCuenta.fecha_de_creacion = fecha_de_cracion;
    }
    updatedCuenta.save();
  }

  async deleteCuenta(accId: string) {
    const result = await this.cuentasModel.deleteOne({ _id: accId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find the Accc.');
    }
  }

  private async findCuenta(id: string): Promise<Cuenta> {
    let cuenta;
    try {
      cuenta = await this.cuentasModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find the Accc.');
    }
    if (!cuenta) {
      throw new NotFoundException('Could not find the Accc.');
    }
    return cuenta;
  }
}
