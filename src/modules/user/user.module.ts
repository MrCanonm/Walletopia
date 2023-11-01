import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './service/JwtStrategy';
import { EmailModule } from './email.module';
import { EncoderService } from './comun/passwordUtils';

@Module({
  imports: [
    PassportModule,
    EmailModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SKEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, EncoderService],
  exports: [UserService, JwtStrategy, JwtModule],
})
export class UserModule {}
