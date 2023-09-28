import {
  BadRequestException,
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
import { JwtService } from '@nestjs/jwt';
import { UserCredentailDto } from '../dto/signin.dto';
import { ReqResetPasswordDTO } from '../dto/req.reset.password.dto';
import { v4 as uuidv4 } from 'uuid';
import { ResetPasswordDTO } from '../dto/reset.password.dto';
import { EmailService } from './email.service';
import { ChangePasswordDTO } from '../dto/change.password.dto';
import { EncoderService } from '../comun/passwordUtils';
import { use } from 'passport';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') readonly userModel: Model<User>,
    readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly encoderService: EncoderService,
  ) {}
  async createUser(data: CreateUserDto): Promise<User> {
    data.mail = data.mail.toLowerCase();
    // Verificar si el usuario ya existe por su correo electrónico
    const existingUser = await this.userModel.findOne({ mail: data.mail });
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    const hashedPassword = await this.encoderService.hashPassword(
      data.password,
    );

    const newUser = new this.userModel({
      mail: data.mail,
      password: hashedPassword,
      full_name: data.full_name,
      user_icon_name: 'user',
    });

    const accessToken = await this.generateAccessToken(newUser);
    // Asignar el token JWT al campo acces_token
    newUser.acces_token = accessToken;
    await newUser.save();
    return newUser;
  }
  async signIn(
    signInDto: UserCredentailDto,
  ): Promise<{ acces_token: string; full_name: string; icon_name: string }> {
    signInDto.mail = signInDto.mail.toLowerCase();
    const user = await this.userModel.findOne({ mail: signInDto.mail });

    if (!user) {
      console.log('Usuario no encontrado');
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      console.log('Credenciales inválidas');
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const acces_token = await this.generateAccessToken(user);
    const full_name = user.full_name;
    const icon_name = user.user_icon_name;
    console.log('Haz inciado seccion exitosamente');
    return { acces_token, full_name, icon_name };
  }
  async updateUserData(id: string, full_name: string, user_icon_name: string) {
    const userData = await this.userModel.findById(id).exec();
    if (!userData) {
      throw new NotFoundException('Usuario no Encontrado');
    } else {
      if (full_name) {
        userData.full_name = full_name;
        console.log('Haz cambiado su nombre Exitosamente!');
      }
      if (user_icon_name) {
        userData.user_icon_name = user_icon_name;
        console.log('Haz cambiado su Icono Exitosamente!');
      }
      await userData.save();
    }
  }

  private async generateAccessToken(user: User): Promise<string> {
    const payload = { sub: user._id };
    return this.jwtService.signAsync(payload);
  }
  async reqResetPassword(
    ReqResetPasswordDTO: ReqResetPasswordDTO,
  ): Promise<void> {
    const { email } = ReqResetPasswordDTO;
    const user: User = await this.findOneByEmail(email);
    const resetPasswordToken = uuidv4();
    user.resetPasswordToken = resetPasswordToken;

    await user.save();
    await this.emailService.sendResetPasswordEmail(email, resetPasswordToken);
    console.log('Solicitud de Cambio de contraseña enviado!');
  }

  async resetPassword(resertPasswordDTO: ResetPasswordDTO): Promise<void> {
    const { resetPasswordToken, password } = resertPasswordDTO;
    const user: User = await this.findOneByToken(resetPasswordToken);
    // Actualiza la contraseña y elimina el token de restablecimiento
    user.password = await this.encoderService.hashPassword(password);
    user.resetPasswordToken = null;
    await user.save();
    console.log('Contraseña cambiada exitosamente!');
  }
  async changePassword(
    changePasswordDTO: ChangePasswordDTO,
    user: User,
  ): Promise<void> {
    const { oldPassword, newPassword } = changePasswordDTO;
    if (await this.encoderService.checkPassword(oldPassword, user.password)) {
      user.password = await this.encoderService.hashPassword(newPassword);
      await user.save();
    } else {
      throw new BadRequestException('Contraseña no coinciden!');
    }
  }
  // Validators
  async validateUserById(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user; // Retorna la información del usuario autenticado
  }
  async findOneByEmail(mail: string): Promise<User> {
    const user: User = await this.userModel.findOne({ mail });

    if (!user) {
      throw new NotFoundException('Email no encontrado');
    }

    return user; // Retorna la información del usuario autenticado
  }
  async findOneByToken(resetPasswordToken: string): Promise<User> {
    const user: User = await this.userModel.findOne({ resetPasswordToken });

    if (!user) {
      throw new NotFoundException('Token no encontrado');
    }
    return user; // Retorna la información del usuario autenticado
  }
}
