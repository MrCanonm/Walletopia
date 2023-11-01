// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendResetPasswordEmail(
    email: string,
    resetPasswordToken: string,
  ): Promise<void> {
    const hash = `https://wallet-187fd.web.app/${resetPasswordToken}`;
    const mailOptions = {
      from: '"Olvidaste tu Contraseña 👻" ultraweb07@gmail.com', // Cambia esto al correo electrónico de tu aplicación
      to: email,
      subject: 'Restablecimiento de contraseña',
      text: `Utiliza este token para restablecer tu contraseña: ${hash}`,
      html: `
      <b>Por favor hacer click en el siguiente link: </b>
      <a  href="${hash}">${hash}</a>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
