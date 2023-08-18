import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: string;
}

export const CuentaSchema = SchemaFactory.createForClass(Cuenta);
