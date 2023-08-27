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
  async getCuenta(userId: string) {
    const cuenta = await this.cuentasModel.find({ user_id: userId }).exec();
    if (!cuenta || cuenta.length === 0) {
      throw new NotFoundException(
        'No se encontraron cuentas para este usuario.',
      );
    }
    return cuenta;
  }

  async getSingleCuenta(cuentaId: string) {
    const cuenta = await this.findCuenta(cuentaId);
    return {
      id: cuenta.id,
      acc_name: cuenta.acc_name,
      monto_inicial: cuenta.monto_inicial,
      tipo_de_cuenta: cuenta.tipo_de_cuenta,
      fecha_de_creacion: cuenta.fecha_de_creacion,
      user_id: cuenta.user_id,
    };
  }

  async updateCuenta(
    cuentatId: string,
    acc_name: string,
    monto_inicial: number,
    tipo_de_cuenta: string,
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
      throw new NotFoundException('No se ha encontrado la cuenta');
    }
    if (!cuenta) {
      throw new NotFoundException('No se ha encontrado la cuenta');
    }
    return cuenta;
  }
}
