import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { NodeMailerError } from "../error/CustomError";

dotenv.config();

export class MailDataBase {
  protected static mailTransporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: { ciphers: "SSLv3" },
  });

  public sendEmail = async (
    email: string,
    name: string,
    token: string
  ): Promise<void> => {
    try {
      await MailDataBase.mailTransporter.sendMail({
        from: "<submit-backend-crhis@hotmail.com>",
        to: email,
        subject: "Cadastro Efetuado",
        text: `BOAS VINDAS ${name} !!!!` ,
        html: `<a href = ""> "segue o Token de Acesso ${token}"</a>`,
      });
    } catch (error: any) {
      throw new NodeMailerError();
    }
  };
}
