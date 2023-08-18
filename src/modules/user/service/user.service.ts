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
    // Verificar si el usuario ya existe por su correo electrónico
    const existingUser = await this.userModel.findOne({ correo: data.correo });
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = new this.userModel({
      correo: data.correo,
      password: hashedPassword,
      name: data.name,
      tipo_de_login: data.tipo_de_login,
    });

    const accessToken = await this.generateAccessToken(newUser);
    // Asignar el token JWT al campo acces_token
    newUser.acces_token = accessToken;
    await newUser.save();
    return newUser;
  }
  async signIn(signInDto: UserCredentailDto): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ correo: signInDto.correo });

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

    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }

  private async generateAccessToken(user: User): Promise<string> {
    const payload = { sub: user._id };
    return this.jwtService.signAsync(payload);
  }
}
