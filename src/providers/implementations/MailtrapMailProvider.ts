import { IEmailProvider, IMessage } from "../IEmailProvider";
import nodemailer from 'nodemailer';

export class MailtrapMailProvider implements IEmailProvider {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'bleh',
        pass: 'blehbleh'
      }
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      body: message.body
    })
  }
}