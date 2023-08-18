import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './service/JwtStrategy';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'itopia',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService, JwtStrategy, JwtModule],
})
export class UserModule {}
