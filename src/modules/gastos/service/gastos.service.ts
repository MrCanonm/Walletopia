import { Injectable, NotFoundException } from '@nestjs/common';
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
  async createGastos(createGastos: GastosDTO): Promise<string> {
    //Validar si la cuenta existe by id
    const cuenta = await this.cuentaModel
      .findById(createGastos.id_cuenta)
      .exec();
    if (!cuenta) {
      throw new Error(`La cuenta con id ${createGastos.id_cuenta} no existe.`);
    }
    //Validar si la categoria existe by id
    const categoria = await this.categoriaModel
      .findById(createGastos.id_categoria)
      .exec();
    if (!categoria) {
      throw new Error(
        `La Categoria con id ${createGastos.id_cuenta} no existe.`,
      );
    }
    // Determinar si el gasto es débito o crédito
    const isDebito = createGastos.tipo_gasto === 0;

    // Calcular el nuevo monto corriente de la cuenta
    const nuevoMonto = isDebito
      ? cuenta.monto_corriente - createGastos.monto
      : cuenta.monto_corriente + createGastos.monto;

    // Actualizar el monto corriente de la cuenta
    cuenta.monto_corriente = nuevoMonto;

    // Guardar la cuenta actualizada
    const cuentaActualizada = await cuenta.save();

    // Crear el nuevo gasto
    const newGastos = new this.gastosModel(createGastos);
    const result = await newGastos.save();
    return result.id as string;
  }

  async getGastos(req) {
    const userId = req.user._id;

    // Obtener todas las cuentas asociadas al usuario
    const cuentasDelUsuario = await this.cuentaModel
      .find({ user_id: userId })
      .exec();

    const cuentasIds = cuentasDelUsuario.map((cuenta) => cuenta._id);

    // Obtener los gastos asociados a las cuentas del usuario
    const gastos = await this.gastosModel
      .find({ id_cuenta: { $in: cuentasIds } })
      .exec();

    return gastos;
  }

  async getGastosById(cuentaId: string) {
    const gastos = await this.gastosModel.find({ id_cuenta: cuentaId }).exec();

    if (gastos.length === 0) {
      throw new Error('No hay gastos en esta cuenta');
    }

    return gastos;
  }
  async updateGastos(
    gastosId: string,
    tipo_gastos: number,
    id_categoria: string,
    concepto: string,
    monto: number,
  ) {
    const updateGastos = await this.gastosModel.findById(gastosId).exec();
    const vMonto = updateGastos.monto;
    const cuenta = await this.cuentaModel.findById(updateGastos.id_cuenta);
    if (!updateGastos) {
      throw new NotFoundException('El gasto no existe.');
    }
    if (tipo_gastos) {
      updateGastos.tipo_gasto = tipo_gastos;
    }
    if (id_categoria) {
      updateGastos.id_categoria = id_categoria;
    }
    if (concepto) {
      updateGastos.concepto = concepto;
    }
    if (monto) {
      updateGastos.monto = monto;
      const diffMonto = vMonto - monto;
      const isDebito = updateGastos.tipo_gasto === 0;
      const nuevoMonto = isDebito
        ? cuenta.monto_corriente + diffMonto
        : cuenta.monto_corriente - diffMonto;
      cuenta.monto_corriente = nuevoMonto;
      await cuenta.save();
    }
    await updateGastos.save();
  }
  async deleteGastos(idGastos: string) {
    // Obtén la información del gasto antes de eliminarlo
    const gasto = await this.gastosModel.findById(idGastos);
    const cuenta = await this.cuentaModel.findById(gasto.id_cuenta);
    if (!gasto) {
      throw new NotFoundException('No se encontró el gasto a eliminar');
    }
    // Valida si es credito o debito tomando en cuenta que 0 es Debito y 1 es Credito
    const isDebito = gasto.tipo_gasto === 0;
    // Calcular el nuevo monto corriente de la cuenta
    const nuevoMonto = isDebito
      ? cuenta.monto_corriente + gasto.monto
      : cuenta.monto_corriente - gasto.monto;
    // Actualizar el monto corriente de la cuenta
    cuenta.monto_corriente = nuevoMonto;
    // Guardar la cuenta actualizada
    await cuenta.save();
    // Elimina el gasto
    const resultadoEliminacion = await this.gastosModel.deleteOne({
      _id: idGastos,
    });

    if (resultadoEliminacion.deletedCount === 0) {
      throw new NotFoundException('No se encontró el gasto a eliminar');
    }
  }
}
