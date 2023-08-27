import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/userCredential.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtService } from '@nestjs/jwt';
import { UserCredentailDto } from '../dto/signin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') readonly userModel: Model<User>,
    readonly jwtService: JwtService,
  ) {}
  async createUser(data: CreateUserDto): Promise<User> {
    data.mail = data.mail.toLowerCase();
    // Verificar si el usuario ya existe por su correo electrónico
    const existingUser = await this.userModel.findOne({ mail: data.mail });
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    let hashedPassword: string | undefined;
    if (data.password) {
      const salt = await bcrypt.genSalt();
      hashedPassword = await bcrypt.hash(data.password, salt);
    }

    const newUser = new this.userModel({
      mail: data.mail,
      password: hashedPassword,
      full_name: data.full_name,
    });

    const accessToken = await this.generateAccessToken(newUser);
    // Asignar el token JWT al campo acces_token
    newUser.acces_token = accessToken;
    await newUser.save();
    return newUser;
  }
  async signIn(signInDto: UserCredentailDto): Promise<{ acces_token: string }> {
    signInDto.mail = signInDto.mail.toLowerCase();
    const user = await this.userModel.findOne({ mail: signInDto.mail });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const acces_token = await this.generateAccessToken(user);
    return { acces_token };
  }

  private async generateAccessToken(user: User): Promise<string> {
    const payload = { sub: user._id };
    return this.jwtService.signAsync(payload);
  }

  async validateUserById(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user; // Retorna la información del usuario autenticado
  }
}
