import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Gastos extends Document {
  @Prop({ required: true })
  id_cuentas: string;
  @Prop({ required: true })
  tipo_gastos: string;
  @Prop({ required: true })
  id_categoria: string;
  @Prop({ required: true })
  concepto: string;
  @Prop({ required: true })
  monto: number;
  @Prop({ required: true })
  fecha_de_creacion: Date;
}

export const GastosSchema = SchemaFactory.createForClass(Gastos);
