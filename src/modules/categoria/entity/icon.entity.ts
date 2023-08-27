import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Icons extends Document {
  @Prop()
  IconName: string;
}

export const IconSchema = SchemaFactory.createForClass(Icons);
