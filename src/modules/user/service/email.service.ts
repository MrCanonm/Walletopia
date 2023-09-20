// email.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'a7e9c0ebca9411',
        pass: '611e783528a5ce',
      },
    });
  }

  async sendResetPasswordEmail(
    email: string,
    resetPasswordToken: string,
  ): Promise<void> {
    const mailOptions = {
      from: 'ultraweb@gmail.com', // Cambia esto al correo electrónico de tu aplicación
      to: email,
      subject: 'Restablecimiento de contraseña',
      text: `Utiliza este token para restablecer tu contraseña: ${resetPasswordToken}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
