import { ConflictException } from '@nestjs/common';
import { User, UserSchema } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../service/email.service';
import { EncoderService } from '../comun/passwordUtils';
import mongoose from 'mongoose';

describe('UserService', () => {
  let userModel: mongoose.Model<User>;
  let jwtService: JwtService;
  let userService: UserService;
  let emailSerive: EmailService;
  let encoderService: EncoderService;

  beforeEach(() => {
    userModel = mongoose.model('User', UserSchema);
    encoderService = new EncoderService();
    jwtService = new JwtService();
    emailSerive = new EmailService();
    userService = new UserService(
      userModel,
      jwtService,
      emailSerive,
      encoderService,
    );
  });

  it('should create a new user', async () => {
    // Escribe la prueba para crear un nuevo usuario aquí
    const userData = {
      mail: 'nuevousuario@example.com',
      password: 'password123',
      full_name: 'Nuevo Usuario',
      user_icon_name: 'user',
    };

    const newUser: User = await userService.createUser(userData);

    // Realiza las aserciones necesarias para verificar que se creó el nuevo usuario
    expect(newUser.mail).toBe(userData.mail);
    // Otras aserciones...
  });

  it('should throw a ConflictException if the user already exists', async () => {
    // Escribe la prueba para verificar que se lance una excepción si el usuario ya existe
    const userData = {
      mail: 'usuarioexistente@example.com',
      password: 'password123',
      full_name: 'Usuario Existente',
      user_icon_name: 'user',
    };

    // Realiza las aserciones necesarias para verificar la excepción
    await expect(userService.createUser(userData)).rejects.toThrow(
      ConflictException,
    );
  });
});
