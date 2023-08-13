import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cuenta extends Document {
  @Prop({ required: true })
  acc_name: string;

  @Prop({ required: true })
  monto_inicial: number;

  @Prop({ required: true })
  tipo_de_cuenta: string;

  @Prop({ required: true })
  fecha_de_creacion: Date;

  @Prop({ required: true })
  id_user: string;
}

export const CuentaSchema = SchemaFactory.createForClass(Cuenta);
