import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: 'Correo electrónico no válido',
  })
  mail: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  full_name: string;
  @Prop()
  acces_token: string;
  @Prop({ unique: true, nullable: true })
  resetPasswordToken: string;
  @Prop()
  user_icon_name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
