import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Categoria extends Document {
  @Prop({ require: true })
  category_name: string;
  @Prop({ require: true })
  icon_name: string;
  @Prop()
  category_id: number;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
