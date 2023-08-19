import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Categoria extends Document {
  @Prop({ require: true })
  category_name: string;
  @Prop({ require: true })
  icon_name: string;
  @Prop()
  isDefault: boolean;
  @Prop({ type: Types.ObjectId, ref: 'User' }) // Crea una referencia al usuario que crea la categoría
  createdBy: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
