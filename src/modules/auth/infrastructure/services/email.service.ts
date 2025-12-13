import { Injectable } from '@nestjs/common';
import { EmailSenderPort } from '../../domain/ports/email-sender.port';
import * as nodemailer from 'nodemailer';
import { PersonEmail } from '@/modules/profile/domain/value-objects/person-value-object/person-email';
import { UserName } from '../../../identity-access-management/domain/value-objects/user-value-object/user-name';

@Injectable()
export class EmailService implements EmailSenderPort {
  private tranporter: nodemailer.Transporter;
  constructor() {
    this.tranporter = nodemailer.createTransport({
      service: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async sendVerificationEmail(
    email: PersonEmail,
    user_name: UserName,
    verificationToken: string,
  ): Promise<void> {
    const verificationUrl = `${process.env.APP_URL}/auth/verify-email?token=${verificationToken}`;
    await this.tranporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email.value(),
      subject: `Verifica tu cuenta`,
      html: `
        <h1>Hola ${user_name.value()}</h1>
        <p>Gracias por registrarte. Por favor verifica tu email haciendo clic en el siguiente enlace:</p>
        <a href="${verificationUrl}">Verificar Email</a>
        <p>Este enlace expirará en 24 horas.</p>
      `,
    });
  }
}
