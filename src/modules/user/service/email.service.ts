// email.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  googleDatos = require('../guard/google.datos');
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.googleDatos.email.user,
        pass: this.googleDatos.email.pass,
      },
    });
  }

  async sendResetPasswordEmail(
    email: string,
    resetPasswordToken: string,
  ): Promise<void> {
    const mailOptions = {
      from: '"Olvidaste tu Contraseña 👻" ultraweb07@gmail.com', // Cambia esto al correo electrónico de tu aplicación
      to: email,
      subject: 'Restablecimiento de contraseña',
      text: `Utiliza este token para restablecer tu contraseña: ${resetPasswordToken}`,
      html: `
      <b>Por favor hacer click en el siguiente link: </b>
      <a  href="${resetPasswordToken}">${resetPasswordToken}</a>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
