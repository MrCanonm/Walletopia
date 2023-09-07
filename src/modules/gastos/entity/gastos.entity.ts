import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Gastos extends Document {
  @Prop({ required: true })
  id_cuenta: string;
  @Prop({ required: true })
  tipo_gasto: number;
  @Prop({ required: true })
  id_categoria: string;
  @Prop({ required: true })
  concepto: string;
  @Prop({ required: true })
  monto: number;
  @Prop({ required: true })
  fecha_de_creacion: string;
}

export const GastosSchema = SchemaFactory.createForClass(Gastos);
