import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  correo: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  name: string;
  @Prop()
  acces_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
